const uls = document.getElementsByTagName("ul");
const imgHeight = 120;

/**
 * domに対してduration秒ごとに画像を移動させる
 * @param {DOM} dom 
 * @param {number} duration 
 */
function imageMove(dom, duration) {
  setInterval(function () {
    dom.style.transition = "all .4s linear";
    const style = getComputedStyle(dom);
    let top = parseFloat(style.top) - imgHeight;
    dom.style.top = top + "px";
    dom.addEventListener("transitionend", function () {
      if (top <= -(dom.children.length - 1) * imgHeight) {
        top = 0;
        returnToTop(dom);
      }
    })
  }, duration);
}

/**
 * 最初の要素をクローンして追加する
 */
function cloneFirstElement() {
  for (let i = 0; i < uls.length; i++) {
    const node = uls[i].firstElementChild.cloneNode(true);
    uls[i].appendChild(node);
  }
}

/**
 * domの頂点に戻る関数
 * @param {DOM} dom 
 * @param {number} top 
 */
function returnToTop(dom) {
  dom.style.transition = "none";
  dom.style.top = 0;
}

cloneFirstElement();

imageMove(uls[0], 10 * 60 * 60 * 1000);
imageMove(uls[1], 60 * 60 * 1000);
imageMove(uls[2], 10 * 60 * 1000);
imageMove(uls[3], 60 * 1000);
imageMove(uls[4], 10 * 1000);
imageMove(uls[5], 1000);
