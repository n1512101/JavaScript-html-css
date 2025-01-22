const lblScore = document.getElementById('total');
const lblPrice = document.getElementById('integral');
const table = document.getElementById('shopping');

table.addEventListener('click', function (e) {
    if (e.target.alt === "add") {
        setInputValue(e.target.previousElementSibling, 1);
    } else if (e.target.alt === "minus") {
        setInputValue(e.target.nextElementSibling, -1);
    } else if (e.target.type === "checkbox") {
        if (e.target.id === "allCheckBox") {
            const checkboxes = document.querySelectorAll('input[name="cartCheckBox"]');
            for (let checkbox of checkboxes) {
                checkbox.checked = e.target.checked;
            }
        }
        calTotal();
    } else if (e.target.parentNode.className === "cart_td_8") {
        deleteTr(e.target.parentNode.parentNode);
        calTotal();
    } else if (e.target.alt === "delete") {
        deleteChecked();
        calTotal();
    }
})

/**
 * tr消去
 * @param {*} tr 
 */
function deleteTr(tr) {
    tr.previousElementSibling.remove();
    tr.remove();
}

/**
 * checkされた項目をすべて削除
 */
function deleteChecked() {
    const trs = document.querySelectorAll('tbody tr[id^="product"]');
    for (let tr of trs) {
        if (getTrInfo(tr).check) {
            deleteTr(tr);
        }
    }
}

/**
 * 商品の数の増減
 * @param {*} inp 
 * @param {*} increase 
 */
function setInputValue(inp, increase) {
    let val = +inp.value + increase;
    if (val < 1) {
        val = 1;
    }
    inp.value = val;
    reCal();
}

/**
 * 値段とポイントを再度計算する
 */
function reCal() {
    calAllTrTotal();
    calTotal();
}

/**
 * ある行におけるトータルの値段
 * @param {*} tr 
 */
function calTrTotal(tr) {
    const info = getTrInfo(tr);
    const total = info.unitPrice * info.num;
    tr.querySelector('.cart_td_7').innerText = total.toFixed(2);
}

/**
 * すべてのtrのトータル値段を計算する
 */
function calAllTrTotal() {
    const trs = document.querySelectorAll('tbody tr[id^="product"]');
    for (let tr of trs) {
        calTrTotal(tr);
    }
}

/**
 * すべての商品の値段の合計を計算する
 */
function calTotal() {
    let total = 0, score = 0;
    const trs = document.querySelectorAll('tbody tr[id^="product"]');
    for (let tr of trs) {
        const info = getTrInfo(tr);
        if (info.check) {
            total += info.total;
            score += info.score * info.num;
        }
    }
    lblScore.innerText = total.toFixed(2);
    lblPrice.innerText = score;
}

/**
 * ある行におけるすべての情報を返す
 * @param {*} tr 
 */
function getTrInfo(tr) {
    // 商品の単価
    const unitPrice = +tr.querySelector('.cart_td_5').innerText;
    // 商品の数
    const num = +tr.querySelector('.cart_td_6 input').value;
    // ポイント
    const score = +tr.querySelector('.cart_td_4').innerText;
    // checkboxの値
    const check = tr.querySelector('.cart_td_1 input').checked;
    // トータルの値段
    const total = +tr.querySelector('.cart_td_7').innerText;
    return {
        unitPrice, num, score, check, total,
    }
}

reCal();