import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.carregarPessoa(codigoPessoa);
    this.title.setTitle('Cadastro de Pessoas');
  }

  salvar(form: FormControl) {

    if (this.editando) {
      this.alterar();
    } else {
      this.adicionar(form);
    }
  }

  private alterar() {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.pessoa = response;
        this.toasty.success('Pessoa alterada com sucesso.');
        this.atualizarTituloEdicao();
      }).catch(error => this.errorHandler.handle(error));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  private adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private carregarPessoa(codigo) {
    if (codigo) {
      this.pessoaService.buscarPorCodigo(codigo)
        .then(response => {
          this.pessoa = response;
          this.atualizarTituloEdicao();
        }).catch( error => this.errorHandler.handle(error));

    }
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(form: FormControl) {
    form.reset();

    //gambiarra para garantir que o reset seja executado antes
    setTimeout(()  => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo']);
  }
}
