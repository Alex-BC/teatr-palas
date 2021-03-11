let cart = {
  salad1: 0,
};

document.onclick = event => {
  //   console.log(event);
  if (event.target.classList.contains('btn-add')) {
    // console.log(event.target.dataset.id);
    plusFunction(event.target.dataset.id);
  }
};

const plusFunction = id => {
  cart[id]++;
  renderCart();
};

const renderCart = () => {
  console.log(cart);
};

renderCart();

localStorage.setItem('data', cart.value);
