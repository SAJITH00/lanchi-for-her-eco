(function () {
  var page = document.body.getAttribute("data-page") || "";

  function navLink(href, label, id) {
    var active = page === id;
    return '<a class="lhf-link' + (active ? " is-active" : "") + '" href="' + href + '"' +
      (active ? ' aria-current="page"' : "") + ">" + label + "</a>";
  }

  function links() {
    return [
      navLink("./index.html", "Home", "home"),
      navLink("./category.html", "Category", "category"),
      navLink("./model.html", "Models", "models"),
      navLink("./contact.html", "Contact", "contact"),
      navLink("./login.html", "Login", "login")
    ].join("");
  }

  function headerHTML() {
    var logoHref = page === "home" ? "#home" : "./index.html";
    return '' +
      '<header id="lhf-header">' +
        '<div class="lhf-wrap lhf-bar">' +
          '<a class="lhf-brand" href="' + logoHref + '">' +
            '<img class="lhf-logo" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXN2Lmppat1moCJQLsulEN5n_fFQUUCckP7OIJjtjJsh6v2NA3nfhAyIw6YyqQhrN1DSdPeN_8He7FIDg2bPzd6ABJATRCLfOb5aeTsLtn4DTBdapTi7RjHQ9QMnIKkqT6QaaRMxM3Rpzk3T-nQGlKlUj0wxXzorTE7i8neZZBYCPu7yCe0IzAn-h8YNXbsUdtb_eu3B1FSFa997DvtYuWsDW1MA9RIXtgNirRO1u9eOzjrI0GMjExog">' +
            '<span class="lhf-name">LANCHI FOR HER</span>' +
            '<span class="lhf-dot"></span>' +
          "</a>" +
          '<nav class="lhf-nav" aria-label="Primary">' + links() + "</nav>" +
          '<div class="lhf-actions">' +
            '<button class="lhf-icon-btn" type="button" aria-label="Search"><span class="material-symbols-outlined">search</span></button>' +
            '<a class="lhf-icon-btn" href="./wishlist.html" aria-label="Wishlist"><span class="material-symbols-outlined">favorite</span></a>' +
            '<a class="lhf-icon-btn" id="navBagBtn" href="./cart.html" aria-label="Shopping bag, 2 items">' +
              '<span class="material-symbols-outlined">shopping_bag</span>' +
              '<span class="lhf-badge" id="navBagCount">2</span>' +
            "</a>" +
            '<button class="lhf-icon-btn lhf-menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">' +
              '<span class="material-symbols-outlined">menu</span>' +
            "</button>" +
          "</div>" +
        "</div>" +
        '<nav class="lhf-mobile" id="mobileNav" aria-label="Mobile">' +
          '<div class="lhf-wrap lhf-mobile-inner">' + links() + "</div>" +
        "</nav>" +
      "</header>";
  }

  function footerHTML() {
    return '' +
      '<footer id="lhf-footer" class="footer-spotlight">' +
        '<div class="lhf-wrap lhf-footer-inner">' +
          '<div class="lhf-top">' +
            '<div>' +
              '<div class="lhf-foot-brand">' +
                '<img class="lhf-foot-logo" alt="" src="./lanchi logo.png">' +
                '<span class="lhf-foot-title">LANCHI FOR HER</span>' +
              "</div>" +
              '<p class="lhf-blurb">Fashion that celebrates every woman. Curating graceful, modest luxury wardrobe essentials for modern life.</p>' +
              '<ul class="lhf-social">' +
                '<li><a href="#" aria-label="Instagram"><span class="material-symbols-outlined">photo_camera</span></a></li>' +
                '<li><a href="#" aria-label="Pinterest"><span class="material-symbols-outlined">push_pin</span></a></li>' +
                '<li><a href="#" aria-label="Facebook"><span class="material-symbols-outlined">public</span></a></li>' +
              "</ul>" +
            "</div>" +
            '<div class="lhf-news">' +
              '<h2>Join the private circle</h2>' +
              '<p>Receive previews of new seasonal drops, private capsule collections and styling notes.</p>' +
              '<form class="lhf-form" onsubmit="event.preventDefault();">' +
                '<label class="lhf-sr" for="newsletterEmail">Email address</label>' +
                '<input class="lhf-input" id="newsletterEmail" type="email" required placeholder="Enter your email address">' +
                '<button class="lhf-submit" type="submit">Subscribe</button>' +
              "</form>" +
            "</div>" +
          "</div>" +
          '<nav class="lhf-cols" aria-label="Footer">' +
            '<div><h2>About</h2><ul>' +
              '<li><a href="./index.html#about">About us</a></li>' +
              '<li><a href="#">Our artisans</a></li>' +
              '<li><a href="#">Sustainability</a></li>' +
            "</ul></div>" +
            '<div><h2>Collection</h2><ul>' +
              '<li><a href="./index.html#products">Modest wear</a></li>' +
              '<li><a href="./index.html#products">Abayas &amp; silks</a></li>' +
              '<li><a href="./index.html#products">Everyday tops</a></li>' +
            "</ul></div>" +
            '<div><h2>Styling</h2><ul>' +
              '<li><a href="#">Hijab styling</a></li>' +
              '<li><a href="./index.html#lookbook">Lookbook</a></li>' +
              '<li><a href="#">Modesty guide</a></li>' +
            "</ul></div>" +
            '<div><h2>Orders</h2><ul>' +
              '<li><a href="#">Shipping &amp; returns</a></li>' +
              '<li><a href="#">Track order</a></li>' +
              '<li><a href="#">Order FAQs</a></li>' +
            "</ul></div>" +
            '<div><h2>Legal</h2><ul>' +
              '<li><a href="#">Privacy policy</a></li>' +
              '<li><a href="#">Terms of service</a></li>' +
              '<li><a href="#">Cookie settings</a></li>' +
            "</ul></div>" +
            '<div><h2>Help</h2><ul>' +
              '<li><a href="./contact.html">Contact support</a></li>' +
              '<li><a href="#">WhatsApp concierge</a></li>' +
              '<li><a href="#">Share feedback</a></li>' +
            "</ul></div>" +
          "</nav>" +
          '<div class="lhf-bottom">' +
            '<p>© 2026 LANCHI FOR HER. All rights reserved. Fashion that celebrates every woman.</p>' +
            '<p class="lhf-secure"><span class="material-symbols-outlined">lock</span>Secure 256-bit checkout <span aria-hidden="true">•</span> Express doorstep delivery</p>' +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  var headerMount = document.getElementById("lhf-header-mount");
  if (headerMount) headerMount.outerHTML = headerHTML();

  var footerMount = document.getElementById("lhf-footer-mount");
  if (footerMount) footerMount.outerHTML = footerHTML();

  if (!window.__lhfMenuBound) {
    var menuBtn = document.getElementById("menuBtn");
    var mobileNav = document.getElementById("mobileNav");
    if (menuBtn && mobileNav) {
      window.__lhfMenuBound = true;
      menuBtn.addEventListener("click", function () {
        var open = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!open));
        menuBtn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
        var icon = menuBtn.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = open ? "menu" : "close";
        mobileNav.classList.toggle("is-open", !open);
      });
    }
  }

  if (footerMount && !window.__lhfSpotBound) {
    var footer = document.querySelector(".footer-spotlight");
    if (footer && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.__lhfSpotBound = true;
      var moveFrame = null;
      var pointerX = 0;
      var pointerY = 0;
      footer.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "mouse") return;
        footer.style.setProperty("--spotlight-opacity", "1");
      });
      footer.addEventListener("pointermove", function (event) {
        if (event.pointerType !== "mouse") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (moveFrame) return;
        moveFrame = requestAnimationFrame(function () {
          var rect = footer.getBoundingClientRect();
          footer.style.setProperty("--mouse-x", (pointerX - rect.left) + "px");
          footer.style.setProperty("--mouse-y", (pointerY - rect.top) + "px");
          moveFrame = null;
        });
      });
      footer.addEventListener("pointerleave", function () {
        footer.style.setProperty("--spotlight-opacity", "0");
        if (moveFrame) {
          cancelAnimationFrame(moveFrame);
          moveFrame = null;
        }
      });
    }
  }
})();
