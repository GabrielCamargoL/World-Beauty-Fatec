import { Input } from './utils/Input';
import ListsAll from './model/ListsAll';

import ClientController from "./controller/ClientController";

console.log(`================== Grupo World Beauty ========================`);

let nodeProcess = true

let listsAll = new ListsAll();

while (nodeProcess) {
  console.log(`
    [1] Clientes
    [2] Serviços
    [3] Produtos
    [4] Dashboard
    
    [0] - Sair
  `);

  const input = new Input();
  let option: number = input.receiveNumber(`Informe a função desejada ("1" a "4") ou digite "0" para sair.`);

  switch (option) {
    case 0:
      console.log(`Encerrando...`);
      nodeProcess = false
      break;
    case 1:
      const clientController = new ClientController(listsAll);
      clientController.optionsClient();
      break;
    default:
      console.log(`Comando inválido!`);
  }

  console.log(option)



}
