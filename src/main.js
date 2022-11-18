import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const sectionOfProducts = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function errorAPI() {
  const textError = document.createElement('p');
  textError.className = 'error';
  textError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  sectionOfProducts.appendChild(textError);
}

async function createList() {
  try {
    const loadingText = document.createElement('p');
    loadingText.className = 'loading';
    loadingText.innerText = 'carregando...';
    sectionOfProducts.appendChild(loadingText);
    const productList = await fetchProductsList('computador');
    productList.forEach((product) => {
      sectionOfProducts.appendChild(createProductElement(product));
    });
  } catch (erro) {
    errorAPI();
  }
  const loading = document.querySelector('.loading');
  loading.remove();
}

createList();
