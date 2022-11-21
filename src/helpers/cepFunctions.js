const addressSpan = document.querySelector('.cart__address');
const cepInput = document.querySelector('.cep-input');

// A função getAddress() faz a requisição para a api do cep e retorna o endereço completo

// Primeira forma que fiz:

// export const getAddress = async (cep) => {
//   const url1 = `https://cep.awesomeapi.com.br/json/${cep}`;
//   const response1 = await fetch(url1);
//   const data1 = await response1.json();
//   // console.log('data1: ', data1);
//   const url2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
//   const response2 = await fetch(url2);
//   const data2 = await response2.json();
//   // console.log('data2: ', data2);
//   const firstReturn = await Promise.any([data1, data2]);
//   console.log('firstReturn: ', firstReturn)
//   return firstReturn;
// };

// Segunda forma que fiz:

export const getAddress = async (cep) => {
  const url1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const url2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  const address1 = fetch(url1);
  // console.log(address1);
  const address2 = fetch(url2);
  // console.log(address2);
  const firstReturn = await Promise.any([address1, address2]);
  // console.log('firstReturn: ', firstReturn);
  const response = await firstReturn.json();
  const data = await response;
  // console.log('data: ', data);
  return data;
};

// A função searchCep() é chamada na main ao clicar no botão de pesquisar cep, faz uma chamada para a função a função getAddress e exibe o endereço

export const searchCep = async () => {
  const cep = cepInput.value;
  try {
    const addressFound = await getAddress(cep);
    // console.log('address :', addressFound)
    const { city, state, street, address, neighborhood, district } = addressFound;
    let rua;
    if (!street) {
      rua = address;
    } else {
      rua = street;
    }
    // -----------------------------------------------------------------------
    // Nos códigos abaixo, o lint deu o seguinte erro: Expected an assignment or function call and instead saw an expression
    // !street ? rua = address : rua = street;
    // !neighborhood ? bairro = district : bairro = neighborhood;
    // -----------------------------------------------------------------------
    let bairro;
    if (!neighborhood) {
      bairro = district;
    } else {
      bairro = neighborhood;
    }
    addressSpan.innerText = `${rua} - ${bairro} - ${city} - ${state}`;
  } catch (error) {
    addressSpan.innerText = 'CEP não encontrado';
  // console.log("CEP não encontrado");
  }
};
