import { ListsAll, Client } from "../model/index";
import Input from "../utils/InputForControllers";

export class ReportController {
  private input: Input;
  private clientList: Array<Client>;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.clientList = lists.clients;
  }

  optionsReport() {
    console.log(`
      Opções para geração de relatório:

      [1] Clientes que mais consumiram.
      [2] Clientes que menos consumiram.
      [3] Clientes que mais consumiram por sexo.
      [4] Clientes que mais gastaram em dinheiro.
      [5] Produtos ou serviços mais consumidos.

      [0] Voltar <-
      `);

    let optionsReport = this.input.number(
      `Escolha uma opção para gerar o relatório:`
    );
    switch (optionsReport) {
      case 0:
        return;
      case 1:
        this.getClientsDescendent();
        break;
      case 2:
        this.getClientsAscendent();
        break;
      case 3:
        this.getClientsGender();
        break;
      case 4:
        this.getClientsInValueDescendent();
        break;
      case 5:
        this.getTopProductsAndServices();
        break;
      default:
        console.log(`Opção inválida!`);
    }
  }

  public getClientsDescendent(): any {
    const report: Array<{ name: string; consumer: number }> =
      this.clientList.map((client) => {
        let countServiceAndProduct = 0;
        client.orders.forEach((order) => {
          order.productList?.forEach(() => countServiceAndProduct++);
          order.serviceList?.forEach(() => countServiceAndProduct++);
        });
        return { name: client.name, consumer: countServiceAndProduct };
      });

    const compare = (a, b) => {
      if (a.consumer > b.consumer) return -1;
      if (a.consumer < b.consumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top10 = report.slice(0, 10);
    console.log("Clientes que mais consumiram\n");
    top10.forEach((client, index) => {
      console.log(`
        pos: ${index + 1}
        Nome: ${client.name} 
        Vezes em que agendou/comprou: ${client.consumer}
      `);
    });
    console.log("=============================================================");;
  }

  public getClientsAscendent(): any {
    const report: Array<{ name: string; consumer: number }> =
      this.clientList.map((client) => {
        let countServiceAndProduct = 0;
        client.orders.forEach((order) => {
          order.productList?.forEach(() => countServiceAndProduct++);
          order.serviceList?.forEach(() => countServiceAndProduct++);
        });
        return { name: client.name, consumer: countServiceAndProduct };
      });

    const compare = (a, b) => {
      if (a.consumer < b.consumer) return -1;
      if (a.consumer > b.consumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top10 = report.slice(0, 10);
    console.log("Clientes que menos consumiram\n");
    top10.forEach((client, index) => {
      console.log(`
        posição: ${index + 1}
        Nome: ${client.name}, 
        Vezes em que agendou/comprou: ${client.consumer}
      `);
    });
    console.log("=============================================================");;
  }

  public getClientsGender(): any {
    const clientList = this.clientList;
    const compare = (a, b) => {
      if (a.gender > b.gender) return -1;
      if (a.gender < b.gender) return 1;
      return 0;
    };
    clientList.sort(compare);

    console.log("Clientes por gênero \n");
    clientList.forEach((client) => {
      console.log(`
        Nome: ${client.name}
        Sexo: ${client.gender}
        CPF: ${client.getCPF()}
      `);
    });
    console.log("=============================================================");;
  }

  public getClientsInValueDescendent(): any {
    const format = {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    };

    const report: Array<{ name: string; valueConsumer: number }> =
      this.clientList.map((client) => {
        let valueServiceAndProductConsumer = 0;
        client.orders.forEach((order) => {
          console.log(order)
          valueServiceAndProductConsumer += order.orderValue;
        });
        return {
          name: client.name,
          valueConsumer: valueServiceAndProductConsumer,
        };
      });

    const compare = (a, b) => {
      if (a.valueConsumer > b.valueConsumer) return -1;
      if (a.valueConsumer < b.valueConsumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top5 = report.slice(0, 5);
    console.log("Clientes que mais gastaram dinheiro\n");
    top5.forEach((client, index) => {
      console.log(`
        posição: ${index + 1} 
        Nome: ${client.name}
        Valor gasto: ${client.valueConsumer.toLocaleString("pt-BR", format)}`
      );
    });
    console.log("=============================================================");
  }

  public getTopProductsAndServices(): any {
    const listConsumedProducts: Array<{
      id: number;
      name: string;
      quantity: number;
    }> = [];

    const listConsumedService: Array<{
      id: number;
      name: string;
      value:number
    }> = [];

    const insertingInList = (listItem, id, name) => {
      const searchItem = (item) => item.id === id;

      let itemFind = listItem.find(searchItem);
      if (itemFind !== undefined) {
      } else {
        listItem.push({ id: id, name: name });
      }
      return;
    };

    this.clientList.forEach((client) => {
      client.orders.forEach((order) => {
        order.productList?.forEach((product) => {
          insertingInList(
            listConsumedProducts,
            product.product.id,
            product.product.name
          );
        });

        order.serviceList?.forEach((service) => {
          insertingInList(
            listConsumedService,
            service.service.id,
            service.service.name
          );
        });
      });
    });

    const compare = (a, b) => {
      if (a.unit > b.unit) return -1;
      if (a.unit < b.unit) return 1;
      return 0;
    };

    listConsumedService.sort(compare);
    listConsumedProducts.sort(compare);

    console.log("Produtos mais vendidos \n");
    listConsumedProducts.forEach((product) => {
      console.log(`Nome do produto: ${product.name}`);
    });
    console.log("=============================================================");;
    console.log("Serviços mais agendados \n");
    listConsumedService.forEach((service) => {
      console.log(`Nome do serviço: ${service.name}`);
    });
    console.log("=============================================================");
  }
}
