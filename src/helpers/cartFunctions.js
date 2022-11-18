// OS DADOS ABAIXO ERAM PARA A FUNÇÃO NO FINAL DA PÁGINA, MAS DEU ERRO NO LINT, ENTÃO COLOQUEI TUDO NO ARQUIVO SHOPFUNCTIONS.JS
// --------------------------------------------------------------------
// import { fetchProduct } from './fetchFunctions';
// import { createCartProductElement } from './shopFunctions';
// const paymentCart = document.querySelector('.cart__products'); // lista ol dos produtos no carrinho
// --------------------------------------------------------------------

// import { fetchProduct } from './fetchFunctions';
// import { createCartProductElement } from './shopFunctions';

// const paymentCart = document.querySelector('.cart__products'); // lista ol dos produtos no carrinho

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  // console.log(newCartProducts)
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

// // --------------------------------------------------------------------
// // Função responsável por colocar os produtos do localStorage no carrinho - ESTA FOI EU QUE FIZ

// async function productsOfLocalStorage() {
//   // console.log(getSavedCartIDs())
//   const idsSaved = getSavedCartIDs();
//   const recoveredData = idsSaved.map(async (id) => {
//     const product = await fetchProduct(id)
//     const productHTML = createCartProductElement(product)
//     return paymentCart.appendChild(productHTML);
//   });
//   return recoveredData;
//   // Promise.all();
// }

// productsOfLocalStorage();

// // --------------------------------------------------------------------
// QUANDO TENTEI COLOCAR A FUNÇÃO ABAIXO AQUI, O LINT DEU ERRO DE DEPENDENCY CYCLE DETECTED

// // Função responsável por colocar o produto no carrinho
// export async function addCart(idProduct) {
//   const selectedProduct = await fetchProduct(idProduct);
//   // console.log(selectedProduct);
//   const product = createCartProductElement(selectedProduct);
//   paymentCart.appendChild(product);
//   saveCartID(idProduct);
// }
