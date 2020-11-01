import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ConfirmarSenhaValidator(control: AbstractControl): ValidationErrors {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (senha.pristine || confirmarSenha.pristine) {
        return null;
    }

    if (senha.value === confirmarSenha.value) {
        return null;
    }

    return { SenhasNaoConferem : true};
}
