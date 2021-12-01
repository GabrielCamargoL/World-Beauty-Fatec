export class Product {
  readonly id: number;
  public name: string;
  public type: string;
  public brand: string;
  public value: number;

  constructor(
    id: number,
    name: string,
    type: string,
    brand: string,
    value: number,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.brand = brand;
    this.value = value;
  }
}

export default Product;