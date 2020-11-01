import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IncluirUsuarioCommand } from '../commands/incluir-usuario-command';
import { LoginCommand } from '../commands/login-command';
import { TokenLogin } from '../models/token-login';
import { Observable } from 'rxjs';
import { AlterarUsuarioCommand } from '../commands/alterar-usuario-command';
import { CommandResult } from '../models/command-result';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private url = environment.endpoint;
    private token = localStorage.getItem('token');

    constructor(private httpClient: HttpClient) { }

    public setUsuario(token: TokenLogin) {
      localStorage.setItem('usuario', JSON.stringify(token.usuario));
      return localStorage.setItem('token', token.token);
    }

    public cadastrar(command: IncluirUsuarioCommand): Observable<CommandResult> {
      return this.httpClient.post<CommandResult>(`${this.url}/usuario`, command);
    }

    public login(command: LoginCommand): Observable<TokenLogin> {
      return this.httpClient.post<TokenLogin>(`${this.url}/usuario/login`, command);
    }

    public alterarUsuario(command: AlterarUsuarioCommand): Observable<CommandResult> {
      return this.httpClient.put<CommandResult>(`${this.url}/usuario`, command, this.createHeader());
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
