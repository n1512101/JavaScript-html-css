class Rectangle {
  constructor(width, height, left, top, xSpeed, ySpeed, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.dom = dom;
    this.render();
  }

  render() {
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }

  /**
   * 図形が移動した後の状態
   * @param {number} duration 移動時間 単位: 秒
   */
  move(duration) {
    const xDis = duration * this.xSpeed;
    const yDis = duration * this.ySpeed;
    this.left += xDis;
    this.top += yDis;

    // onMove()メソッドが存在する場合、メソッドを実行する
    if (this.onMove) {
      this.onMove();
    }

    this.render();
  }
}