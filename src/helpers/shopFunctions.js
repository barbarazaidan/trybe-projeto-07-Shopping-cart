import { removeCartID, saveCartID, getSavedCartIDs } from './cartFunctions';
import { saveCartPrice, getSavedCartPrice, decreaseCartPrice } from './cartFunctionsCost';
import { fetchProduct } from './fetchFunctions';

const paymentCart = document.querySelector('.cart__products'); // lista ol dos produtos no carrinho
const totalPrice = document.querySelector('.total-price'); // span que está dentro do p
let sum = 0; // variável para armazenar o valor da soma total

// ------------------------------------------------------------------

// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

// ------------------------------------------------------------------

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// ------------------------------------------------------------------

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

// --------------------------------------------------------------------
// Função responsável por decrementar os valores no carrinho (ela é chamada na função removeCartProduct(), já criada pela Trybe - ESTA FOI EU QUE FIZ

async function decreasePrice(id) {
  const product = await fetchProduct(id);
  const { price } = product;
  // console.log('currentSum: ', sum)
  sum -= price;
  // console.log('decrease: ', sum)
  if (sum < 0) {
    sum = 0;
  }
  totalPrice.innerText = sum;
  // totalPrice.innerText = sum.toFixed(2);
}

// ------------------------------------------------------------------

/**
 * Função que remove o produto do carrinho.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
const removeCartProduct = (li, id) => {
  li.remove();
  decreasePrice(id);
  removeCartID(id);
  decreaseCartPrice(id);
};

// ------------------------------------------------------------------

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */
export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id));
  return li;
};

// --------------------------------------------------------------------
// Função responsável por somar os valores no carrinho - ESTA FOI EU QUE FIZ

async function sumPrice(price) {
  sum += price;
  // console.log('sum: ', sum);
  saveCartPrice(sum);
  totalPrice.innerText = sum;
  totalPrice.innerText = sum.toFixed(2);
  // console.log('totalPrice: ', totalPrice);
}

// --------------------------------------------------------------------
// Função responsável por colocar o produto no carrinho - ESTA FOI EU QUE FIZ

async function addCart(idProduct) {
  const selectedProduct = await fetchProduct(idProduct);
  // console.log(selectedProduct);
  const { price } = selectedProduct;
  // console.log('price: ', price);
  const product = createCartProductElement(selectedProduct);
  paymentCart.appendChild(product);
  sumPrice(price);
  saveCartID(idProduct);
}

// --------------------------------------------------------------------

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);

  // meu código a partir daqui

  cartButton.addEventListener('click', () => addCart(id));
  // --------------------------------------------------
  return section;
};

// --------------------------------------------------------------------
// Função responsável por colocar os produtos do localStorage no carrinho - ESTA FOI EU QUE FIZ

export async function productsOfLocalStorage() {
  // console.log(getSavedCartPrice())
  const priceSaved = getSavedCartPrice();
  totalPrice.innerText = priceSaved;
  // console.log(getSavedCartIDs())
  const idsSaved = getSavedCartIDs();
  const recoveredProducts = idsSaved.map(async (id) => {
    const product = await fetchProduct(id);
    // console.log(product)
    return product;
  });
  // console.log('recoveredProducts: ', recoveredProducts);
  const products = await Promise.all(recoveredProducts);
  // console.log('products: ', products);
  products.forEach((product) => {
    const productHTML = createCartProductElement(product);
    return paymentCart.appendChild(productHTML);
  });
}
// --------------------------------------------------------------------
//  O código abaixo leu os produtos no carrinho, mas faltou usar o promise.all para manter a ordem de inserção.

// async function productsOfLocalStorage() {
//   // console.log(getSavedCartIDs())
//   const idsSaved = getSavedCartIDs();
//   const recoveredData = idsSaved.map(async (id) => {
//     const product = await fetchProduct(id);
//     const productHTML = createCartProductElement(product);
//     return paymentCart.appendChild(productHTML);
//   });
//   console.log(recoveredData)
//   return recoveredData;
// }

// --------------------------------------------------------------------
// O código abaixo leu os produtos no carrinho, mas não captou a questão da promise para manter a ordem de inserção.

// async function productsOfLocalStorage() {
//   // console.log(getSavedCartIDs())
//   const idsSaved = getSavedCartIDs();
//   const recoveredData = await Promise.all(idsSaved.map(async (id) => {
//     const product = await fetchProduct(id);
//     const productHTML = createCartProductElement(product);
//     return paymentCart.appendChild(productHTML);
//   }));
//   // const allThePromises = await Promise.all(recoveredData);
//   console.log(recoveredData)
//   //console.log(allThePromises)
//   return recoveredData;
//   // return allThePromises;
// }
