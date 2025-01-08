const container = document.querySelector('.container');
const aHeight = 30;

container.addEventListener('click', function (e) {
  if (e.target.tagName === "H3") {
    const div = e.target.nextElementSibling;
    if (div.classList.contains('active')) {
      return;
    }
    const before = container.querySelector('.active')
    if (before) {
      const prevHeight = before.clientHeight, targetHeight = 0;
      hideDiv(before, prevHeight, targetHeight);
    }

    div.classList.add("active");
    const prevHeight = 0, targetHeight = div.children.length * aHeight;
    showDiv(div, prevHeight, targetHeight);
  }
})

function hideDiv(div, prevHeight, targetHeight) {
  div.style.height = prevHeight + "px";
  const animate = new myPlugin.Animate({
    duration: 30,
    total: 300,
    begin: {
      height: prevHeight,
    },
    end: {
      height: targetHeight,
    },
    onmove: function () {
      div.style.height = this.currentData.height + "px";
    },
    onover: function () {
      div.classList.remove("active");
    }
  })
  animate.start();
}

function showDiv(div, prevHeight, targetHeight) {
  div.style.height = prevHeight + "px";
  const animate = new myPlugin.Animate({
    duration: 30,
    total: 300,
    begin: {
      height: prevHeight,
    },
    end: {
      height: targetHeight,
    },
    onmove: function () {
      div.style.height = this.currentData.height + "px";
    }
  })
  animate.start();
}