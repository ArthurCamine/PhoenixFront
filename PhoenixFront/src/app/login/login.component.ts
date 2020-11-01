import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncluirUsuarioCommand } from '../shared/commands/incluir-usuario-command';
import { LoginCommand } from '../shared/commands/login-command';
import { TipoMensagem } from '../shared/enums/tipo-mensagem';
import { TokenLogin } from '../shared/models/token-login';
import { UsuarioService } from '../shared/services/usuario.service';
import { ConfirmarSenhaValidator } from '../shared/validators/confirmar-senha.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    formCadastro: FormGroup;
    formLogin: FormGroup;

    cadastroCommand: IncluirUsuarioCommand;
    loginCommand: LoginCommand;

    diaNascimento = 1;
    mesNascimento = 0;
    anoNascimento = 2020;

    constructor(private usuarioService: UsuarioService,
                private fb: FormBuilder,
                private router: Router) { }

    ngOnInit(): void {
      this.formCadastro = this.fb.group({
        desejoDoacaoOrgao: [true, Validators.required],
        email: ['', [Validators.required, Validators.minLength(5)]],
        nome: ['', [Validators.required, Validators.minLength(2)]],
        sobrenome: ['', [Validators.required, Validators.minLength(2)]],
        formSenha: this.fb.group({
          senha: ['', [Validators.required, Validators.minLength(6)]],
          confirmarSenha: ['', Validators.required],
        }, {validator: ConfirmarSenhaValidator})
      });

      this.formLogin = this.fb.group({
        email: ['', Validators.required],
        senha: ['', Validators.required]
      });
    }

    public cadastrar(): void {
      const dataNascimento = new Date(this.anoNascimento, this.mesNascimento, this.diaNascimento);

      this.cadastroCommand = {
        dataNascimento,
        desejoDoacaoOrgao: this.formCadastro.get('desejoDoacaoOrgao').value,
        email: this.formCadastro.get('email').value,
        nome: this.formCadastro.get('nome').value + ' ' + this.formCadastro.get('sobrenome').value,
        senha: this.formCadastro.get('formSenha.senha').value
      };

      this.usuarioService.cadastrar(this.cadastroCommand).subscribe(
        () => {
          this.mensagemToast(TipoMensagem.Sucesso, 'Usuário cadastrado com sucesso.');
          this.formCadastro.reset();
        },
        () => this.mensagemToast(TipoMensagem.Erro, 'Erro ao criar usuário.')
      );
    }

    login(): void {
      this.loginCommand = {
        email: this.formLogin.get('email').value,
        senha: this.formLogin.get('senha').value
      };

      this.usuarioService.login(this.loginCommand).subscribe(
        (token: TokenLogin) => {
          this.usuarioService.setUsuario(token);
          this.router.navigate(['feed']);
        },
        () => this.mensagemToast(TipoMensagem.Erro, 'Usuário ou senha inválidos.')
      );
    }

    mensagemToast(tipoMensagem: TipoMensagem, mensagem: string): void {
      const toast = document.querySelector('#toast');
      toast.classList.add(tipoMensagem.toString());
      toast.innerHTML = mensagem;

      setTimeout(() => {
        toast.classList.remove(tipoMensagem.toString());
        toast.innerHTML = '';
      }, 5000);
    }

    atualizarDiaNascimento(event: any): void {
      this.diaNascimento = event;
    }

    atualizarMesNascimento(event: any): void {
      this.mesNascimento = event;
    }

    atualizarAnoNascimento(event: any): void {
      this.anoNascimento = event;
    }
}
