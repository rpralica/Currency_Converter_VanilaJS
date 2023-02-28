'use strict';

const btnConvert = document.getElementById('btnConvert');
let selFrom = document.getElementById('selFrom');
let selTo = document.getElementById('selTo');
let inpAmount = document.getElementById('inpAmount');
const inpResult = document.getElementById('inpResult');
const poruka = document.getElementById('poruka');
const swap = document.getElementById('swap');

inpAmount.addEventListener('input', function (e) {
  e.preventDefault();
  ime();
});
swap.addEventListener('click', function (e) {
  e.preventDefault();

  zamjena(selFrom, selTo);
  zamjena(inpAmount, inpResult);
  ime();
});

function zamjena(a, b) {
  let temp = a.value;

  a.value = b.value;
  b.value = temp;
}

function ime() {
  let fromCurrency = selFrom.value;
  let toCurrency = selTo.value;
  let amount = inpAmount.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/11656c6fa8f018b5d69fcebe/latest/${fromCurrency}`
  )
    .then(res => {
      return res.json();
    })

    .then(data => {
      let rate = data.conversion_rates[toCurrency];
      let total = rate * amount;
      poruka.innerHTML = `1 ${selFrom.value} = ${rate} ${selTo.value}`;
      poruka.style.opacity = 1;
      inpResult.value = `${total.toFixed(2)}`;
    });
}

function lastUpdate() {
  let fromCurrency = selFrom.value;
  let toCurrency = selTo.value;
  let amount = inpAmount.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/11656c6fa8f018b5d69fcebe/latest/${fromCurrency}`
  )
    .then(res => {
      return res.json();
    })

    .then(data => {
      let rate = data.conversion_rates[toCurrency];
      let total = rate * amount;

      poruka.innerHTML = `1 ${selFrom.value} = ${rate} ${selTo.value}`;
      poruka.style.opacity = 1;
      inpResult.value = `${total.toString()}`;
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const datum = new Date(`${data.time_last_update_utc}`);

      const mjesec = months[datum.getMonth()];
      const godina = datum.getFullYear();
      const dan = datum.getDate();
      const totalDate = `${dan} ${mjesec} ${godina}`;
      document.getElementById('baner2').innerHTML =
        'Lastly updated: ' + totalDate;
    });
}
lastUpdate();
