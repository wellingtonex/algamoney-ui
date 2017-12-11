import { Categoria } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listar(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(this.categoriaUrl, {headers})
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.categoriaUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.categoriaUrl, JSON.stringify(categoria), { headers })
      .toPromise()
      .then(response => response.json());
  }

}
