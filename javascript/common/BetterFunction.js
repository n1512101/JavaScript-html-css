const MyFunctions = {
  /**
 * 数が奇数かどうか
 * @param {number} n 
 * @returns {boolean}
 */
  isOdd: function (n) {
    return n % 2 !== 0;
  },
  /**
   * 数が素数かどうか
   * @param {*} n 
   * @returns 
   */
  isPrime: function (n) {
    if (n < 2) return false
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  },
  /**
   * 配列内の要素の和を返す
   * @param {Array} arr 
   * @returns {number}
   */
  sumOfArray: function (arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i]
    }
    return sum
  },
  /**
 * 配列の要素の最大値を返す
 * @param {Array} arr 
 * @returns {number}
 */
  maxOfArray: function (arr) {
    if (arr.length === 0) return
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i]
      }
    }
    return max
  },
  /**
 * 配列の要素の最小値を返す
 * @param {Array} arr 
 * @returns {number}
 */
  minOfArray: function (arr) {
    if (arr.length === 0) return
    let min = arr[0]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i]
      }
    }
    return min
  },
  /**
 * 配列の中にempty要素があるかどうか
 * @param {*} arr 
 * @returns 
 */
  hasEmptyInArray: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!(i in arr)) {
        return true
      }
    }
    return false
  },
  /**
 * うるう年かどうか
 * @param {number} year 
 * @returns {boolean}
 */
  isLeap: function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
  },
  /**
 * 年と月を入力して、日数を返す
 * @param {number} year 
 * @param {number} month 
 * @returns {number}
 */
  getDays: function (year, month) {
    if (month === 2) {
      return isLeap(year) ? 29 : 28
    } else if (month < 8 && this.isOdd(month) || month >= 8 && !this.isOdd(month)) {
      return 31
    } else {
      return 30
    }
  },
  /**
 * 配列の中の一番多い数とその回数を返す
 * @param {Array} arr 
 * @returns 
 */
  getTopFreqInArray: function (arr) {
    const record = {}
    for (let i = 0; i < arr.length; i++) {
      const n = arr[i]
      if (record[n]) {
        record[n]++
      } else {
        record[n] = 1
      }
    }
    let number, freq;
    for (let index in record) {
      if (!number || record[index] > record[number]) {
        number = +index
        freq = record[index]
      }
    }
    return { number, freq }
  },
  /**
   * 配列の中の要素を並べ替える
   * @param {Array} arr
   * @param {Function} compare 
   */
  sort: function (arr, compare) {
    if (!compare) {
      compare = function (a, b) {
        if (a > b) {
          return 1
        } else if (a === b) {
          return 0
        } else {
          return -1
        }
      }
    }

    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
    return arr
  },
  /**
   * 配列の中から条件に合う要素を抽出
   * @param {Array} arr 
   * @param {Function} callback 
   * @returns 
   */
  filter: function (arr, callback) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  /**
   * 配列の中から最初の条件に合う要素を抽出
   * @param {Array} arr 
   * @param {Function} callback 
   * @returns 
   */
  find: function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        return arr[i]
      }
    }
  },
  /**
   * 配列の中の条件に合う要素の総数を返す
   * @param {Array} arr 
   * @param {Function} callback 
   * @returns 
   */
  count: function (arr, callback) {
    let num = 0
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        num++;
      }
    }
    return num;
  },
  /**
   * minからmaxの間の任意の整数を返す
   * @param {*} min 
   * @param {*} max (maxを含まない)
   */
  getRandom: function (min, max) {
    return min + Math.floor(Math.random() * (max - min))
  },
  /**
   * 誕生日から年齢を計算する
   * @param {*} year 
   * @param {*} month 
   * @param {*} day 
   * @returns 
   */
  getAge: function (year, month, day) {
    const now = new Date()
    const dec = now.getFullYear() - year
    const birthdayThisYear = (new Date(year, month - 1, day)).setFullYear(now.getFullYear())
    return now > birthdayThisYear ? dec : dec - 1
  }
}
