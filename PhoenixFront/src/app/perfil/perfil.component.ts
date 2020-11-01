import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlterarUsuarioCommand } from '../shared/commands/alterar-usuario-command';
import { TipoMensagem } from '../shared/enums/tipo-mensagem';
import { Usuario } from '../shared/models/usuario';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  form: FormGroup;
  dataNascimento: Date;
  command: AlterarUsuarioCommand;
  diaNascimento: number;
  mesNascimento: number;
  anoNascimento: number;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.dataNascimento = new Date(this.usuario.dataNascimento);
    this.diaNascimento = this.dataNascimento.getDate();
    this.mesNascimento = this.dataNascimento.getMonth();
    this.anoNascimento = this.dataNascimento.getFullYear();

    this.form = this.fb.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome, [Validators.required, Validators.minLength(5)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      desejoDoacaoOrgao: [this.usuario.desejoDoacaoOrgao],
      senhaAtual: [''],
      novaSenha: ['']
    });
  }

  salvar() {
    const dataNascimento = new Date(this.anoNascimento, this.mesNascimento, this.diaNascimento);

    this.command = {
      id: this.usuario.id,
      dataNascimento,
      desejoDoacaoOrgao: this.form.get('desejoDoacaoOrgao').value,
      email: this.form.get('email').value,
      nome: this.form.get('nome').value,
      senhaAtual: this.form.get('senhaAtual').value,
      senhaNova: this.form.get('novaSenha').value
    };

    this.usuarioService.alterarUsuario(this.command).subscribe(
      (command) => {
        const usuarioAtualizado = Object.assign(this.usuario) as Usuario;

        usuarioAtualizado.dataNascimento = this.command.dataNascimento;
        usuarioAtualizado.desejoDoacaoOrgao = this.command.desejoDoacaoOrgao;
        usuarioAtualizado.email = this.command.email;
        usuarioAtualizado.nome = this.command.nome;

        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

        this.mensagemToast(TipoMensagem.Sucesso, 'Usuário alterado com sucesso.');
      },
      () => this.mensagemToast(TipoMensagem.Erro, 'Falha ao alterar o usuário')
    );
  }

  mensagemToast(tipoMensagem: TipoMensagem, mensagem: string) {
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
