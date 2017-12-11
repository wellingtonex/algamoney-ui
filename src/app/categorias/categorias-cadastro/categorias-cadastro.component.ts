import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../../core/model';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html',
  styleUrls: ['./categorias-cadastro.component.css']
})
export class CategoriasCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  categoria = new Categoria();

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.categoriaService.adicionar(this.categoria)
      .then(() => {
        this.toasty.success('Categoria adicionada com sucesso!');

        form.reset();
        this.categoria = new Categoria();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
