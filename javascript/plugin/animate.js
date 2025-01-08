/*
  アニメーションプラグイン: 以下のように利用する
  const animate = new myPlugin.Animate({
    duration: 30,
    total: 5000,
    begin: {
      left: 100,
      top: 100,
      r: 0,
      g: 0,
      b: 0,
    },
    end: {
      left: 1000,
      top: 800,
      r: 200,
      g: 200,
      b: 200,
    },
    onstart: function () {
      console.log("start!");
    },
    onmove: function () {
      item.style.left = this.currentData.left + "px";
      item.style.top = this.currentData.top + "px";
      item.style.backgroundColor = `rgb(${this.currentData.r}, ${this.currentData.g}, ${this.currentData.b})`;
    },
    onover: function () {
      console.log("over!");
    },
  });
 */

if (!this.myPlugin) {
  this.myPlugin = {};
}

/**
 * アニメーション
 * @param {object} option 
 */
this.myPlugin.Animate = function (option) {
  // デフォルトオプション
  const defaultOption = {
    duration: 16, // 時間間隔
    total: 1000, // アニメーション時間長さ
    begin: {}, // 最初の値
    end: {}, // 変化後の値
  }
  this.option = Object.assign({}, defaultOption, option);
  this.timer = null;
  this.number = Math.ceil(this.option.total / this.option.duration) // トータル変化回数
  this.currentNumber = 0; // 現在における変化した回数
  this.currentData = myPlugin.clone(this.option.begin); // 現在におけるデータ

  this.distance = {}; // すべてのプロパティのそれぞれのトータルの変化距離
  this.everyDistance = {}; // すべてのプロパティのそれぞれ1回で移動する距離
  for (let prop in this.option.begin) {
    this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
    this.everyDistance[prop] = this.distance[prop] / this.number;
  }
}

/**
 * アニメーション開始
 */
this.myPlugin.Animate.prototype.start = function () {
  // timerがすでに存在している場合、関数を抜ける
  if (this.timer || this.number === this.currentNumber) {
    return;
  }
  // option内にonstart関数が存在する場合
  if (this.option.onstart) {
    this.option.onstart();
  }
  const that = this;
  this.timer = setInterval(function () {
    that.currentNumber++;
    if (that.currentNumber === that.number) {
      // 値が小数の場合、誤差があるため、最後の一回でthat.currentDataをthat.option.endとする
      that.currentData = that.option.end;
    } else {
      // that.currentDataを変化させる
      for (let prop in that.currentData) {
        that.currentData[prop] += that.everyDistance[prop];
      }
    }

    // option内にonmove関数が存在する場合
    if (that.option.onmove) {
      that.option.onmove.apply(that);
    }

    if (that.currentNumber === that.number) {
      that.stop();
      if (that.option.onover) {
        that.option.onover.apply(that);
      }
    }
  }, this.option.duration);
}

/**
 * アニメーション停止
 */
this.myPlugin.Animate.prototype.stop = function () {
  clearInterval(this.timer);
  this.timer = null;
}
