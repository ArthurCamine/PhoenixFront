import { Component, OnInit } from '@angular/core';
import { TipoMensagem } from '../shared/enums/tipo-mensagem';
import { CommandResult } from '../shared/models/command-result';
import { Post } from '../shared/models/post';
import { Usuario } from '../shared/models/usuario';
import { FeedService } from '../shared/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  posts: Array<Post> = [];
  modoEdicao = false;
  descricaoPublicacao: string;
  usuarioLogado: Usuario;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    this.feedService.buscarTodosPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      () => console.log('Erro ao carregar posts')
    );
  }

  editar() {
    this.modoEdicao = true;
  }

  descartarPublicacao() {
    this.descricaoPublicacao = '';
    this.modoEdicao = false;
  }

  publicar() {
    this.feedService.cadastrar(this.descricaoPublicacao).subscribe(
      (result: CommandResult) => {
        this.descartarPublicacao();
        this.mensagemToast(TipoMensagem.Sucesso, 'Sua publicação foi criada com sucesso.');

        this.feedService.buscarTodosPosts().subscribe(
          (posts: Post[]) => this.posts = posts,
          () => this.mensagemToast(TipoMensagem.Erro, 'Erro ao buscar as novas postagens.')
        );
      },
      (erro) => this.mensagemToast(TipoMensagem.Erro, 'Erro ao criar sua publicação.')
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
}
