(function () {
  const checkAll = document.querySelector('#checkAll');
  const checkboxes = document.querySelectorAll('.checkbox');
  const tbody = document.querySelector('tbody');
  const ths = document.getElementsByTagName('th');
  const trs = tbody.querySelectorAll('tr');

  function init() {
    initEvents();
  }

  function initEvents() {
    checkAll.addEventListener('change', onChangeAllCheckbox)
    tbody.addEventListener('click', onCheckBoxClicked);
    for (let i = 1; i < ths.length; i++) {
      if (i === 1 || i === 3) {
        ths[i].addEventListener('click', function () {
          onThClicked(i);
        });
      }
    }
  }

  // すべてのclass="checkbox"の要素を変更する関数
  function onChangeAllCheckbox() {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
    }
  }

  // class="checkbox"の要素がクリックされた際の関数
  function onCheckBoxClicked(e) {
    if (e.target.tagName === "INPUT") {
      let checkNumber = 0;
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          checkNumber++;
        }
      }
      checkAll.checked = checkNumber === checkboxes.length;
    }
  }

  // ID, ageがクリックされた際に動作する関数
  function onThClicked(index) {
    const newTrs = Array.prototype.slice.call(trs);
    newTrs.sort(function (a, b) {
      return a.children[index].innerText - b.children[index].innerText;
    })
    for (let i = 0; i < newTrs.length; i++) {
      tbody.appendChild(newTrs[i]);
    }
  }

  init();
})();