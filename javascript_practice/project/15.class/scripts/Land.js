const landDom = document.querySelector('.land');
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width), landHeight = parseFloat(landStyle.height),
  landTop = parseFloat(landStyle.top);

class Land extends Rectangle {
  constructor(speed) {
    super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
  }

  onMove() {
    if (this.left <= -this.width / 2) {
      this.left = 0;
    }
  }
}

