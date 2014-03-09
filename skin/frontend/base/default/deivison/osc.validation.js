/**
 * Created by edumneves on 24/12/13.
 */
if (Validation){
    // adicionar validação de cep
    Validation.add('validate-cemail', 'Certifique-se que seus e-mails correspondem.', function(v) {
        var conf = $$('.validate-cemail')[0];
        var pass = false;
        if ($('email')) {
            pass = $('email');
        }
        var emailElements = $$('.validate-email');
        for (var i = 0; i < emailElements.size(); i++) {
            var emailElement = emailElements[i];
            if (emailElement.up('form').id == conf.up('form').id) {
                pass = emailElement;
            }
        }
        if ($$('.validate-admin-email').size()) {
            pass = $$('.validate-admin-email')[0];
        }
        return (pass.value == conf.value);
    });

    // Adicionar validacao de cpf e cnpj ao campo Taxvat
    Validation.add('validar_cpf', 'O CPF informado \xE9 invalido', function(v){return validaCPF(v,0);});
    Validation.add('validar_cpf2', 'O CNPJ informado \xE9 invalido', function(v){return validaCPF(v,0);});
    Validation.add('validar_cpfcnpj', 'O CPF/CNPJ informado \xE9 invalido (VALIDATION)', function(v){return validaCPF(v,0);});
}
