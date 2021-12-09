import {Order} from './Order';

export class Client {
  readonly id: string
  gender: string
  name: string
  birthday: string
  cpf: string
  phone: string
  _orders: Array<Order>

  constructor(
    id: string,
    gender: string,
    name: string,
    birthday: string,
    cpf: string,
    phone: string
  ) {
    this.id = id,
      this.gender = gender,
      this.name = name,
      this.birthday = birthday,
      this.cpf = cpf,
      this.phone = phone
      this._orders = [];
  }

  getCPF() {
    return this.cpf;
  }

  updateClientData(body: {
    gender: string,
    name: string,
    birthday: string,
    phone: string
  }) {
    this.gender = body.gender;
    this.name = body.name;
    this.birthday = body.birthday;
    this.phone = body.phone;
  }


  get orders() {
    return this._orders;
  }

  set orders(order: Order[]) {
    this._orders = order;
  }

  setListOrder(ordersUpdated: Array<Order>) {
    this._orders = ordersUpdated;
  }
}

export default Client;