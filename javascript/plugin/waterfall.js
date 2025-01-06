if (!window.myPlugin) {
  window.myPlugin = {};
}

/**
 * 画像waterfallを作成する関数
 */
window.myPlugin.createWaterFall = function (option) {
  // デフォルトのオプション
  const defaultOption = {
    minGap: 10, // 画像間gap
    imgSrcs: [], // 画像のパス
    imgWidth: 220, // 画像の横幅
    container: document.body // 画像を入れるDOM
  };
  option = Object.assign({}, defaultOption, option);
  const imgs = []; // すべての画像を格納する配列

  // 画像の親要素をposition: static;以外にする
  handleParent();
  // 画像を作成する
  createImgs();
  // 画像を並べる(画像ダウンロードは非同期のため、window.onloadの際に実行する必要がある)
  window.onload = setImgPosition;

  // ブラウザー画面サイズ変化デバウンス
  const debounce = myPlugin.debounce(setImgPosition, 300);
  // ブラウザー画面サイズが変化した場合
  window.onresize = debounce;

  /**
   * 各画像の座標を設定する
   */
  function setImgPosition() {
    const info = getHorizontalInfo();
    // arr: 各列における次のtop値を格納した配列
    const arr = new Array(info.number).fill(0)
    imgs.forEach(function (img) {
      /* 画像の座標を設定する */
      const minTop = Math.min(...arr);
      img.style.top = minTop + "px";
      const index = arr.indexOf(minTop);
      arr[index] += img.clientHeight + option.minGap;
      img.style.left = index * (option.imgWidth + info.gap) + "px";
    })
    // コンテナのheightを計算する
    option.container.style.height = Math.max(...arr) - info.gap + "px";
  }

  /**
   * 画像の水平方向の情報
   */
  function getHorizontalInfo() {
    const obj = {};
    // containerのclientWidth
    obj.containerWidth = option.container.clientWidth;
    // 横に並べられる画像の数
    obj.number = Math.floor((obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap));
    // 画像間の横方向の隙間を計算する
    obj.gap = (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1);
    return obj;
  }

  /**
   * 画像を作成する関数
   */
  function createImgs() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < option.imgSrcs.length; i++) {
      const img = document.createElement('img');
      img.src = option.imgSrcs[i];
      img.style.width = option.imgWidth + "px";
      img.style.position = "absolute";
      img.style.transition = ".5s";
      fragment.appendChild(img);
      imgs.push(img);
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