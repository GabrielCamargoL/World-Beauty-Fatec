import { Input } from './utils/Input';


console.log(`================== Grupo World Beauty ========================`);

let nodeProcess = true

while (nodeProcess) {
  console.log(`
    Opções:

    Clientes
    01 - Cadastrar cliente 
    02 - Atualizar cadastro de cliente
    03 - Excluir cliente
    04 - Listar todos os clientes

    Produtos
    06 - Cadastrar produto
    07 - Atualizar cadastro de produto
    08 - Excluir produto
    09 - Listar todos os produtos

    Serviços
    11 - Cadastrar serviço
    12 - Atualizar cadastro de serviço
    13 - Excluir serviço
    14 - Listar todos os serviços
    
    0 - Sair
  `);

  const input = new Input();
  let option: number = input.receiveNumber(`Informe a função desejada ("1" a "14") ou digite "0" para sair.`);


  switch (option) {
    case 0:
      console.log(`Encerrando...`);
      nodeProcess = false
      break;

    default:
      console.log(`Comando inválido!`);
  }

  console.log(option)



}
