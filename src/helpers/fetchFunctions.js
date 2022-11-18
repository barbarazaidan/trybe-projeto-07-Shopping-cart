export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
};

// fetchProduct('MLB1405519561'); - // NÃO DÁ PARA RODAR O NPM RUN CY COM ESTA CHAMADA FUNCIONANDO - DÁ ERRO. TAMBÉM DÁ ERRO QUANDO NÃO ABRO O PROJETO NO NAVEGADOR.

// -----------------------------------------------------------------------
// NÃO PASSOU NO TESTE NA HORA DE RETORNAR UM ERRO (o motivo é que mesmo usando o then, eu preciso colocar o async no início da função, porque o avaliador está esperando uma promise).

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
