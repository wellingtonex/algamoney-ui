import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasCadastroComponent } from './categorias-cadastro/categorias-cadastro.component';
import { SheredModule } from './../shered/shered.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    SheredModule
  ],
  declarations: [
    CategoriasPesquisaComponent,
    CategoriasCadastroComponent],
  exports: [
    CategoriasPesquisaComponent,
    CategoriasCadastroComponent
  ]
})
export class CategoriasModule { }
