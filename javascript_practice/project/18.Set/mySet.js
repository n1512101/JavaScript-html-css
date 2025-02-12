class MySet {
  constructor(iterator = []) {
    // 引数がイテレーターであるかどうか
    if (typeof iterator[Symbol.iterator] !== "function") {
      throw new TypeError(`${iterator} is not iterable (cannot read property Symbol(Symbol.iterator))`);
    }
    this._data = [];
    for (const item of iterator) {
      this.add(item);
    }
  }

  get size() {
    return this._data.length;
  }

  add(data) {
    if (!this.has(data)) {
      this._data.push(data);
    }
  }

  has(data) {
    for (const item of this._data) {
      if (this.isEqual(data, item)) {
        return true;
      }
    }
    return false;
  }

  delete(data) {
    for (let i = 0; i < this._data.length; i++) {
      if (this.isEqual(data, this._data[i])) {
        this._data.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this._data.length = 0;
  }

  // インスタンスをイテレーターにする
  *[Symbol.iterator]() {
    for (const item of this._data) {
      yield item;
    }
  }

  forEach(callback) {
    for (const item of this._data) {
      callback(item, item, this);
    }
  }

  /**
   * 2つのデータは等しいか
   * @param {*} data1 
   * @param {*} data2 
   */
  isEqual(data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }
    return Object.is(data1, data2);
  }
}

const s = new MySet([1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8]);
console.log(s)
s.delete(5)
console.log(s)
s.forEach((a1, a2, a3) => {
  console.log(a1, a2, a3);
})