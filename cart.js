const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const priceWithoutSpaces = str => {
  return str.replace(/\s/g, '');
};

const normalPrice = str => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = currentPrice => {
  return (price += currentPrice);
};

const minusFullPrice = currentPrice => {
  return (price -= currentPrice);
};

const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)} грн`;
};

const generateCartProduct = (img, title, price) => {
  return `
		<li class="cart-content__list container product"}>
            <img src="${img}" alt="" class="menu-img">
            <div>
                <h4 class="menu-list-title">${title}</h4>
                <div class="price">
                    <p class="cart-product__price">${normalPrice(price)}</p>
                </div>
                
            </div>
            <button class="product__del">Удалить</button>
        </li>   
	`;
};

const deleteProducts = productParent => {
  // let id = productParent.querySelector('.product').dataset.id;
  // document.querySelector(`.product[data-id="${id}"]`);
  //     .querySelector('.product__btn').disabled = false;

  let currentPrice = parseInt(
    priceWithoutSpaces(
      productParent.querySelector('.cart-product__price').textContent,
    ),
  );
  minusFullPrice(currentPrice);
  printFullPrice();
  productParent.remove();
};

productsBtn.forEach(el => {
  el.closest('.product').setAttribute('data-id', randomId());

  el.addEventListener('click', e => {
    let self = e.currentTarget;
    let parent = self.closest('.product');
    let id = parent.dataset.id;
    let img = parent.querySelector('.menu-img').getAttribute('src');
    let title = parent.querySelector('.menu-list-title').textContent;
    let priceString = priceWithoutSpaces(
      parent.querySelector('.product-price__current').textContent,
    );

    let priceNumber = parseInt(
      priceWithoutSpaces(
        parent.querySelector('.product-price__current').textContent,
      ),
    );
    // console.log(priceNumber);

    plusFullPrice(priceNumber);
    // console.log(price);
    printFullPrice();
    cartProductsList.insertAdjacentHTML(
      'afterbegin',
      generateCartProduct(img, title, priceString, id),
    );
  });
});

cartProductsList.addEventListener('click', e => {
  if (e.target.classList.contains('product__del')) {
    deleteProducts(e.target.closest('.cart-content__list'));
    console.log('Удалить');
  }
});
// cartProductsList.addEventListener('click', e => {
//   if (e.target.classList.contains('product__del')) {
//     deleteProducts(e.target.closest('.menu-item'));
//   }
// });
console.log(cartProductsList);
