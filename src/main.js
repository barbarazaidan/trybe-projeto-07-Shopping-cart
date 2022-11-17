import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const sectionOfProducts = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const loadingText = document.createElement('p');
sectionOfProducts.appendChild(loadingText);
loadingText.className = 'loading';
loadingText.innerText = 'carregando...';
const productList = await fetchProductsList('computador');
productList.forEach((product) => {
  sectionOfProducts.appendChild(createProductElement(product));
});
loadingText.remove();
