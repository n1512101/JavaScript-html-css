/**
 * 数が奇数かどうか
 * @param {number} n 
 * @returns {boolean}
 */
function isOdd(n) {
  return n % 2 !== 0;
}

/**
 * 数が素数かどうか
 * @param {number} n 
 * @returns {boolean}
 */
function isPrime(n) {
  if (n < 2) return false
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

/**
 * 配列内の要素の和を返す
 * @param {Array} arr 
 * @returns {number}
 */
function sumOfArray(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

/**
 * 配列の要素の最大値を返す
 * @param {Array} arr 
 * @returns {number}
 */
function maxOfArray(arr) {
  if (arr.length === 0) return
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

/**
 * 配列の要素の最小値を返す
 * @param {Array} arr 
 * @returns {number}
 */
function minOfArray(arr) {
  if (arr.length === 0) return
  let min = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  return min
}

/**
 * 配列の中にempty要素があるかどうか
 * @param {*} arr 
 * @returns 
 */
function hasEmptyInArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) {
      return true
    }
  }
  return false
}

/**
 * うるう年かどうか
 * @param {number} year 
 * @returns {boolean}
 */
function isLeap(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}

/**
 * 年と月を入力して、日数を返す
 * @param {number} year 
 * @param {number} month 
 * @returns {number}
 */
function getDays(year, month) {
  if (month === 2) {
    return isLeap(year) ? 29 : 28
  } else if (month < 8 && isOdd(month) || month >= 8 && !isOdd(month)) {
    return 31
  } else {
    return 30
  }
}

/**
 * 配列の中の一番多い数とその回数を返す
 * @param {Array} arr 
 * @returns 
 */
function getTopFreqInArray(arr) {
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
}