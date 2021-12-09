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
  clientList: Array<ClientModel>;
  workerList: Array<WorkerModel>;
  productList: Array<ProductModel>;
  serviceList: Array<ServiceModel>;
  lists: ListsAll;

  constructor(lists: ListsAll) {
    this.lists = lists;
    this.clientList = lists.clients;
    this.workerList = lists.workers;
    this.productList = lists.products;
    this.serviceList = lists.services;
    this.input = new Input();
  }

  actionsOrder() {
    console.log(
      `\n
      Opções de Cliente: 
      1 - Cadastrar pedido
      2 - Listar todos os pedidos
      3 - Atualizar pedido
      4 - Pagar pedido 
      0 - Voltar ao menu principal \n
      `
    );

    let clientOption = this.input.number(
      `Por favor, escolha uma opção de cliente: `
    );
    switch (clientOption) {
      case 0:
        return;
      // break;
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
    const productCartList: Array<{ product: ProductModel; quantity: number }> = [];
    let insertingProductInCart = true;
    do {
      let wantAddInCart = this.input.text(
        "Deseja adicionar um PRODUTO no carrinho ? [S] Sim | [N] Não "
      );
      if (wantAddInCart.toLocaleUpperCase() === "S") {
        const productFind: ProductModel = searchProduct(this.productList);

        const quantityProduct = this.input.number("Quantidade : ");

        const product = { product: productFind, quantity: quantityProduct };
        productCartList.push(product);
      } else {
        insertingProductInCart = false;
      }
    } while (insertingProductInCart);
    return productCartList;
  }

  handleAddServiceInShoppingCart() {
    const serviceCartList: Array<{ service: ServiceModel; quantity: number }> = [];

    let insertingServiceInCart = true;

    do {
      let wantAddInCart = this.input.text(
        "Deseja adicionar um SERVIÇO no carrinho ? [S] Sim | [N] Não "
      );
      if (wantAddInCart.toLocaleUpperCase() === "S") {
        const serviceFind: ServiceModel = searchService(this.serviceList);
        const quantity = this.input.number("Quantidade : ");
        const service = { service: serviceFind, quantity: quantity };
        serviceCartList.push(service);
      } else {
        insertingServiceInCart = false;
      }
    } while (insertingServiceInCart);
    return serviceCartList;
  }

  public create(): void {
    console.log("\nCarrinho Cliente");

    const timestamp = new Date();
    const id = 1;
    const client: ClientModel = searchClient(this.clientList);
    const worker: WorkerModel = searchWorker(this.workerList);;
    const productCartList = this.handleAddProductInShoppingCart();
    const serviceCartList = this.handleAddServiceInShoppingCart();

    const order = new Order(
      id,
      client.id,
      timestamp,
      "pending",
      worker.id,
      productCartList,
      serviceCartList
    );

    const clientOrders: Order[] = client.orders;
    clientOrders.push(order);
    client.orders = clientOrders;

    console.log("\nCarrinho Criado com sucesso!)\n");
    console.log(`Código do PEDIDO: ${order.id}`);
  }

  public show(): void {
    const order: Order = searchOrder(this.clientList);
    const format = {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    };

    console.log("Código, Nome, Quantidade, Un, Valor");
    console.log("_________________________________________");
    order.productList?.forEach(({ product, quantity }) => {
      const orderQuantity = quantity * product.value;
      const formatOrderQuantity = orderQuantity.toLocaleString("pt-BR", format);
      console.log(
        `${product.id}, ${product.name}, ${quantity} UN, ${formatOrderQuantity}`
      );
    });
    order.serviceList?.forEach(({ service, quantity }) => {
      const orderQuantity = quantity * service.value;
      const formatOrderQuantity = orderQuantity.toLocaleString("pt-BR", format);
      console.log(
        `${service.id}, ${service.name}, ${quantity} UN, ${formatOrderQuantity}`
      );
    });
    console.log();
  }
}
