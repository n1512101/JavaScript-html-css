if (!window.myPlugin) {
  window.myPlugin = {};
}

/**
 * 画像waterfallを作成する関数
 */
window.myPlugin.createWaterFall = function (option) {
  // デフォルトのオプション
  const defaultOption = {
    minHGap: 10, // 水平方向の最小gap
    minVGap: 10, // 垂直方向の最小gap
    imgSrcs: [], // 画像のパス
    imgWidth: 220, // 画像の横幅
    container: document.body // 画像を入れるDOM
  };
  option = Object.assign({}, defaultOption, option);

  // 画像の親要素をposition: static;以外にする
  handleParent();
  // 画像を作成する
  createImgs();
  // 各画像の座標を設定する
  setImgPosition();

  /**
   * 各画像の座標を設定する
   */
  function setImgPosition() {

  }

  /**
   * 画像elementを作成する関数
   */
  function createImgs() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < option.imgSrcs.length; i++) {
      const img = document.createElement('img');
      img.src = option.imgSrcs[i];
      img.style.width = option.imgWidth + "px";
      img.style.position = "absolute";
      fragment.appendChild(img);
    }
    option.container.appendChild(fragment);
  }

  /**
   * 画像の親要素はposition: static;以外でなければならない
   */
  function handleParent() {
    const style = getComputedStyle(option.container);
    if (style.position === "static") {
      option.container.style.position = "relative";
    }
  }
}