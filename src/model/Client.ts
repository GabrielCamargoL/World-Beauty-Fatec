export class Client {
  readonly id: string
  gender: string
  name: string
  birthday: string
  cpf: string
  phone: string

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
  }

  public getCPF() {
    return this.cpf;
  }

  public updateClientData(body: {
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
}

export default Client;