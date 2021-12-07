import { Client, Product, Service } from "./index";

export default class ListsAll {
  clientList: Array<Client>;
  servicesList: Array<Service>;
  productList: Array<Product>;

  constructor() {
    this.clientList = [];
    this.servicesList = [];
    this.productList = [];
  }

  public get clients() {
    return this.clientList;
  }
  public get services() {
    return this.servicesList;
  }
  public get products() {
    return this.productList;
  }

  public setClientList(clientsUpdated: Array<Client>) {
    this.clientList = clientsUpdated;
  }

  public setServicesList(serviceUpdated: Array<Service>) {
    this.servicesList = serviceUpdated;
  }
  
  public setProductList(productUpdated: Array<Product>) {
    this.productList = productUpdated;
  }
}
