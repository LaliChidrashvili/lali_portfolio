document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var menuOpenIcon = document.querySelector(".nav__icon-menu"),
    menuCloseIcon = document.querySelector(".nav__icon-close"),
    menuList = document.querySelector(".main-nav"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu
  ======================================================= */
  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  menuCloseIcon.addEventListener("click", () => {
    menuClose();
  });

  if (menuList) {
    menuList.addEventListener("click", function (e) {
      if (e.target === menuList) {
        menuClose();
      }
    });
  }

  var filterButtons = document.querySelectorAll(".portfolio__filter-btn");
  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        filterButtons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        document.querySelectorAll(".portfolio__grid-item").forEach(function (item) {
          var raw = item.getAttribute("data-portfolio-tags") || "";
          var tags = raw.split(/\s+/).filter(Boolean);
          var show = filter === "all" || tags.indexOf(filter) !== -1;
          item.classList.toggle("portfolio__grid-item--hidden", !show);
        });
      });
    });
  }

  function menuOpen() {
    menuList.classList.add("is-open");
    document.documentElement.classList.add("nav-open");
  }

  function menuClose() {
    menuList.classList.remove("is-open");
    document.documentElement.classList.remove("nav-open");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuList.classList.contains("is-open")) {
      menuClose();
    }
  });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  /* =======================
  // LazyLoad Images and Videos
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* ==========================
  // Lightbox Gallery
  ========================== */
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    moreLength: 0,
    autoplayVideos: true
  });


  /* =================================
  // Smooth scroll on tags page (hash IDs can contain . + etc. - not valid in querySelector)
  ================================= */
  document.querySelectorAll(".tag__link").forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var href = this.getAttribute("href");
      if (!href) return;
      var hashIdx = href.lastIndexOf("#");
      if (hashIdx === -1) return;
      var rawFragment = href.slice(hashIdx + 1);
      var decoded;
      try {
        decoded = decodeURIComponent(rawFragment);
      } catch (err) {
        decoded = rawFragment;
      }
      var target = document.getElementById(rawFragment) || document.getElementById(decoded);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  window.addEventListener("scroll", function () {
    window.scrollY > window.innerHeight ? btnScrollToTop.classList.add("is-active") : btnScrollToTop.classList.remove("is-active");
  });

  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

});