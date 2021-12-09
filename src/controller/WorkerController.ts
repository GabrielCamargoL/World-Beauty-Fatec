import { ListsAll, Worker } from "../model";
import Input from '../utils/InputForControllers'


export default class WorkerController {
  input: Input;
  lists: ListsAll;
  workerList: Array<Worker>;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.lists = lists;
    this.workerList = lists.workers;
  }


  optionsWorker() {
    console.log(
      `Opções de funcionario: 
      [1] Cadastrar novo funcionario
      [2] Listar funcionario
      [3] Selecionar um funcionario
      [4] Atualizar dados do funcionario
      [5] Remover funcionario 
      
      [0] Voltar <- 
      \n`
    );

    let WorkerOption = this.input.number(
      `Por favor, escolha uma opção sobre funcionario: `
    );

    switch (WorkerOption) {
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

  searchWorker(CPF: string) {
    const WorkerFiltered = this.workerList.filter(
      (worker) => worker.getCPF() === CPF
    );

    if (WorkerFiltered.length == 0) {
      console.log("Funcionario não encontrado");
      CPF = this.input.text(`infome o CPF: `);
      return this.searchWorker(CPF);
    }
    return WorkerFiltered[0];
  }

  create(): void {
    console.log("\nInício do cadastro do funcionario");

    const name = this.input.text(`Nome: `);
    const cpf = this.input.text("CPF: ");

    let gender = this.input.text("Sexo 'M' Masculino, 'F' Feminino): ");
    gender === "M" ? "Masculino" : gender === "F" ? "Feminino" : "Não informado";

    const birthday = this.input.text("Data de nascimento: ");
    const phone = this.input.text("tel para contato: ");

    const id = `${Math.floor(Math.random() * 1000000) + 1}-${Date.now()}`;

    const worker = new Worker(
      id,
      gender,
      name,
      birthday,
      cpf,
      phone
    );

    this.workerList.push(worker);

    console.log("\nCadastro Feito com Sucesso!\n");
  }

  index(): any {
    console.log(`\nLista de funcionario:`);

    this.workerList.forEach((worker) => {
      console.log(`
      id: ${worker.id}
      Nome: ${worker.name}
      CPF: ${worker.getCPF()}
      Sexo: ${worker.gender}
      Aniversario: ${worker.birthday}
      Telefone: ${worker.phone}
      =========\n`);
    });

    console.log(`**************************************`);
  }

  show(): any {
    let CPF = this.input.text(`Informe o CPF: `);

    const worker: Worker = this.searchWorker(CPF);

    console.log(`
      id: ${worker.id}
      Nome: ${worker.name}
      CPF: ${worker.getCPF()}
      Sexo: ${worker.gender}
      Aniversario: ${worker.birthday}
      Telefone: ${worker.phone}
      ========\n`);

    console.log(`**************************************`);
  }

  put(): any {
    let CPF = this.input.text(`informe o CPF: `);

    const Worker: Worker = this.searchWorker(CPF);

    let name = this.input.text(`Atualizar nome do funcionario: `);
    let gender = this.input.text("Sexo 'M' Masculino, 'F' Feminino): ");
    gender === "F" ? "Feminino" : gender === "M" ? "Masculino" : "Não informado";
    let birthday = this.input.text("Data de nascimento: ");
    let phone = this.input.text("tel de contato: ");

    const body = { gender, name, birthday, phone };
    Worker.updateWorkerData(body);
    console.log(`\n`);
  }

  delete(): any {
    let CPF = this.input.text(`informe o CPF: `);

    const Worker: Worker = this.searchWorker(CPF);

    const updateWorkerList = this.workerList.filter(
      (workerWithdrawn: Worker) => {
        return workerWithdrawn.getCPF() !== Worker.getCPF();
      }
    );

    this.lists.setWorkersList(updateWorkerList);
    console.log(`\n`);
  }
}