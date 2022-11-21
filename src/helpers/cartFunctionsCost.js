import { fetchProduct } from './fetchFunctions';

const totalPrice = document.querySelector('.total-price'); // span que está dentro do p

// Criei todas as funções deste arquivo

export function getSavedCartPrice() {
  const cartPrice = localStorage.getItem('cartTotalPrice');
  if (!cartPrice) {
    return '0';
  }
  return JSON.parse(cartPrice);
}

// --------------------------------------------------------------------

export function saveCartPrice(sum) {
  // const cartPrice = getSavedCartPrice();
  localStorage.setItem('cartTotalPrice', JSON.stringify(sum));
}

// --------------------------------------------------------------------

export async function decreaseCartPrice(id) {
  const productSelected = await fetchProduct(id);
  const { price } = productSelected;
  // console.log('price: ', price);
  const priceLocalStorage = getSavedCartPrice();
  let newPriceLocalStorage = priceLocalStorage - price;
  // console.log('newPriceLocalStorage1', newPriceLocalStorage);
  if (newPriceLocalStorage < 0) {
    newPriceLocalStorage = 0;
  }
  // console.log('newPriceLocalStorage2', newPriceLocalStorage);
  totalPrice.innerText = newPriceLocalStorage.toString();
  // totalPrice.innerText = newPriceLocalStorage.toFixed(2).toString();
  localStorage.setItem('cartTotalPrice', JSON.stringify(newPriceLocalStorage));
}
