import Service from "./Service"

export class Worker {
  id: string
  gender: string
  name: string
  birthday: Date
  cpf: string
  phone: string
  services!: Service
  
  constructor(
    id: string,
    gender: string,
    name: string,
    birthday: Date,
    cpf: string,
    services: Service,
    phone: string
  ) {
    this.id= id,
    this.gender = gender,
    this.name = name,
    this.birthday = birthday,
    this.cpf = cpf,
    this.phone = phone,
    this.services! = services
  }
  
  // Methods

  public set setGender(gender: string) {
    this.gender = gender;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public set setBirthday(birthday: Date,) {
    this.birthday = birthday;
  }

  public set setCPF(cpf: string) {
    this.cpf = cpf;
  }

  public set setPhone(phone: string) {
    this.phone = phone;
  }

  public get getServices(): Service {
    return this.services;
  }

  public setServices(services: Service) {
    this.services = services;
  }
}

export default Worker;