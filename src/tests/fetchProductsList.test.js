import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    
    expect(typeof fetchProductsList).toBe('function');
  
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    
    fetchProductsList('computador')
    expect(fetch()).toHaveBeenCalled()

  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    
    fetchProductsList('computador')
    expect(fetch()).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')

  });

  it('retorno de fetchProductsList é igual ao objeto computadorSearch', async () => {

    await expect(fetchProductsList('computador')).resolves.toEqual(computadorSearch);
  
  });


  it('fetchProductsList sem argumento retorna um erro', async () => {
  
    // fetchProductsList()
    // await expect(fetch(url)).rejects.toThrow('Termo de busca não informado');

    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');

  });

  // it('...', () => {
  // });
});
