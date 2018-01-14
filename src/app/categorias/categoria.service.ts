import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Categoria } from './../core/model';
import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  categoriaUrl: string;

  constructor(private http: AuthHttp) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
   }

  listar(): Promise<any> {
    return this.http.get(this.categoriaUrl)
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.categoriaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.http.post(this.categoriaUrl, JSON.stringify(categoria))
      .toPromise()
      .then(response => response.json());
  }

}
