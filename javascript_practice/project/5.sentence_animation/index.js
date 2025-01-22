const ul = document.querySelector('.left ul');
const height = 30;
let curTop = 0;

// 最初のliをコピー
(function cloneFirstLi() {
  const newLi = ul.children[0].cloneNode(true);
  ul.appendChild(newLi);
})();

/**
 * スクロール開始
 */
(function startScroll() {
  setInterval(scroll, 2000);
})();

function scroll() {
  const animate = new myPlugin.Animate({
    total: 500,
    begin: {
      scrollTop: curTop
    },
    end: {
      scrollTop: curTop + height
    },
    onmove: function () {
      curTop = this.currentData.scrollTop;
      ul.scrollTop = curTop;
    },
    onover: function () {
      if (curTop === ul.scrollHeight - height) {
        curTop = 0;
        ul.scrollTop = 0;
      }
    }
  });
  animate.start();
}