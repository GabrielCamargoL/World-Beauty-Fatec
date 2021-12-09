import { Client, Product, Service, Worker } from "./index";

export default class ListsAll {
  clientList: Array<Client>;
  workerList: Array<Worker>;
  servicesList: Array<Service>;
  productList: Array<Product>;

  constructor() {
    this.clientList = [];
    this.workerList = [];
    this.servicesList = [];
    this.productList = [];
  }

  public get clients() {
    return this.clientList;
  }

  public get workers() {
    return this.workerList;
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

  public setWorkersList(workersUpdated: Array<Worker>) {
    this.workerList = workersUpdated;
  }

  public setServicesList(serviceUpdated: Array<Service>) {
    this.servicesList = serviceUpdated;
  }
  
  public setProductList(productUpdated: Array<Product>) {
    this.productList = productUpdated;
  }
}
