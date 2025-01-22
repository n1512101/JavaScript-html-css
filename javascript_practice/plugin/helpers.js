if (!this.myPlugin) {
  this.myPlugin = {};
}

/**
 * sonにfatherを継承させる
 */
this.myPlugin.inherit = function (son, father) {
  // father.prototypeがprototypeであるオブジェクトを作成し、これをson.prototypeとする。
  son.prototype = Object.create(father.prototype);
  son.prototype.constructor = son;
  son.prototype.uber = father.prototype;
}

/**
 * obj1をobj2と混合させ、新しいオブジェクトを生成する
 */
this.myPlugin.mixin = function (obj1, obj2) {
  // const newObj = {};
  // for (let prop in obj2) {
  //   newObj[prop] = obj2[prop];
  // }
  // for (let prop in obj1) {
  //   if (!(prop in obj2)) {
  //     newObj[prop] = obj1[prop];
  //   }
  // }
  // return newObj;
  return Object.assign({}, obj1, obj2);
}

/**
 * オブジェクトをクローン
 * @param {Boolean} deep 深いクローンか
 */
this.myPlugin.clone = function (obj, deep) {
  if (Array.isArray(obj)) {
    if (deep) {
      const newArr = [];
      for (let item of obj) {
        const newItem = this.clone(item, deep);
        newArr.push(newItem);
      }
      return newArr;
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    const newObj = {};
    for (let prop in obj) {
      if (deep) {
        newObj[prop] = this.clone(obj[prop], deep);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

/**
 * デバウンス
 */
this.myPlugin.debounce = function (callback, time) {
  let timer;
  return function () {
    clearTimeout(timer);
    const args = arguments;
    timer = setTimeout(function () {
      callback(...args);
    }, time);
  }
}

/**
 * スロットル
 */
this.myPlugin.throttle = function (callback, time, immediately = true) {
  if (immediately) {
    /**
     * 最初の1回を即座に実行する
     */
    let t;
    return function () {
      if (!t || (Date.now() - t) >= time) {
        t = Date.now();
        callback(...arguments);
      }
    }
  } else {
    /**
     * time時間経過後に初めて実行する
     */
    let timer;
    return function () {
      if (timer) {
        return;
      }
      const args = arguments;
      timer = setTimeout(function () {
        callback(...args);
        timer = null;
      }, time);
    }
  }
}