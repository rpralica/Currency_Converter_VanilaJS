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
  //zamjena(inpAmount, inpResult);
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
      console.log(data);
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

      //Next update
      const nextDatum = new Date(`${data.time_next_update_utc}`);
      const nextMjesec = months[nextDatum.getMonth()];
      const nextGodina = nextDatum.getFullYear();
      const nextDan = nextDatum.getDate();
      const nextTotalDate = `${nextDan} ${nextMjesec} ${nextGodina}`;

      document.getElementById(
        'baner2'
      ).innerHTML = `Last update:<span style="color:yellow">  ${totalDate}</span>  <br>
      Next update:  <span class="text-danger"> ${nextTotalDate}
      `;
    });
}
lastUpdate();
//time_next_update_utc

selFrom.addEventListener('click', ime);
selTo.addEventListener('click', ime);
