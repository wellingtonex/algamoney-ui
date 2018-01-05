import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

      const codigoLancamento = this.route.snapshot.params['codigo'];
      this.carregarLancamento(codigoLancamento);

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


      this.title.setTitle('Cadastro de Lançamentos');
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

  carregarLancamento(codigoLancamento) {
    if (codigoLancamento) {
      this.lancamentoService.buscarPorCodigo(codigoLancamento)
        .then(resposta => {
          this.lancamento = resposta;
          this.atualizarTituloEdicao();
        }).catch( error => this.errorHandler.handle(error));
    }
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
    if (this.editando) {
        this.alterar();
    } else {
      this.adicionar(form);
    }
  }

    private alterar() {
        this.lancamentoService.atualizar(this.lancamento)
            .then(resposta => {
                this.lancamento = resposta;
                this.toasty.success('Lançamento alterado com successo.');
                this.atualizarTituloEdicao();
            }).catch( error => this.errorHandler.handle(error));
    }

  adicionar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.toasty.success('Lançamento adicionado com sucesso.');
        //limpa o formulario
        //form.reset();
        this.router.navigate(['/lancamentos']);
        this.lancamento = new Lancamento();
      }).catch(error => this.errorHandler.handle(error));
  }

  novo(form: FormControl) {
    form.reset();

    //gambiarra para garantir que o reset seja executado antes
    setTimeout(()  => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
