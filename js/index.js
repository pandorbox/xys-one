// JavaScript Document
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      function getScrollbarWidth() {
        var odiv = document.createElement("div"), //创建一个div
          styles = {
            width: "100px",
            height: "100px",
            overflowY: "scroll"
          },
          i,
          scrollbarWidth;
        for (i in styles) odiv.style[i] = styles[i];
        document.body.appendChild(odiv);
        scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
        odivParent = odiv.parentNode;
        odivParent.removeChild(odiv);
        return scrollbarWidth;
      }
      var result = window.matchMedia("(min-width:1480px)");
      var resultWAP = window.matchMedia("(max-width:768px)");

      var scrollbarWidth = getScrollbarWidth();
      var clientWidth = docEl.clientWidth - scrollbarWidth;
      if (!clientWidth) return;

      if (result.matches) {
        docEl.style.fontSize = "100px";
      } else if (resultWAP.matches) {
        docEl.style.fontSize = 100 * (clientWidth / (750 - scrollbarWidth)) + "px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / (1480 - scrollbarWidth)) + "px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

$(function() {
  /* 手机导航 */
  $(".m-icon").click(function() {
    $(".m-nav")
      .stop()
      .slideToggle();
  });
  $(".m-nav>li").each(function(ind, el) {
    if ($(el).find(".sub-nav li").length > 0) {
      $(el)
        .children("a")
        .attr("href", "javascript:;");
    }
  });

  var timer = null;
  $(window).resize(function() {
    timer = setTimeout(function() {
      if ($(".recommend-list").length > 0) {
        if (pSwiper) {
          pSwiper.destroy();
        }
        recSwiper();
      }
      if ($(".ani").length > 0) {
        removeC();
      }
      if ($(".in-nav").length > 0) {
        inNavSwiper.destroy();
        inNav();
      }
      if ($(".p-nav").length > 0) {
        if (pNavSwiper) {
          pNavSwiper.destroy();
        }
      }
      pMove();
      recSwiper();
    }, 500);
  });
  /** nav切换 */
  $(".nav-tit>li").click(function() {
    if (!$(this).hasClass("active")) {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });
  /** banner */
  var banner = new Swiper(".banner-swiper", {
    direction: "horizontal", // 水平切换选项
    loop: true
  });
  /** case */
  // 列表滑动
  var resultWAP = window.matchMedia("(max-width:768px)");
  function caseSwiper() {
    if (resultWAP.matches) {
      // 768以下滑动显示三个*/
      var caseSwiper = new Swiper(".case-list", {
        slidesPerView: 3,
        spaceBetween: 5
      });
    } else {
      // pc滑动显示5个
      var caseSwiper = new Swiper(".case-list", {
        slidesPerView: 5,
        spaceBetween: 10
      });
    }
  }
  caseSwiper();
  // 切换active
  $(".case-list>.swiper-wrapper>.swiper-slide").hover(function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    switchImg();
    switchText();
  });
  // 更换内容
  function switchText() {
    let that = $(".case-list>.swiper-wrapper>.active");
    let index = that.prevAll().length;
    $(".stack-one-item").removeClass("active");
    $(".stack-one .stack-one-item")
      .eq(index)
      .addClass("active");
  }
  // 左右切换图片
  $(".switch").click(function() {
    let that = $(".case-list>.swiper-wrapper>.active");
    let last = that.prev();
    let next = that.next();
    if ($(this).hasClass("switch-left")) {
      if (last.length > 0) {
        that.removeClass("active");
        last.addClass("active");
        if (that.prevAll().length > 3) {
          let num = (that.prevAll().length - 4) * 20;
          $(".case-list-one").css({
            left: "-" + num + "%"
          });
        } else {
          $(".case-list-one").css({
            left: "0"
          });
        }
      } else {
        alert("到顶了！");
      }
    } else {
      if (next.length > 0) {
        that.removeClass("active");
        next.addClass("active");
        if (that.prevAll().length > 3) {
          let num = (that.prevAll().length - 3) * 20.1;
          $(".case-list-one").css({
            left: "-" + num + "%"
          });
        }
      } else {
        that.removeClass("active");
        $(".case-list>.swiper-wrapper .swiper-slide")
          .first()
          .addClass("active");
        $(".case-list-one").css({
          left: "0"
        });
      }
    }
    switchImg();
    switchText();
  });

  // 更新图片url
  function switchImg() {
    let imgurl = "";
    imgurl = $(".case-list>.swiper-wrapper>.active>img").attr("src");
    $(".showimg").attr("src", imgurl);
  }
  switchImg();
  /** design */
  // 列表滑动
  function desSwiper() {
    if (resultWAP.matches) {
      // 手机显示2张
      var desSwiper = new Swiper(".design-list", {
        slidesPerView: 2,
        spaceBetween: 0
      });
    } else {
      // pc显示4张
      var desSwiper = new Swiper(".design-list", {
        slidesPerView: 4,
        spaceBetween: 0
      });
    }
  }
  desSwiper();
  // 切换active
  $(".design-list>.swiper-wrapper>.swiper-slide").hover(function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  // border动画
  function appendDiv() {
    var left = "<div class='border-left'></div>";
    let bottom = "<div class='border-bottom' ></div>";
    let right = "<div class='border-right'></div>";
    let top = "<div class='border-top' ></div>";
    $(".design-list>.swiper-wrapper>.swiper-slide").append(left, bottom, right, top);
  }
  appendDiv();
});
