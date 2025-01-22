function createAnimation(options) {
  let from = options.from;
  const to = options.to;
  const totalMS = options.totalMS || 1000;
  const duration = options.duration || 15;
  const times = Math.floor(totalMS / duration);
  const dis = (to - from) / times;
  let curTimes = 0;  // 現在の変化した回数
  let timer = setInterval(function () {
    from += dis;
    curTimes++;
    if (curTimes >= times) {
      from = to;
      clearInterval(timer);
      options.onend && options.onend();
    }
    options.onmove && options.onmove(from);
  }, duration);
}

/*
createAnimation({
  from: 0,
  to: 120,
  totalMS: 500,
  duration: 10,
  onmove: function (n) {
    // n: 毎回の値
    console.log(n)
  },
  onend: function () {

  }
})
*/