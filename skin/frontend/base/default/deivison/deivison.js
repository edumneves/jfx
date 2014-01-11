/*=========================================================================================================================================================
 *
 *  PROJETO OSC MAGENTO BRASIL - VERSÃO FINAL V3.0
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  O módulo One Step Checkout normatizado para a localização brasileira.
 *  site do projeto: http://onestepcheckout.com.br/
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *
 *
 *  Mmantenedores do Projeto:
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *  Deivison Arthur Lemos Serpa
 *  deivison.arthur@gmail.com
 *  www.deivison.com.br
 *  (21)9203-8986
 *
 *  Denis Colli Spalenza
 *  http://www.xpdev.com.br
 *
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *
 *
 *  GOSTOU DO MÓDULO?
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Se você gostou, se foi útil para você, se fez você economizar aquela grana pois estava prestes a pagar caro por aquele módulo pago, pois não achava uma
 *  solução gratuita que te atendesse e queira prestigiar o trabalho feito efetuando uma doação de qualquer valor, não vou negar e vou ficar grato! você
 *  pode fazer isso visitando a página do projeto em: http://onestepcheckout.com.br/
 *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
/*=========================================================================================================================================================
 */

var lastPostCode = "";

$j(document).ready(function(){


    // Mascaras
    // Data de nascimento
    $j('input[name*="day"]').attr('maxlength','2');
    $j('input[name*="month"]').attr('maxlength','2');
    $j('input[name*="year"]').attr('maxlength','4');

    // CEP
    $j('input[name*="postcode"]').mask('99999-999');

    // CPF
    $j('input[name*="taxvat"]').mask('999.999.999-99');

    /*CADASTRO*/
    $j('input[name="taxvat-old"]').attr('name', 'taxvat');
    $j('input[name="taxvat"]:eq(1)').attr('name', 'taxvat-old');

    $j('input[name="taxvat-old"]').attr('class', 'input-text');
    $j('input[name="taxvat"]').attr('class', 'validar_cpfcnpj input-text');

    /*BILLING*/
    $j('input[name="billing[taxvat-old]"]').attr('name', 'billing[taxvat]');
    $j('input[name="billing[taxvat]"]:eq(1)').attr('name', 'billing[taxvat-old]"]');

    /*LIMPA CAMPOS*/
    $j('input[name="taxvat"]').val('');
    $j('input[name="billing[taxvat]"]').val('');

    /*ADD CLASS TAXVAT*/
    $j('input[name*="taxvat"]').attr('class', 'validar_cpfcnpj input-text');

    /*Botao aguarde*/
    var erro1;
    var erro2;

    $j('#review-buttons-container').click( function(){
        $j(this).attr('class', 'buttons-set disabled');
        $j('#review-please-wait').show();

        erro1 = $j('.error-msg').length;
        erro2 = $j('.validation-failed').length;

        if(erro1 > 0 || erro2 > 0){
            $j(this).attr('class', 'buttons-set');
            $j('#review-please-wait').hide();
        }
    });

    var telefone_selector = 'input[name*="celular"], input[name*="telephone"], input[name*="fax"]';
    $j(telefone_selector).mask('(99) 9999-9999?9');
    $j(telefone_selector).live("keyup",function() {
        var tmp = $j(this).val();
        tmp = tmp.replace(/[^0-9]/g,'');
        var ddd = tmp.slice(0, 2);
        var servico_regex = new RegExp('0[0-9]00');
        var servico = servico_regex.exec(tmp.slice(0,4));
        var primeiro_numero_ddd = tmp.slice(0, 1);
        var primeiro_numero = tmp[2];
        // console.log('trigger');
        if (tmp.length == 11 && (primeiro_numero_ddd == '1' || primeiro_numero_ddd == '2') && primeiro_numero == '9') {
            $j(this).unmask();
            $j(this).val(tmp);
            $j(this).mask("(99) 99999-999?9");
        }
        else if (servico && (tmp.length == 11 || tmp.length == 10)) {
            $j(this).unmask();
            $j(this).val(tmp);
            $j(this).mask("9999-999999?9");
        }
        else if (tmp.length == 10 && (primeiro_numero_ddd == '1' || primeiro_numero_ddd == '2') && primeiro_numero == '9') {
            $j(this).unmask();
            $j(this).val(tmp);
            $j(this).mask("(99) 9999-9999?9");
        } else if (tmp.length == 10) {
            $j(this).unmask();
            $j(this).val(tmp);
            $j(this).mask("(99) 9999-9999");
        }
    }).keyup();


});


/********************* Valida CPF e CNPJ *********************/
/********************* Valida CPF e CNPJ *********************/
/********************* Valida CPF e CNPJ *********************/

// Adicionar classe de validacao de cpf e cnpj ao Taxvat
//$j('#billing:taxvat"]').addClassName('validar_cpf'); //removido e colocado na m?o

function validaCPF(cpf,pType){
    var cpf_filtrado = "", valor_1 = " ", valor_2 = " ", ch = "";
    var valido = false;

    for (i = 0; i < cpf.length; i++){
      ch = cpf.substring(i, i + 1);
        if (ch >= "0" && ch <= "9"){
            cpf_filtrado = cpf_filtrado.toString() + ch.toString()
            valor_1 = valor_2;
            valor_2 = ch;
        }
        if ((valor_1 != " ") && (!valido)) valido = !(valor_1 == valor_2);
    }

    if (!valido) cpf_filtrado = "12345678912";
    if (cpf_filtrado.length < 11){
        for (i = 1; i <= (11 - cpf_filtrado.length); i++){cpf_filtrado = "0" + cpf_filtrado;}
    }

    if(pType <= 1){
        if ( ( cpf_filtrado.substring(9,11) == checkCPF( cpf_filtrado.substring(0,9) ) ) && ( cpf_filtrado.substring(11,12)=="") ){return true;}
    }

    if((pType == 2) || (pType == 0)){
        if (cpf_filtrado.length >= 14){
            if ( cpf_filtrado.substring(12,14) == checkCNPJ( cpf_filtrado.substring(0,12) ) ){  return true;}
        }
    }

    return false;
}



function checkCNPJ(vCNPJ){
    var mControle = "";
    var aTabCNPJ = new Array(5,4,3,2,9,8,7,6,5,4,3,2);
    for (i = 1 ; i <= 2 ; i++){
        mSoma = 0;
        for (j = 0 ; j < vCNPJ.length ; j++)
        mSoma = mSoma + (vCNPJ.substring(j,j+1) * aTabCNPJ[j]);
        if (i == 2 ) mSoma = mSoma + ( 2 * mDigito );
        mDigito = ( mSoma * 10 ) % 11;
        if (mDigito == 10 ) mDigito = 0;
        mControle1 = mControle ;
        mControle = mDigito;
        aTabCNPJ = new Array(6,5,4,3,2,9,8,7,6,5,4,3);
    }

    return( (mControle1 * 10) + mControle );
}



function checkCPF(vCPF){
    var mControle = ""
    var mContIni = 2, mContFim = 10, mDigito = 0;
    for (j = 1 ; j <= 2 ; j++){
        mSoma = 0;
        for (i = mContIni ; i <= mContFim ; i++)
        mSoma = mSoma + (vCPF.substring((i-j-1),(i-j)) * (mContFim + 1 + j - i));
        if (j == 2 ) mSoma = mSoma + ( 2 * mDigito );
        mDigito = ( mSoma * 10 ) % 11;
        if (mDigito == 10) mDigito = 0;
        mControle1 = mControle;
        mControle = mDigito;
        mContIni = 3;
        mContFim = 11;
    }32060-040

        return( (mControle1 * 10) + mControle );
}




