export class Service {
  readonly id: string;
  public name: string;
  public type: string;
  public value: number;

  constructor(
    name: string,
    type: string,
    value: number,
  ) {
    this.id = `${Math.random()}${Date.now()}`;
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

export default Service;