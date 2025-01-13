/**
 * タイマーを作成する関数
 * @param {*} callback, 時間ごとに実行する関数
 * @param {*} thisArg, thisが参照するオブジェクト
 * @returns 
 * 1. start: タイマー開始
 * 2. stop: タイマー終了
 */
function getTimer(duration, thisArg, callback) {
  let timer;
  return {
    start: function () {
      if (timer) return;
      timer = setInterval(callback.bind(thisArg), duration);
    },
    stop: function () {
      clearInterval(timer);
      timer = null;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ゲームオブジェクト
const game = {
  dom: document.querySelector('.game'),
  overDom: document.querySelector('.game .over'),
  isPause: true, // ゲームがストップしている状態か
  isOver: false, // ゲームオーバーしているか
  start: function () {
    sky.timer.start();
    land.timer.start();
    bird.swingTimer.start();
    bird.dropTimer.start();
    pairManager.produceTimer.start();
    pairManager.moveTimer.start();
    hitManager.timer.start();
    score.timer.start();
    this.isPause = false;
  },
  stop: function () {
    sky.timer.stop();
    land.timer.stop();
    bird.swingTimer.stop();
    bird.dropTimer.stop();
    pairManager.produceTimer.stop();
    pairManager.moveTimer.stop();
    hitManager.timer.stop();
    score.timer.stop();
    this.isPause = true;
  }
}
game.width = game.dom.clientWidth; // ゲームの横サイズ
game.height = game.dom.clientHeight; // ゲームの縦サイズ

// スカイオブジェクト
const sky = {
  left: 0,
  dom: document.querySelector('.game .sky'),
}
sky.timer = getTimer(16, sky, function () {
  this.left--;
  if (this.left === -game.width) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
})

// 地面オブジェクト
const land = {
  left: 0,
  dom: document.querySelector('.game .land'),
}
land.height = land.dom.clientHeight; // 地面の高さ
land.top = game.height - land.height; // 地面のtopの値
land.timer = getTimer(16, land, function () {
  this.left -= 2;
  if (this.left === -game.width) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
})

// birdオブジェクト
const bird = {
  dom: document.querySelector('.game .bird'),
  left: 150,
  top: 150,
  width: 33,
  height: 26,
  swingIndex: 0,  // はねの状態: 0~2
  a: 0.002, // 加速度
  v: 0,           // 現在の縦方向の速度
  t: 16,          // 加速度タイマーの時間間隔
  show() {
    // はねの状態によってbackground-positionの値を変更する
    if (this.swingIndex === 0) {
      this.dom.style.backgroundPosition = "-8px -10px";
    } else if (this.swingIndex === 1) {
      this.dom.style.backgroundPosition = "-60px -10px";
    } else {
      this.dom.style.backgroundPosition = "-113px -10px";
    }
    // birdの位置を計算する
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  },
  // birdのtopをコントロールする
  setTop(top) {
    if (top < 0) {
      top = 0;
    } else if (top > land.top - this.height) {
      top = land.top - this.height;
    }
    this.top = top;
    this.show();
  },
  jump() {
    this.v = -0.5;
  }
}
// birdはねのタイマー
bird.swingTimer = getTimer(200, bird, function () {
  this.swingIndex = (this.swingIndex + 1) % 3;
  this.show();
})
// bird加速度タイマー
bird.dropTimer = getTimer(bird.t, bird, function () {
  // 縦の移動距離
  const dis = this.v * this.t + 0.5 * this.a * this.t * this.t;
  // 加速度の変化
  this.v += this.a * this.t;
  // topを変更
  this.setTop(this.top + dis);
})

/**
 * パイプのコンストラクタ関数
 * @param {*} direction up,down
 * @param {*} height パイプの高さ
 */
function Pipe(direction, height) {
  this.width = Pipe.width;
  this.left = game.width;
  this.height = height;
  // パイプのtop
  if (direction === "up") {
    this.top = 0;
  } else {
    this.top = land.top - this.height;
  }
  this.dom = document.createElement('div');
  this.dom.className = "pipe " + direction;
  this.dom.style.height = this.height + "px";
  this.dom.style.top = this.top + "px";
  this.show();
  game.dom.appendChild(this.dom);
}
Pipe.width = 52;
/**
 * パイプのleftを決定する
 */
Pipe.prototype.show = function () {
  this.dom.style.left = this.left + "px";
}
/**
 * 1ペアのパイプのコンストラクタ関数
 */
function PipePair() {
  const minHeight = 60, gap = 150;
  const maxHeight = land.top - minHeight - gap;
  const height = getRandom(minHeight, maxHeight);
  this.up = new Pipe("up", height);
  this.down = new Pipe("down", land.top - height - gap);
  this.left = game.width;
}
PipePair.isPassed = false; // birdがすでにこのpipeを通過しているかどうか
/**
 * 1ペアのパイプのleftを変更する
 */
PipePair.prototype.move = function () {
  this.up.left = this.left;
  this.down.left = this.left;
  this.up.show();
  this.down.show();
}

/**
 * 1ペアのパイプを削除する関数
 */
PipePair.prototype.remove = function () {
  this.up.dom.remove();
  this.down.dom.remove();
}

// パイプコントローラー
const pairManager = {
  pairs: [],
}

// パイプ作成タイマー
pairManager.produceTimer = getTimer(1700, pairManager, function () {
  this.pairs.push(new PipePair());
})

// パイプ移動タイマー
pairManager.moveTimer = getTimer(16, pairManager, function () {
  for (let pair of this.pairs) {
    pair.left -= 2;
    if (pair.left <= -Pipe.width) {
      pair.remove();
      // pairをpairManager.pairsの中から削除する
      this.pairs.shift();
    } else {
      pair.move();
    }
  }
})

// 衝突を検出するタイマー
const hitManager = {
  // 衝突したかどうか true: 衝突した false: 衝突していない
  validate() {
    // 地面と衝突しているか
    if (bird.top >= land.top - bird.height) {
      return true;
    }
    // パイプと衝突しているか
    for (let i = 0; i < pairManager.pairs.length; i++) {
      const pair = pairManager.pairs[i];
      if (this.validateBirdAndPipe(pair.up) || this.validateBirdAndPipe(pair.down)) {
        return true;
      }
    }
    return false;
  },
  // あるパイプが鳥と衝突しているかどうか
  validateBirdAndPipe(pipe) {
    // birdの中心のx, y座標
    const bx = bird.left + bird.width / 2, by = bird.top + bird.height / 2;
    // pipeの中心のx, y座標
    const px = pipe.left + pipe.width / 2, py = pipe.top + pipe.height / 2;
    if ((Math.abs(bx - px) <= (bird.width + pipe.width) / 2) && (Math.abs(by - py) <= (bird.height + pipe.height) / 2)) {
      return true;
    } else {
      return false;
    }
  }
};
hitManager.timer = getTimer(16, hitManager, function () {
  if (this.validate()) {
    game.stop();
    game.overDom.style.display = "block";
    game.isOver = true;
  }
});

// スコアのオブジェクト
const score = {
  number: 0,
  dom: document.querySelector('.game .score span'),
}
// スコア更新タイマー
score.timer = getTimer(16, score, function () {
  // 1ペアのパイプが通りすぎるとスコアを1足す
  for (let pair of pairManager.pairs) {
    if (bird.left >= (pair.left + Pipe.width) && (!pair.isPassed)) {
      this.number++;
      this.dom.innerText = this.number;
      pair.isPassed = true;
    }
  }
})

// イベント定義
window.onkeydown = function (e) {
  if (e.key === "Enter") {
    if (game.isOver) {
      // 画面をリロードする
      location.reload();
      return;
    }
    // ゲーム開始、終了
    if (game.isPause) {
      game.start();
    } else {
      game.stop();
    }
  } else if (e.key === " ") {
    e.preventDefault();
    bird.jump();
  }
}