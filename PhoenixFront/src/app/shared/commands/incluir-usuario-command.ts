export interface IncluirUsuarioCommand {
    nome: string;
    email: string;
    senha: string;
    dataNascimento: Date;
    desejoDoacaoOrgao: boolean;
}
