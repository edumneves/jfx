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

    /**
     * Request AJAX para o servi?o de buscar endere?o do UOL HOST
     *
     */
    var URL_SERVICO            = 'https://lvws0001.lojablindada.com/endereco/';
    var billingCEP             = jQuery('#billing\\:postcode');

    funcaoCallback = new Array();
    funcaoCallback['billing'] = 'exibeEnderecoCobranca';
    funcaoCallback['shipping'] = 'exibeEnderecoEntrega';


    ultCep = new Array();
    ultCep['billing'] = "";
    ultCep['shipping'] = "";


    var shippingCEP             = jQuery('#shipping\\:postcode');

    getRegionIdByUF = function(UF){
        for(a in countryRegions.BR){
            if(countryRegions.BR[a].code==UF){
                return a;
            }
        }
    }

    exibeEnderecoCobranca = function(data) {
        if (data.status=="sucesso") {
            preencheEndereco('billing', data);
        }
    }

    exibeEnderecoEntrega = function(data) {
        if (data.status=="sucesso") {
            preencheEndereco('shipping', data);
        }
    }

    function preencheEndereco(modo, data){

        jQuery("#" + modo + "\\:street1").val(data.endereco);
        jQuery("#" + modo + "\\:street4").val(data.bairro);

        jQuery("#" + modo + "\\:city").val(data.cidade);

        regionId = getRegionIdByUF(data.uf);
        jQuery("#" + modo + "\\:region_id").val(regionId);

        // estilizando os campos
        // hack para deixar o bairro em maiuscula
        jQuery("#" + modo + "\\:street4").css("text-transform", "uppercase");
    }


    getJSONP = {
        url: '',
        insertHead: function(){
            tagScript = document.createElement('script')
            tagScript.src = this.url;
            document.getElementsByTagName('head')[0].appendChild(tagScript)
        },

        run: function(){
            if(arguments.length!=0){
                this.url = arguments[0];
            }
            this.insertHead();
        }
    }

    billingCEP.on("keyup", function() {
        if ( (jQuery(this).val().length==9) && (jQuery(this).val().indexOf("_")==-1)) {
            jQuery("#view-address-more").show("slide");
            updateReviewAndLoadAddress('billing');
        };
    });

    billingCEP.on("blur",
        updateReviewAndLoadAddress('billing')
    );

    shippingCEP.on("keyup", function() {
        if ( (jQuery(this).val().length==9) && (jQuery(this).val().indexOf("_")==-1)) {
            jQuery("#view-address-more").show("slide");
            updateReviewAndLoadAddress('shipping');
        };
    });

    shippingCEP.on("blur",
        updateReviewAndLoadAddress('shipping')
    );



    function updateReviewAndLoadAddress(modo){
        var cepPesquisado = jQuery('#' + modo + '\\:postcode').val();
        if (ultCep[modo] != cepPesquisado) {

            // update product cart
            if (typeof checkout !== 'undefined' ) {
                checkout.update({
                    'review': 1
                });
            }

            // atualiza endereço
            getJSONP.run( URL_SERVICO + "?cep=" + cepPesquisado + "&format=json&callback=" + window.funcaoCallback[modo]);
            window.ultCep[modo] = cepPesquisado;
        }
    }

    //<![CDATA[
    if (typeof BillingAddress !== 'undefined' ) {
        var billing = new BillingAddress();
        RegionUpdater.prototype.setMarkDisplay = function(){};
        ZipUpdater.prototype._setPostcodeOptional = function(){};
        var billingRegionUpdater = new RegionUpdater('billing:country_id', 'billing:region', 'billing:region_id', countryRegions, undefined, 'billing:postcode');
    }
    //]]>

    jQuery(function(){
        jQuery("#taxvat").unmask();
        jQuery("#taxvat").mask("999.999.999-99");
    })

});


/********************* Valida CPF e CNPJ *********************/
/********************* Valida CPF e CNPJ *********************/
/********************* Valida CPF e CNPJ *********************/

// Adicionar classe de validacao de cpf e cnpj ao Taxvat
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
    }
    return( (mControle1 * 10) + mControle );
}


