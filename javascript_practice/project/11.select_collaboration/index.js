const provinceDom = document.querySelector('#province');
const cityDom = document.querySelector('#city');
const schoolDom = document.querySelector('#school');


setOptions(province, provinceDom);

provinceDom.addEventListener('change', function () {
  const cityObj = city[this.value];
  cityDom.innerHTML = "";
  schoolDom.innerHTML = "";
  if (!cityObj) return;
  setOptions(cityObj, cityDom);
  setOptions(allschool[cityDom.value], schoolDom);
})

cityDom.addEventListener('change', function () {
  schoolDom.innerHTML = "";
  setOptions(allschool[this.value], schoolDom);
})

/**
 * 指定したdom(select)にoptionを追加する関数
 * @param {Object} obj 
 * @param {dom} dom 
 */
function setOptions(obj, dom) {
  for (const key in obj) {
    const optionDom = document.createElement('option');
    optionDom.value = key;
    optionDom.innerText = obj[key];
    dom.appendChild(optionDom);
  }
}