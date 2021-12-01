export class Client {
  gender: string
  name: string
  birthday: Date
  cpf: number
  phones: string
  
  constructor(
    gender: string,
    name: string,
    birthday: Date,
    cpf: number,
    phones: string
  ) {
    this.gender = gender,
    this.name = name,
    this.birthday = birthday,
    this.cpf = cpf,
    this.phones = phones
  }
}

export default Client;