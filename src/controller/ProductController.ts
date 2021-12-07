import { ListsAll, Product } from "../model";
import Input from '../utils/InputForControllers'

export default class ProductController {
  input: Input;
  productList: Array<Product>;
  lists: ListsAll;

  constructor(lists: ListsAll) {
    this.input = new Input();
    this.lists = lists;
    this.productList = lists.products;
  }

  optionsProduct() {
    console.log(`
      Opções de Produto:
      [1] Cadastrar novo produto
      [2] Lista de produtos
      [3] Selecionar um produto
      [4] Atualizar dados de um produto
      [5] Remover produto 

      [0] Voltar <-
      \n`);

    let productOption = this.input.number(
      `Por favor, escolha uma opção sobre produtos: `
    );

    switch (productOption) {
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

  searchProduct() {
    let name = this.input.text(`Digite o Nome do produto: `);

    const productFiltered = this.productList.filter(
      (product) => product.name === name
    );

    if (productFiltered.length == 0) {
      console.log("Produto não encontrado, tente novamente!");

      return this.searchProduct();
    }
    return productFiltered[0];
  }


  create(): any {
    console.log("\nInício do cadastro do produto");

    const name = this.input.text(`Nome: `);
    const brand = this.input.text(`Marca: `);
    const value = this.input.number(`Preço: `);
    const quantity = this.input.number(`Quantidade: `);
    const id = `${name}-${Date.now()}`;

    const product = new Product(
      id,
      name,
      brand,
      value,
      quantity
    );

    this.productList.push(product);

    console.log("\nProduto Cadastrado com sucesso\n");
  }

  index(): any {
    console.log(`\nLista de produtos:`);

    this.productList.forEach((product) => {
      console.log(`
      id: ${product.id}
      Marca: ${product.brand}
      Nome: ${product.name}
      Valor: R$ ${product.value}
      Quantidade: ${product.quantity}
      =========\n`);
    });

    console.log(`**************************************`);
  }

  show(): any {
    const product: Product = this.searchProduct();

    console.log(`
      id: ${product.id}
      Marca: ${product.brand}
      Nome: ${product.name}
      Valor: R$ ${product.value}
      Quantidade: ${product.quantity}
      =========\n`);

    console.log(`**************************************`);
  }

  put(): any {
    const product: Product = this.searchProduct();

    let name = this.input.text(`Novo Nome: `);
    let brand = this.input.text(`Nova marca: `);
    let value = this.input.number(`Novo preço do produto: `);
    let quantity = this.input.number(`Quantidade: `);

    const body = { name, brand, quantity, value };
    product.updateProductData(body);

    console.log(`\n`);
  }

  delete(): any {
    const product: Product = this.searchProduct();

    const updateProductList = this.productList.filter(
      (productWithdrawn: Product) => {
        return productWithdrawn.id !== product.id;
      }
    );

    this.lists.setProductList(updateProductList);
  }
}
