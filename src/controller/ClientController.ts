import { ListsAll, Client } from "../model";
import Input from '../utils/InputForControllers'


export default class ClientController {
  private input: Input;
  private clientList: Array<Client>;
  private lists: ListsAll;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.clientList = lists.clients;
    this.lists = lists;
  }


  optionsClient() {
    console.log(
      `Opções de Cliente: 
      [1] Cadastrar novo cliente
      [2] Listar clientes
      [3] Selecionar um cliente
      [4] Atualizar dados do cliente
      [5] Remover cliente 
      [0] Voltar <- 
      \n`
    );

    let clientOption = this.input.number(
      `Por favor, escolha uma opção sobre clientes: `
    );

    switch (clientOption) {
      case 0:
        return;
      // break;
      case 1:
        this.create();
        break;
      case 2:
        this.index();
        break;
      case 3:
        this.show();
        break;
      case 4:
        this.put();
        break;
      case 5:
        this.delete();
        break;
      default:
        console.log(`Opção inválida!!! `);
    }
  }

  searchClient(CPF: string) {
    const clientFiltered = this.clientList.filter(
      (client) => client.getCPF() === CPF
    );

    if (clientFiltered.length == 0) {
      console.log("Cliente não encontrado");
      CPF = this.input.text(`infome o CPF: `);
      return this.searchClient(CPF);
    }
    return clientFiltered[0];
  }

  create(): void {
    console.log("\nInício do cadastro do cliente");

    const name = this.input.text(`Nome: `);
    const cpf = this.input.text("CPF: ");

    let gender = this.input.text("Sexo 'M' Masculino, 'F' Feminino): ");
    gender === "M" ? "Masculino" : gender === "F" ? "Feminino" : "Não informado";

    const birthday = this.input.text("Data de nascimento: ");
    const phone = this.input.text("tel para contato: ");

    const id = `${Math.floor(Math.random() * 1000000) + 1}-${Date.now()}`;

    const client = new Client(
      id,
      gender,
      name,
      birthday,
      cpf,
      phone
    );

    this.clientList.push(client);

    console.log("\nCadastro Feito com Sucesso!\n");
  }

  index(): any {
    console.log(`\nLista de clientes:`);

    this.clientList.forEach((client) => {
      console.log(`
      id: ${client.id}
      Nome: ${client.name}
      CPF: ${client.getCPF()}
      Sexo: ${client.gender}
      Aniversario: ${client.birthday}
      Telefone: ${client.phone}
      =========\n`);
    });

    console.log(`**************************************`);
  }

  show(): any {
    let CPF = this.input.text(`Informe o CPF: `);

    const client: Client = this.searchClient(CPF);

    console.log(`
      id: ${client.id}
      Nome: ${client.name}
      CPF: ${client.getCPF()}
      Sexo: ${client.gender}
      Aniversario: ${client.birthday}
      Telefone: ${client.phone}
      ========\n`);

    console.log(`**************************************`);
  }

  put(): any {
    let CPF = this.input.text(`informe o CPF: `);

    const client: Client = this.searchClient(CPF);

    let name = this.input.text(`Atualizar nome do cliente: `);
    let gender = this.input.text("Sexo 'M' Masculino, 'F' Feminino): ");
    gender === "F" ? "Feminino" : gender === "M" ? "Masculino" : "Não informado";
    let birthday = this.input.text("Data de nascimento: ");
    let phone = this.input.text("tel de contato: ");

    const body = { gender, name, birthday, phone };
    client.updateClientData(body);
    console.log(`\n`);
  }

  delete(): any {
    let CPF = this.input.text(`informe o CPF: `);

    const client: Client = this.searchClient(CPF);

    const updateClientList = this.clientList.filter(
      (clientWithdrawn: Client) => {
        return clientWithdrawn.getCPF() !== client.getCPF();
      }
    );

    this.lists.setListClient(updateClientList);
    console.log(`\n`);
  }
}