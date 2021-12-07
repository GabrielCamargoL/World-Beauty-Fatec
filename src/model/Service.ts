export class Service {
  readonly id: string;
  public name: string;
  public value: number;

  constructor(
    name: string,
    value: number,
  ) {
    this.id = `${Math.random()}${Date.now()}`;
    this.name = name;
    this.value = value;
  }

  public updateServiceData(body: { name:string, value: number }) {
    this.name = body.name
    this.value = body.value;
  }
}

export default Service;