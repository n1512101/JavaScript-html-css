const skyDom = document.querySelector('.sky');
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width), skyHeight = parseFloat(skyStyle.height);

class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
  }

  onMove() {
    if (this.left <= -this.width / 2) {
      this.left = 0;
    }
  }
}
