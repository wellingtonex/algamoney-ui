import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { Pessoa } from './../core/model';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {path: 'pessoas', component: PessoasPesquisaComponent},
  {path: 'pessoas/novo', component: PessoaCadastroComponent},
  {path: 'pessoas/:codigo', component: PessoaCadastroComponent},
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [
    RouterModule
  ]
})
export class PessoasRoutingModule { }
