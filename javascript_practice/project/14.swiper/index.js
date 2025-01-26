(function () {
  const config = {
    container: document.querySelector('.carousel-container'),
    carouselList: document.querySelector('.carousel-list'),
    indicator: document.querySelector('.indicator'),
    arrowLeft: document.querySelector('.arrow-left'),
    arrowRight: document.querySelector('.arrow-right'),
    images: ["./img/Wallpaper1.jpg", "./img/Wallpaper2.jpg", "./img/Wallpaper3.jpg", "./img/Wallpaper4.jpg", "./img/Wallpaper5.jpg"],
    curIndex: 0,  // 現在の画像のインデックス
    imgWidth: 500,
    timer: null,  // swiperタイマー
    duration: 1600,  // swiperが動作する時間間隔
    isPlaying: false,
  }

  init();

  // 初期化関数
  function init() {
    containerWidthInit();
    imageInit();
    indicatorInit();
    changeIndicatorStatus();
    swiperInit();
    onContainerEvent();
    onIndicatorEvent();
    onArrowEvent();
  }

  /**
   * carouselListのwidthを初期化する関数
   */
  function containerWidthInit() {
    const containerWidth = (config.images.length + 1) * config.imgWidth;
    config.carouselList.style.width = containerWidth + "px";
  }

  /**
   * 画像をcarouselListに追加する関数
   */
  function imageInit() {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < config.images.length; i++) {
      createImgNode(fragment, i);
    }
    createImgNode(fragment, 0);
    config.carouselList.appendChild(fragment);
  }

  /**
   * imgノードを作成してdomに追加する関数
   * @param {DOM} dom 
   * @param {number} i 
   */
  function createImgNode(dom, i) {
    const node = document.createElement('img');
    node.src = config.images[i];
    node.className = "carousel-item";
    dom.appendChild(node);
  }

  /**
   * indicatorを初期化する関数
   */
  function indicatorInit() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < config.images.length; i++) {
      const node = document.createElement('div');
      node.className = "indicator-item";
      fragment.appendChild(node);
    }
    config.indicator.appendChild(fragment);
  }

  /**
   * 指定したインデックスの画像に遷移する関数
   * @param {number} newIndex 
   */
  function moveTo(newIndex) {
    if (config.isPlaying || newIndex === config.curIndex) return;
    config.isPlaying = true;
    createAnimation({
      from: -config.curIndex * config.imgWidth,
      to: -newIndex * config.imgWidth,
      totalMS: 500,
      duration: 16,
      onmove: function (n) {
        config.carouselList.style.marginLeft = n + "px";
      },
      onend: function () {
        config.isPlaying = false;
        config.curIndex = newIndex;
        changeIndicatorStatus();
      }
    })
  }

  /**
   * config.curIndexのindicatorをactive状態にする関数
   * @param {number} index 
   */
  function changeIndicatorStatus() {
    if (config.curIndex >= config.images.length) {
      config.curIndex = 0;
    } else if (config.curIndex < 0) {
      config.curIndex = config.images.length - 1;
    }
    const selected = config.indicator.querySelector('.active');
    if (selected) {
      selected.classList.remove('active');
    }
    config.indicator.children[config.curIndex].classList.add('active');
  }

  /**
   * 次の画像に遷移する関数
   */
  function next() {
    const index = config.curIndex + 1;
    moveTo(index);
  }

  /**
   * 前の画像に遷移する関数
   */
  function prev() {
    let newIndex = config.curIndex - 1;
    if (config.curIndex === 0) {
      newIndex = config.images.length - 1;
      const index = config.images.length;
      config.curIndex = index;
    }
    moveTo(newIndex);
  }

  /**
   * swiperを初期化する関数
   */
  function swiperInit() {
    if (config.timer) return;
    config.timer = setInterval(next, config.duration);
  }

  /**
   * containerマウスイベント
   */
  function onContainerEvent() {
    config.container.addEventListener('mouseenter', _onMouseEnter);
    config.container.addEventListener('mouseleave', swiperInit);

    function _onMouseEnter() {
      clearInterval(config.timer);
      config.timer = null;
    }
  }

  /**
   * indicatorマウスイベント
   */
  function onIndicatorEvent() {
    config.indicator.addEventListener('click', function (e) {
      if (e.target.tagName === "DIV") {
        const index = Array.from(config.indicator.children).indexOf(e.target);
        if (index === -1) return;
        moveTo(index);
      }
    })
  }

  /**
   * arrowマウスイベント
   */
  function onArrowEvent() {
    config.arrowLeft.addEventListener('click', prev);
    config.arrowRight.addEventListener('click', next);
  }
})();
