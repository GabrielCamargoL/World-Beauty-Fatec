import { ListsAll, Service } from "../model";
import Input from '../utils/InputForControllers'

export class ServiceController {
  private input: Input;
  private lists: ListsAll;
  private serviceList: Array<Service>;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.lists = lists;
    this.serviceList = lists.services;
  }

  optionsServices() {
    console.log(`
      Opções de serviço:
      [1] - Cadastrar novo serviço
      [2] - Lista de serviços
      [3] - Selecionar serviço
      [4] - Atualizar dados de um serviço
      [5] - Remover serviço 

      [0] - Voltar <-- 
      \n`);

    let serviceOption = this.input.number(`Por favor, escolha uma opção: `);

    switch (serviceOption) {
      case 0:
        return;
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
        console.log(`Opção inválida! `);
    }
  }

  searchService() {
    let name = this.input.text(`informe o nome do serviço: `);

    const serviceFiltered = this.serviceList.filter(
      (service) => service.name === name
    );

    if (serviceFiltered.length == 0) {
      console.log("Serviço não encontrado, tente novamente!");
      return this.searchService();
    }
    return serviceFiltered[0];
  }
      

  create(): any {
    console.log("\nInício do cadastro de serviço");

    const name = this.input.text(`Nome: `);
    const price = this.input.number(`Preço: `);
    const service = new Service(name, price);

    this.serviceList.push(service);
    console.log("\nServiço cadastrado com sucesso\n");
  }

  index(): any {
    console.log(`\nCatálogo de serviço:`);
    this.serviceList.forEach((service) => {
      console.log(`
      id: ${service.id}
      Nome: ${service.name}
      Valor: R$ ${service.value}
      =========\n`);
    });

    console.log(`**************************************`);
  }

  show(): any {
    const service: Service = this.searchService();
    console.log(`
    Nome: ${service.name}
    Preço: R$ ${service.value}
    =========\n`);

    console.log(`**************************************`);
  }

  put(): any {
    const service: Service = this.searchService();

    let name = this.input.text(`Novo Nome: `);
    let value = this.input.number(`Novo Valor: `);

    const body = { name, value };

    service.updateServiceData(body);

    console.log(`\n`);
  }

  delete(): any {
    const service: Service = this.searchService();

    const serviceListUpdated = this.serviceList.filter(
      (serviceWithDrawn: Service) => {
        return serviceWithDrawn.name !== service.name;
      }
    );

    this.lists.setServicesList(serviceListUpdated);
  }
}
