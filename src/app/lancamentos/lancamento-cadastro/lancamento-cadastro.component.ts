import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt_BR: any;
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
      this.pt_BR = {
        firstDayOfWeek: 0,
        dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
        dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
        dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        // tslint:disable-next-line:max-line-length
        monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
        monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
      };

      this.carregarCategorias();
      this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listar()
    .then(categorias => {
      this.categorias = categorias.map(c => {
        return { label: c.nome, value: c.codigo};
      });
    }).catch(error => {
      this.errorHandler.handle(error);
    });
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return {label: p.nome, value: p.codigo};
        });
      });
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
  }

}
