import { Input } from './utils/Input';
import ListsAll from './model/ListsAll';

import ClientController from "./controller/ClientController";
import ProductController from './controller/ProductController';
import WorkerController from './controller/WorkerController';
import { ServiceController } from './controller/ServiceController';
import { OrderController } from './controller/OrderController';
import { ReportController } from './controller/ReportController';

import { PreRegister } from './utils/PreRegister';

console.log(`================== Grupo World Beauty ========================`);

let listsAll = new ListsAll();
let preRegister = new PreRegister(listsAll);
preRegister.create()

let nodeProcess = true


while (nodeProcess) {
  console.log(`
    [1] Clientes
    [2] Funcionários
    [3] Produtos
    [4] Serviços
    [5] Pedidos
    [6] Relatórios
    
    [0] - Sair
  `);

  const input = new Input();
  let option: number = input.receiveNumber(`Informe a função desejada ("1" a "5") ou digite "0" para sair.`);

  switch (option) {
    case 0:
      console.log(`Encerrando...`);
      nodeProcess = false
      break;
    case 1:
      const clientController = new ClientController(listsAll);
      clientController.optionsClient();
      break;
    case 2:
      const workerController = new WorkerController(listsAll);
      workerController.optionsWorker();
      break;
    case 3:
      const productController = new ProductController(listsAll);
      productController.optionsProduct();
      break;
    case 4:
      const serviceController = new ServiceController(listsAll);
      serviceController.optionsServices();
      break;
    case 5:
      const orderController = new OrderController(listsAll);
      orderController.optionsOrder();
      break;
    case 6:
      const reportController = new ReportController(listsAll);
      reportController.optionsReport();
      break;
    default:
      console.log(`Comando inválido!`);
  }

  console.log(option)
}
