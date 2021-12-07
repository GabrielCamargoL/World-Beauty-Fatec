export class Product {
  readonly id: string;
  name: string;
  brand: string;
  value: number;
  quantity: number

  constructor(
    id: string,
    name: string,
    brand: string,
    value: number,
    quantity: number
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.value = value;
    this.quantity = quantity;
  }

  updateProductData(body: {
    name: string,
    brand: string,
    value: number,
    quantity: number
  }) {
    this.name = body.name;
    this.brand = body.brand;
    this.value = body.value;
    this.quantity = body.quantity;
  }
}

export default Product;