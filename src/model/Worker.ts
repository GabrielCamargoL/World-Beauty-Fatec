import Service from "./Service"

export class Worker {
  gender: string
  name: string
  birthday: Date
  cpf: number
  phones: string
  services: Service
  
  constructor(
    gender: string,
    name: string,
    birthday: Date,
    cpf: number,
    services: Service,
    phones: string
  ) {
    this.gender = gender,
    this.name = name,
    this.birthday = birthday,
    this.cpf = cpf,
    this.phones = phones,
    this.services = services
  }
  
  // Methods
  public get getServices(): Service {
    return this.services;
  }
  public setServices(services: Service) {
    this.services = services;
  }
}

export default Worker;