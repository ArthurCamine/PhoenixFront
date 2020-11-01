import { Usuario } from './usuario';

export class Post {
    usuario: Usuario;
    descricao: string;
    dataPublicacao: Date;
    quantidadeLikes: number;
}
