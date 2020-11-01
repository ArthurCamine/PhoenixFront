import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandResult } from '../models/command-result';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = environment.endpoint;
  private token = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }

  public buscarTodosPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`${this.url}/feed`, this.createHeader());
  }

  public cadastrar(descricao: string): Observable<CommandResult> {
    return this.httpClient.post<CommandResult>(`${this.url}/feed`, `\"${descricao}\"`, this.createHeader());
  }

  private createHeader() {
    const options = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
      },
    };
    return options;
  }
}
