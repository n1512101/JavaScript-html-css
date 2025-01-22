if (!window.myPlugin) {
  window.myPlugin = {};
}


window.myPlugin.openConfirm = (function () {
  let divModal, divCenter, options, spanTitle, spanClose, divContent, confirmBtn, cancelBtn, isRegEvent = false;

  /**
   * 確認用フォームを表示
   */
  function openConfirm(opts = {}) {
    options = opts;
    initModal();
    initCenterDiv();
    regEvent();
  }

  /**
   * 各要素のイベントを定義する
   */
  function regEvent() {
    if (!isRegEvent) {
      isRegEvent = true;

      spanClose.onclick = function () {
        divModal.style.display = "none";
      }
      divModal.onclick = function (e) {
        if (e.target === this) {
          divModal.style.display = "none";
        }
      }
      confirmBtn.onclick = function () {
        if (options.onconfirm) {
          options.onconfirm();
        }
        divModal.style.display = "none";
      }
      cancelBtn.onclick = function () {
        if (options.oncancel) {
          options.oncancel();
        }
        divModal.style.display = "none";
      }
    }
  }

  /**
   * modalを初期化
   */
  function initModal() {
    if (!divModal) {
      divModal = document.createElement('div');
      divModal.style.position = "fixed";
      divModal.style.backgroundColor = "rgba(0, 0, 0, .4)";
      divModal.style.width = divModal.style.height = "100%";
      divModal.style.top = divModal.style.left = 0;
      document.body.appendChild(divModal);
    }
    divModal.style.display = "block";
  }

  /**
   * 中央のdivを初期化
   */
  function initCenterDiv() {
    if (!divCenter) {
      divCenter = document.createElement('div');
      divCenter.style.position = "absolute";
      divCenter.style.width = "260px";
      divCenter.style.height = "160px";
      divCenter.style.backgroundColor = "white";
      divCenter.style.left = divCenter.style.right = divCenter.style.top = divCenter.style.bottom = 0;
      divCenter.style.margin = "auto";
      divCenter.style.fontSize = "14px";
      initDivCenterContent();
      divModal.appendChild(divCenter);

      // 各要素を取得
      spanTitle = document.querySelector('[data-myplugin-id="title"]');
      spanClose = document.querySelector('[data-myplugin-id="close"]');
      divContent = document.querySelector('[data-myplugin-id="content"]');
      confirmBtn = document.querySelector('[data-myplugin-id="confirm"]');
      cancelBtn = document.querySelector('[data-myplugin-id="cancel"]');
    }

    spanTitle.innerText = options.title || "情報";
    divContent.innerText = options.content || "";
    confirmBtn.innerText = options.confirmText || "確認";
    confirmBtn.className = options.confirmClass || "";
    cancelBtn.innerText = options.cancelText || "キャンセル";
    cancelBtn.className = options.cancelClass || "";
  }

  /**
   * divCenter内部のコンテンツを初期化
   */
  function initDivCenterContent() {
    // タイトルdiv
    let div = document.createElement("div");
    div.style.height = "40px";
    div.style.backgroundColor = "#eee";
    div.style.boxSizing = "border-box";
    div.style.padding = "10px 20px 0";
    div.innerHTML = `
      <span data-myplugin-id="title" style="float: left;"></span>
      <span data-myplugin-id="close" style="float: right; cursor: pointer;">X</span>
    `;
    divCenter.appendChild(div);

    // 中身のdiv
    div = document.createElement('div');
    div.dataset.mypluginId = "content";
    div.style.height = "70px";
    div.style.boxSizing = "border-box";
    div.style.padding = "20px";
    divCenter.appendChild(div);

    // ボタンdiv
    div = document.createElement('div');
    div.style.height = "50px";
    div.style.boxSizing = "border-box";
    div.style.padding = "10px 20px";
    div.style.textAlign = "right";
    div.innerHTML = `
      <button data-myplugin-id="confirm"></button>
      <button data-myplugin-id="cancel"></button>
    `;
    divCenter.appendChild(div);
  }

  return openConfirm;
}())

