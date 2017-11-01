import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistro = 0;
  @ViewChild('tabela') grid;

  constructor(
      private lancamentoService: LancamentoService,
      private toasty: ToastyService,
      private confirmation: ConfirmationService,
      private errorHandler: ErrorHandlerService) { }

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(response => {
        this.lancamentos = response.lancamentos;
        this.totalRegistro = response.total;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Lançamento excluído com sucesso!');
      }).catch(erro => this.errorHandler.handle(erro));
  }
}
