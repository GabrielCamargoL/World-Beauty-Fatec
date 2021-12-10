import { Client, Product, Service, Worker } from "../model";
import Input from "./InputForControllers";

const input = new Input();

const searchClient = (clientList: Array<Client>, cpf?: string) => {
  let CPF = !cpf ? input.text(`Informe o CPF do cliente: `) : cpf;

  const clientFiltered = clientList.filter(
    (client) => client.getCPF() == CPF
  );

  if (clientFiltered.length == 0) {
    console.log("Cliente não encontrado, tente novamente!");
    return searchClient(clientList);
  }
  return clientFiltered[0];
};

const searchWorker = (workerList: Array<Worker>, cpf?: string) => {
  let CPF = !cpf ? input.text(`Informe o CPF do funcionario: `) : cpf;

  const workerFiltered = workerList.filter(
    (worker) => worker.getCPF() == CPF
  );

  if (workerFiltered.length == 0) {
    console.log("Funcionario não encontrado, tente novamente!");
    return searchWorker(workerList);
  }
  return workerFiltered[0];
};


const searchProduct = (productList: Array<Product>, name?: string) => {
  let productName = !name ? input.text(`name: `) : name;

  const productFiltered = productList.filter(
    (product) => product.name === productName
  );

  if (productFiltered.length == 0) {
    console.log("Produto não encontrado, tente novamente!");
    return searchProduct(productList);
  }
  return productFiltered[0];
};

const searchService = (serviceList: Array<Service>, name?: string) => {
  let serviceName = !name ? input.text(`id: `) : name;

  const serviceFiltered = serviceList.filter(
    (service) => service.name === serviceName
  );

  if (serviceFiltered.length == 0) {
    console.log("Serviço não encontrado, tente novamente!");
    return searchService(serviceList);
  }
  return serviceFiltered[0];
};

const searchOrder = (clientList: Array<Client>) => {
  const client: Client = searchClient(clientList);
  let orderCode = input.number(`id: `);

  const orderFiltered = client.orders.filter((order) => order.id === orderCode);

  if (orderFiltered.length == 0) {
    console.log("Pedido não encontrado, tente novamente!");
    return searchOrder(clientList);
  }
  return orderFiltered[0];
};

export { searchClient, searchWorker,searchProduct, searchService, searchOrder };
