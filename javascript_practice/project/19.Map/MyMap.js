class MyMap {
  constructor(iterable = []) {
    // 引数がイテレーターかどうか
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`);
    }
    this._datas = [];
    for (const item of iterable) {
      // 引数の各要素がイテレーターかどうか
      if (typeof item[Symbol.iterator] !== "function") {
        throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`);
      }
      const iterator = item[Symbol.iterator]();
      const key = iterator.next().value;
      const value = iterator.next().value;
      this.set(key, value);
    }
  }

  set(key, value) {
    const obj = this._getObj(key);
    if (obj) {
      // 上書き
      obj.value = value;
    } else {
      this._datas.push({ key, value });
    }
  }

  get(key) {
    const obj = this._getObj(key);
    if (obj) {
      return obj.value;
    }
  }

  get size() {
    return this._datas.length;
  }

  /**
   * keyの値よりthis._datas内に対応する要素を探す
   * @param {*} key 
   */
  _getObj(key) {
    for (let i = 0; i < this._datas.length; i++) {
      if (this.isEqual(key, this._datas[i].key)) {
        return this._datas[i];
      }
    }
  }

  has(key) {
    return !!this._getObj(key);
  }

  isEqual(key1, key2) {
    if (key1 === 0 && key2 === 0) {
      return true;
    } else {
      return Object.is(key1, key2);
    }
  }

  delete(key) {
    for (let i = 0; i < this._datas.length; i++) {
      if (this.isEqual(this._datas[i].key, key)) {
        this._datas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this._datas.length = 0;
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield [item.key, item.value];
    }
  }

  forEach(callback) {
    for (let item of this._datas) {
      callback(item.key, item.value, this);
    }
  }
}