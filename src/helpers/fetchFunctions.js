export const fetchProduct = () => {
  // seu código aqui
};

// -----------------------------------------------------------------------
// NÃO PASSOU NO TESTE NA HORA DE RETORNAR UM ERRO

// function checkParameters(product) {
//   if (!product) {
//     throw new Error('Termo de busca não informado');
//    }
// }

// export const fetchProductsList = (product) => {
//   try {
//     checkParameters(product);
//     const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
//     return fetch(url)
//       .then((response)=> response.json())
//       .then(({ results }) => results);
//   } catch (error) {
//     return error;
//   }
// }

// -----------------------------------------------------------------------
// NÃO PASSOU NO TESTE NA HORA DE RETORNAR UM ERRO

// export const fetchProductsList = (product) => {
//   if (!product) {
//     throw new Error('Termo de busca não informado');
//   }
//   const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
//   return fetch(url)
//     .then((response) => response.json())
//     .then(({ results }) => results);
// };

// -----------------------------------------------------------------------

export const fetchProductsList = async (product) => {
  if (!product) {
    throw new Error('Termo de busca não informado');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const data = await response.json();
  const { results } = data;
  return results;
};
