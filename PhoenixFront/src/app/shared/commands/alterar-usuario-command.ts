export interface AlterarUsuarioCommand {
    id: string;
    nome: string;
    email: string;
    senhaAtual: string;
    senhaNova: string;
    desejoDoacaoOrgao: boolean;
    dataNascimento: Date;
}
