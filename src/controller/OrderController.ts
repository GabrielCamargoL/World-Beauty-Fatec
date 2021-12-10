import { Order } from "../model/Order";
import {
  Client as ClientModel,
  Worker as WorkerModel,
  Product as ProductModel,
  Service as ServiceModel,
  ListsAll,
} from "../model/index";

import Input from "../utils/InputForControllers";

import {
  searchClient,
  searchWorker,
  searchProduct,
  searchService,
  searchOrder,
} from '../utils/searchListsOptions'

export class OrderController {
  input: Input;
  lists: ListsAll;
  clientList: Array<ClientModel>;
  workerList: Array<WorkerModel>;
  productList: Array<ProductModel>;
  serviceList: Array<ServiceModel>;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.lists = lists;
    this.clientList = lists.clients;
    this.workerList = lists.workers;
    this.productList = lists.products;
    this.serviceList = lists.services;
  }

  optionsOrder() {
    console.log(`
      Opções de Cliente: 
      [1] Cadastrar novo pedido
      [2] Listar pedidos
      
      [0] Voltar <- \n
      `);

    let clientOption = this.input.number(
      `Por favor, escolha uma opção de cliente: `
    );
    switch (clientOption) {
      case 0:
        return;
      case 1:
        this.create();
        break;
      case 2:
        this.show();
        break;
      default:
        console.log(`Opção invalida!`);
    }
  }

  handleAddProductInShoppingCart() {
    const productShoppingCartList: Array<{ product: ProductModel; quantity: number }> = [];
    let productInShoppingCart = true;
    do {
      let wantAddInShoppingCart = this.input.number(
        "Deseja pedir um produto neste pedido? \n[1] Sim \n[2] Não\nResposta: "
      );
      if (wantAddInShoppingCart=== 1) {
        const productFind: ProductModel = searchProduct(this.productList);

        const quantityProduct = this.input.number("Quantidade : ");

        const product = { product: productFind, quantity: quantityProduct };
        productShoppingCartList.push(product);
      } else {
        productInShoppingCart = false;
      }
    } while (productInShoppingCart);
    return productShoppingCartList;
  }

  handleAddServiceInShoppingCart() {
    const serviceCartList: Array<{ service: ServiceModel; quantity: number }> = [];

    let serviceInShoppingCart = true;

    do {
      let wantAddInShoppingCart = this.input.number(
        "Deseja agendar um serviço neste pedido? \n[1] Sim \n[2] Não\nResposta:  "
      );
      if (wantAddInShoppingCart === 1) {
        const serviceFind: ServiceModel = searchService(this.serviceList);
        const quantity = this.input.number("Quantidade : ");
        const service = { service: serviceFind, quantity: quantity };
        serviceCartList.push(service);
      } else {
        serviceInShoppingCart = false;
      }
    } while (serviceInShoppingCart);
    return serviceCartList;
  }

  public create(): void {
    console.log("Pedido do cliente");

    const id = Math.floor(Math.random() * 1000000) + 1;
    const client: ClientModel = searchClient(this.clientList);
    const worker: WorkerModel = searchWorker(this.workerList);;
    const productShoppingCartList = this.handleAddProductInShoppingCart();
    const serviceShoppingCartList = this.handleAddServiceInShoppingCart();

    const order = new Order(
      id,
      client.id,
      worker.id,
      productShoppingCartList,
      serviceShoppingCartList
    );

    const clientOrders: Order[] = client.orders;
    clientOrders.push(order);
    client.orders = clientOrders;

    console.log("\nPedido criado com sucesso!)\n");
    console.log(`id do pedido: ${order.id}`);
  }

  public show(): any {
    const order: Order = searchOrder(this.clientList);
    const reaisFormat = {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    };

    console.log('===========================================================================')
    order.productList?.forEach(({ product }) => {
      const orderTotalValue = product.quantity * product.value;
      const formatOrderTotalValue = orderTotalValue.toLocaleString("pt-BR", reaisFormat);

      console.log(`
        id: ${product.id}
        nome: ${product.name}
        marca: ${product.brand} 
        quantidade: ${product.quantity}
        valor: ${formatOrderTotalValue}`
      );
    });

    order.serviceList?.forEach(({ service }) => {
      const orderValue = service.value;
      const formatOrderValue = orderValue.toLocaleString("pt-BR", reaisFormat);

      console.log(`
        id: ${service.id}, 
        nome: ${service.name}, 
        valor: ${formatOrderValue}`
      );
    });
    console.log('===========================================================================')
  }
}
