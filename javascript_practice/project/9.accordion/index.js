(function () {
  const itemHeight = 30;
  const container = document.querySelector('.menu-container');

  container.addEventListener('click', function (e) {
    if (e.target.tagName === "H2") {
      const openedSubmenu = container.querySelector("ul[status=opened]")
      if (openedSubmenu) {
        closeSubmenu(openedSubmenu);
      }
      toggleSubmenu(e.target.nextElementSibling);
    }
  })

  function openSubmenu(submenu) {
    const status = submenu.getAttribute("status");
    if (status === "playing" || status === "opened") {
      return;
    }
    submenu.setAttribute("status", "playing");
    createAnimation({
      from: 0,
      to: submenu.children.length * itemHeight,
      totalMS: 2000,
      duration: 16,
      onmove: function (n) {
        submenu.style.height = n + "px";
      },
      onend: function () {
        submenu.setAttribute("status", "opened");
      }
    })
  }

  function closeSubmenu(submenu) {
    const status = submenu.getAttribute("status");
    if (status !== "opened") {
      return;
    }
    submenu.setAttribute("status", "playing");
    createAnimation({
      from: submenu.children.length * itemHeight,
      to: 0,
      totalMS: 2000,
      duration: 16,
      onmove: function (n) {
        submenu.style.height = n + "px";
      },
      onend: function () {
        submenu.setAttribute("status", "closed");
      }
    })
  }

  function toggleSubmenu(submenu) {
    const status = submenu.getAttribute("status");
    if (status === "playing") {
      return;
    } else if (status === "opened") {
      closeSubmenu(submenu);
    } else {
      openSubmenu(submenu);
    }
  }
})();