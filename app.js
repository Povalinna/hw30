
function showCategories() {
  const container = document.querySelector(`.categories`);

  for (let i = 0; i < data.length; i++) {
    const el = document.createElement(`div`);
    el.innerHTML = data[i].name;

    el.setAttribute(`data-category`, i);
    el.addEventListener(`click`, showProductsHandler);
    container.appendChild(el);
  }
}


function showProductsHandler(event) {
  const container = document.querySelector(`.products`);
  container.innerHTML = ``;
  const el = event.target;
  const categoryIndex = el.getAttribute(`data-category`);

  const categoryProducts = data[categoryIndex].products;

  for (let i = 0; i < categoryProducts.length; i++) {
    const el = document.createElement(`div`);
    el.innerHTML = categoryProducts[i].name;
    el.setAttribute(`data-category`, categoryIndex);
    el.setAttribute(`data-product`, i);
    el.addEventListener(`click`, showDetailsHandler);
    container.appendChild(el);

  }
}
function showDetailsHandler(event) {
  const container = document.querySelector(`.details`);
  container.innerHTML = ``;

  const categoryIndex = event.target.getAttribute(`data-category`);
  const productIndex = event.target.getAttribute(`data-product`);
  const productsDetails = data[categoryIndex].products[productIndex];
  const el = document.createElement(`div`);
  el.setAttribute(`id`, `prodDet`);
  el.innerHTML = productsDetails.name;
  const elem = document.createElement(`div`);
  elem.setAttribute(`id`, `prodPrice`);
  elem.innerHTML = productsDetails.price;
  console.log(productsDetails);
  container.appendChild(el);
  container.appendChild(elem);
  const btn = document.createElement(`button`);
  btn.innerHTML = "купити";
  btn.setAttribute(`id`, `btn`)
  container.appendChild(btn);
  btn.addEventListener(`click`, userForm);
}



function userForm() {
  const mainForm = document.getElementById(`mainForm`);
  mainForm.style.display = `block`;

  let button = document.getElementById(`button`);
  button.addEventListener(`click`, validateForm)
}
function validateForm() {
  let mainForm = document.forms["mainForm"];
  let textar = document.getElementById(`textar`);
  for (let i = 0; i < mainForm.length; i++) {
    let c = mainForm.elements[i].value;
    let cc = mainForm.elements[i];
    if (c == null || c == "" && textar !== cc) {

      alert(`введіть обовьязкове поле`);

      return;
    }
  }
  goNext()
}
function goNext() {

  document.getElementById(`mainForm`).style.display = `none`;


  let name = document.getElementById(`name`).value;
  let city = document.getElementById(`city`).value;
  let stock = document.getElementById(`stock`).value;
  let num = document.getElementById(`num`).value;
  let textar = document.getElementById(`textar`).value;
  let radios = document.getElementsByTagName('input');
  let value;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked && radios[i].name === 'pay') {
      value = radios[i].value;
    }
  }

  let prodDet = document.getElementById(`prodDet`);
  let proDetName = prodDet.outerHTML;
  let prodPrice = document.getElementById(`prodPrice`);
  let proDetPrice = prodPrice.outerHTML;
  let now = new Date().toLocaleDateString();

  let result = `дата замовлення` + ` ` + `<br />` +
    now + `<br />` + `<br />` +
    `товар` + proDetName +
    proDetPrice +
    'покупець' + ` ` + name + "<br />" +
    'місто' + ` ` + city + "<br />" + stock + ` ` + "<br />" +
    'товар кількістю' + ` ` + num + "<br />" +
    `оплата:` + '' + value + "<br />" + textar;
  document.getElementById('output').innerHTML = result;
  document.getElementById(`output`).style.display = `block`;

  let storyResult = `дата замовлення` + ` ` + now +
    ` ` + proDetPrice;
  let onp = document.getElementById(`outputN`);
  onp.style.display = `block`;
  onp.innerHTML = storyResult;
  let resultArray = localStorage.getItem(`fullOrder`) ? JSON.parse(localStorage.getItem(`fullOrder`)) : [];
  let storyResultArray = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
  localStorage.setItem('order', JSON.stringify(storyResultArray));
  localStorage.setItem('fullOrder', JSON.stringify(resultArray));
  let savRes = document.getElementById(`save`);
  savRes.style.display = `block`;
  savRes.addEventListener(`click`, function () {
    storyResultArray.push(storyResult);

    resultArray.push(result);

    localStorage.setItem('order', JSON.stringify(storyResultArray));
    localStorage.setItem(`fullOrder`, JSON.stringify(resultArray))
  })
}
function allOrders() { //мої замовлення 
  let dataOrder = JSON.parse(localStorage.getItem('order'));

  let dataFullOrder = JSON.parse(localStorage.getItem(`fullOrder`));

  document.getElementById(`cont`).style.display = `none`;
  document.getElementById(`outputN`).style.display = `none`;
  document.getElementById(`save`).style.display = `none`;
  document.getElementById('output').style.display = `none`;

  for (let i = 0; i < dataOrder.length; i++) {
    dataOrder.length = dataFullOrder.length;

    let dataDiv = document.createElement('div');
    dataOrder[i];
    dataDiv.innerHTML = dataOrder[i];
    document.body.append(dataDiv);
    dataDiv.setAttribute(`class`, 'list');

    let fullDiv = document.createElement(`div`);
    dataFullOrder[i];
    fullDiv.innerHTML = dataFullOrder[i];

    let btn = document.createElement(`button`);//створюємо кнопки для видалення товару із списку
    document.body.append(btn);
    btn.innerHTML = `видалити`;
    document.body.append(fullDiv);
    btn.setAttribute(`class`, `knob`);
    fullDiv.setAttribute(`class`, `fullList`);
    dataDiv.addEventListener(`click`, function () { //розкриваемо деталі замовлення
      fullDiv.style.display = `block`;
    })
    fullDiv.addEventListener(`click`, function () {//закриваємо деталі замовлення
      fullDiv.style.display = `none`
    })
    btn.addEventListener(`click`, function () {//видаляємо замовлення із списку
      btn.style.display = `none`;
      dataDiv.style.display = `none`;
      dataOrder.splice(i, 1);
      dataFullOrder.splice(i, 1);

      //повертаємо массиви після видалення елементів в localStorage
      localStorage.setItem('order', JSON.stringify(dataOrder));
      localStorage.setItem('fullOrder', JSON.stringify(dataFullOrder));
    })
  }
}

//повертаемось до покупок,до початку роботи сторінки;
function backToBye() {
  document.forms.mainForm.reset();
  location.reload();
}
//обнуляемо localStorage;
function clearLS() {
  localStorage.clear();
}


showCategories();

