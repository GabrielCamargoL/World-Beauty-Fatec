import { Product, Service } from "./index";

export class Order {
  readonly productList?: Array<
    {
      product: Product;
      quantity: number
    }
  >;
  readonly serviceList?: Array<
    {
      service: Service;
      quantity: number
    }
  >;
  readonly id: number;
  readonly clientId: string;
  purchase_date: Date;
  status_order: string;
  orderValue: number;
  workerId: string;

  constructor(
    id: number,
    clientId: string,
    purchase_date: Date,
    status_order: string,
    workerId: string,
    productList?: Array<
      {
        product: Product;
        quantity: number
      }
    >,
    serviceList?: Array<
      {
        service: Service;
        quantity: number
      }
    >

  ) {
    this.id = id;
    this.clientId = clientId;
    this.purchase_date = purchase_date;
    this.status_order = status_order;
    this.workerId = workerId;
    this.productList = productList;
    this.serviceList = serviceList;
    this.orderValue = 0;
    this.handleOrderQuantity();
  }

  public handleOrderQuantity() {
    this.productList?.forEach(
      ({ product, quantity }) => {
        this.orderValue += product.value * quantity;
      }
    );

    this.serviceList?.forEach(
      ({ service, quantity }) => {
        this.orderValue += service.value * quantity;
      }
    );
  }
}