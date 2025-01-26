const imgs = {
  small: ["imgA_1.jpg", "imgB_1.jpg", "imgC_1.jpg"],
  middle: ["imgA_2.jpg", "imgB_2.jpg", "imgC_2.jpg"],
  large: ["imgA_3.jpg", "imgB_3.jpg", "imgC_3.jpg"]
}

function $(selector) {
  return document.querySelector(selector);
}

const container = $(".container");
const largeImg = $(".right-img");
const midImg = $(".left-img");
const smallImgs = $(".img-list");
const mask = $(".mask");

// 初期化関数
function init() {
  setSmallImgs();
  onSmallImgClicked();
  onMidImgEvent();
}

// img-listに小さい写真を設置する関数
function setSmallImgs() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < imgs.small.length; i++) {
    const li = document.createElement('li');
    i === 0 && li.classList.add('selected');
    li.style.backgroundImage = `url(./images/${imgs.small[i]})`;
    fragment.appendChild(li);
  }
  smallImgs.appendChild(fragment);
}

// img-listの写真をクリックした時の処理を定義する関数
function onSmallImgClicked() {
  smallImgs.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
      document.querySelector('.selected').classList.remove('selected');
      e.target.classList.add('selected');
      const index = Array.from(smallImgs.children).indexOf(e.target);
      largeImg.style.backgroundImage = `url(./images/${imgs.large[index]})`;
      midImg.style.backgroundImage = `url(./images/${imgs.middle[index]})`;
    }
  })
}

// midImgにmouseイベントを定義する関数
function onMidImgEvent() {
  midImg.addEventListener("mousemove", function (e) {
    largeImg.style.display = "inline-block";
    mask.style.display = "block";
    let x, y;
    if (e.target.className === "left-img") {
      x = e.offsetX;
      y = e.offsetY;
    } else if (e.target.className === "mask") {
      const style = getComputedStyle(mask);
      x = e.offsetX + parseFloat(style.left);
      y = e.offsetY + parseFloat(style.top);
    }
    let left = x - mask.offsetWidth / 2;
    let top = y - mask.offsetHeight / 2;
    if (left < 0) left = 0;
    if (left > midImg.offsetWidth - mask.offsetWidth) left = midImg.offsetWidth - mask.offsetWidth;
    if (top < 0) top = 0;
    if (top > midImg.offsetHeight - mask.offsetHeight) top = midImg.offsetHeight - mask.offsetHeight;
    mask.style.left = `${left}px`;
    mask.style.top = `${top}px`;

    const largeImgLeft = left / midImg.offsetWidth * largeImg.offsetWidth;
    const largeImgTop = top / midImg.offsetHeight * largeImg.offsetHeight;
    largeImg.style.backgroundPosition = `-${largeImgLeft}px -${largeImgTop}px`;
  })
  midImg.addEventListener("mouseleave", function (e) {
    largeImg.style.display = "none";
    mask.style.display = "none";
  })
}

init();