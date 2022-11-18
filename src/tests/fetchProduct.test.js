import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('testa se fetchProduct é uma função', () => {

    expect(typeof fetchProduct).toBe('function');
  
  });

  it('executa a função fetchProduct e verifica se o fetch é chamado', async () => {
    
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();

  });

  it('testa se fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {

    fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561')

  });

  it('testa se retorno de fetchProduct é igual ao objeto product', async () => {
 
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);

  });

  it('testa se fetchProduct sem argumento retorna um erro', async () => {

    await expect(fetchProduct()).rejects.toEqual(new Error('ID não informado'));
    // await expect(fetchProduct()).rejects.toThrow('ID não informado'); - também posso usar desta forma 

  });

});
