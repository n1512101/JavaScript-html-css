const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameWidth, top, speed, 0, dom);
  }

  onMove() {
    // パイプが左端に移動した際にdomを削除する
    if (this.left <= -this.width) {
      this.dom.remove();
    }
  }
}

class PipePair {
  constructor(speed) {
    this.spaceHeight = 150;  // パイプ間の距離
    this.minHeight = 80;     // パイプの最小の高さ
    this.maxHeight = landTop - this.minHeight - this.spaceHeight;
    const upHeight = getRandom(this.minHeight, this.maxHeight);
    const upDom = document.createElement('div');
    upDom.className = "pipe up";
    this.upPipe = new Pipe(upHeight, 0, speed, upDom);
    const downDom = document.createElement('div');
    downDom.className = "pipe down";
    const downHeight = landTop - upHeight - this.spaceHeight;
    const downTop = landTop - downHeight;
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

    gameDom.appendChild(upDom);
    gameDom.appendChild(downDom);
  }

  // このPipePairはすでに画面からはみ出しているか
  get useLess() {
    return this.upPipe.left <= -this.upPipe.width;
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class ProducePipePair {
  constructor(speed) {
    this.speed = speed;
    this.pairs = [];
    this.timer = null;
    this.tick = 1500;
  }

  startProduce() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.pairs.push(new PipePair(this.speed));
      // 必要のないパイプを削除する
      for (let i = 0; i < this.pairs.length; i++) {
        if (this.pairs[i].useLess) {
          this.pairs.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
  }

  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
