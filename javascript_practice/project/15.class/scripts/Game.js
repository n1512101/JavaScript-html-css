class Game {
  constructor() {
    this.bird = new Bird();
    this.sky = new Sky();
    this.land = new Land(-100);
    this.pipeProducer = new ProducePipePair(-100);
    this.timer = null;
    this.tick = 16;
    this.gameOver = false;
  }

  start() {
    if (this.timer) return;
    if (this.gameOver) {
      window.location.reload();
    }
    this.pipeProducer.startProduce();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.bird.move(duration);
      this.land.move(duration);
      this.sky.move(duration);
      this.pipeProducer.pairs.forEach(pair => {
        pair.move(duration);
      })
      this.bird.startSwing();
      // 衝突確認
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
        console.log("game over")
      }
    }, this.tick);
  }

  /**
   * 2つの物体が衝突したかどうか
   * @param {Rectangle} rec1 
   * @param {Rectangle} rec2 
   */
  isHit(rec1, rec2) {
    // rec1, rec2の中心のx, y座標
    const centerX1 = rec1.left + rec1.width / 2;
    const centerY1 = rec1.top + rec1.height / 2;
    const centerX2 = rec2.left + rec2.width / 2;
    const centerY2 = rec2.top + rec2.height / 2;
    if (Math.abs(centerX1 - centerX2) < (rec1.width + rec2.width) / 2 && Math.abs(centerY1 - centerY2) < (rec1.height + rec2.height) / 2) {
      return true;
    }
    return false;
  }

  isGameOver() {
    if (this.bird.top >= this.bird.maxY) {
      // birdが地面についた
      return true;
    }
    for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
      const pair = this.pipeProducer.pairs[i];
      if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
        return true;
      }
    }
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipeProducer.stopProduce();
  }

  /**
   * イベント関数
   */
  regEvent() {
    window.addEventListener('keydown', (e) => {
      if (e.key === " ") {
        this.bird.jump();
      } else if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      }
    })
  }
}

const g = new Game();
g.regEvent();