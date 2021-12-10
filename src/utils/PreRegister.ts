import { ListsAll, Client, Worker,Order, Product, Service } from "../model/index";
import { searchClient } from "./searchListsOptions";

export class PreRegister {
  lists: ListsAll;
  clientList: Array<Client>;
  workerList: Array<Worker>
  productList: Array<Product>;
  serviceList: Array<Service>;

  constructor(lists: ListsAll) {
    this.lists = lists;
    this.clientList = lists.clients;
    this.workerList = lists.workerList;
    this.productList = lists.products;
    this.serviceList = lists.services;
  }

  public create(): any {
    const fakeClients = this.fakeClients();
    const fakeWorkers = this.fakeWorkers();
    const fakeProducts = this.fakeProducts();
    const fakeServices = this.fakeServices();

    fakeClients.forEach((client) => {
      const id = `${Math.floor(Math.random() * 1000000) + 1}`;

      const newClient = new Client(
        id,
        client.gender,
        client.name,
        client.birthday,
        client.CPF,
        client.phone
      );
      this.clientList.push(newClient);
    });

    fakeWorkers.forEach((worker) => {
      const phone = '1234';

      const newClient = new Worker(
        worker.id,
        worker.gender,
        worker.name,
        worker.birthday,
        worker.CPF,
        phone
      );
      this.workerList.push(newClient);
    });

    fakeServices.forEach((service) => {
      const newService = new Service(service.name, service.value);
      this.serviceList.push(newService);
    });

    fakeProducts.forEach((product) => {
      const newProduct = new Product(
        product.id,
        product.name,
        product.brand,
        product.value,
        product.quantity
      );
      this.productList.push(newProduct);
    });

    const fakeOrders = this.fakeOrders();
    fakeOrders.forEach((order) => {
      const client: Client = searchClient(this.clientList, order.clientId);
      const productShoppingCartList: Array<{ product: Product; quantity: number }> = [];
      const serviceShoppingCartList: Array<{ service: Service; quantity: number}> = [];

      order.productShoppingCartList.forEach((product, index) => {
        const productAux = {
          product: product,
          quantity: order.productQuantity[index],
        };
        productShoppingCartList.push(productAux);
      });

      order.serviceShoppingCartList.forEach((service) => {
        const serviceAux = { service: service, quantity: 1};
        serviceShoppingCartList.push(serviceAux);
      });

      const newOrder = new Order(
        order.id,
        order.clientId,
        order.workerId,
        productShoppingCartList,
        serviceShoppingCartList
      );

      const clientOrders: Order[] = client.orders;
      clientOrders.push(newOrder);

      client.orders = clientOrders;
    });
  }


  fakeClients() {
    const clients = [
      {
        name: "Gabriel Camargo Leite",
        CPF: "1",
        gender: "Masculino",
        birthday: "06/11/1997",
        phone: "39111482"
      },
      {
        name: "Osmar Leite",
        CPF: "11",
        gender: "Masculino",
        birthday: "29/12/1963",
        phone: "39111482"
      },
      {
        name: "asd dsa",
        CPF: "111",
        gender: "Feminino",
        birthday: "01/01/2002",
        phone: "39111482"
      },
      {
        name: "Andre Felipe",
        CPF: "1111",
        gender: "Masculino",
        birthday: "03/03/1992",
        phone: "39111482"
      },
      {
        name: "Leticia Oliveira",
        CPF: "11111",
        gender: "Feminino",
        birthday: "18/12/1995",
        phone: "39111482"
      },
      {
        name: "Email do Santos",
        CPF: "111111",
        gender: "Masculino",
        birthday: "15/06/2010",
        phone: '39111482'
      },
    ];

    return clients;
  }

  fakeWorkers() {
    const workers = [
      {
        id:"1",
        name: "Jussara da Costa",
        CPF: "555",
        gender: "Feminino",
        birthday: "08/06/1985",
        phone: "981152277"
      }
    ];
    return workers;
  }

  fakeProducts() {
    const products = [
      { id: '1', name: "Tinta de Cabelo", brand: 'Garnier', value: 80, quantity: 20 },
      { id: '2', name: "Condicionador", brand: 'Seda', value: 60, quantity: 20 },
      { id: '3', name: "Máscara de tratamento", brand: 'Mask Beauty', value: 42, quantity: 20 },
      { id: '4', name: "Sombra", brand: 'Mask Beauty', value: 35, quantity: 20 },
      { id: '5', name: "Hidratante", brand: 'Care Skin', value: 20.99, quantity: 20 },
      { id: '6', name: "Sabonete", brand: 'Lux', value: 4, quantity: 90 },
      { id: '7', name: "Cera para depilação", brand: 'Honey', value: 50, quantity: 20 },
      { id: '8', name: "Creme de Rejuvenescimento", brand: 'Rejuv', value: 180, quantity: 20 },
      { id: '9', name: "Peruca", brand: 'Fake Hair', value: 320, quantity: 8 },
      { id: '10', name: "Lapis para olhos", brand: 'Pencil4Eyes', value: 24.90, quantity: 20 },
    ];

    return products;
  }

  fakeServices() {
    const services = [
      { id: '1', name: "Manicure", value: 25 },
      { id: '2', name: "Pedicure", value: 15 },
      { id: '3', name: "Sombracelhas", value: 20 },
      { id: '4', name: "Corte de cabelo", value: 69 },
      { id: '5', name: "Pintura de cabelos", value: 55 },
      { id: '6', name: "Botox", value: 110 },
      { id: '7', name: "Hidratação de cabelos", value: 74},
      { id: '8', name: "Massagem", value: 2990},
      { id: '9', name: "depilação", value: 70 },
      { id: '10', name: "Circulação Vacuo", value: 150 },
    ];

    return services;
  }

  fakeOrders() {
    const orderList = [
      {
        id: 1,
        clientId: '1',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(0, 1),
        productQuantity: [4, 5],
      },
      {
        id: 2,
        clientId: '11',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(4, 5),
        productQuantity: [4, 7],
      },
      {
        id: 3,
        clientId: '111',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(4, 5),
        productQuantity: [1, 2],
      },
      {
        id: 4,
        clientId: '1111',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 6),
        serviceShoppingCartList: this.serviceList.slice(2, 3),
        productQuantity: [3],
      },
      {
        id: 5,
        clientId: '11111',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(3, 4),
        productQuantity: [3, 2],
      },
      {
        id: 6,
        clientId: '111111',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(6, 7),
        productQuantity: [4, 1],
      },
      {
        id: 7,
        clientId: '1',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 8),
        serviceShoppingCartList: this.serviceList.slice(8, 9),
        productQuantity: [1, 4, 1],
      },
      {
        id: 8,
        clientId: '11',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 9),
        serviceShoppingCartList: this.serviceList.slice(3, 4),
        productQuantity: [3, 2, 4, 1],
      },
      {
        id: 9,
        clientId: '111',
        workerId: '2',
        productShoppingCartList: this.productList.slice(2, 7),
        serviceShoppingCartList: this.serviceList.slice(0, 1),
        productQuantity: [1, 1, 1, 1, 2, 1],
      },
      {
        id: 10,
        clientId: '1',
        workerId: '2',
        productShoppingCartList: this.productList.slice(5, 7),
        serviceShoppingCartList: this.serviceList.slice(4, 5),
        productQuantity: [1, 1],
      },
    ];

    return orderList;
  }
}
