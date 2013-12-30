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
            $j('input[name="cpfcnpj"]').mask('999.999.999-99');
            $j('input[name="billing[cpfcnpj]"]').mask('999.999.999-99');

            /*===================================================== Click ===========================================================*/
            /*Roda o clique para selecionar o tipo pessoa*/
            $j('input[name*="tipopessoa"]').click( function(){

                var existe;



                /*Pega do click tipo pessoa*/
                queme = $j('input[name=tipopessoa]:checked').val();

                /*Verifica se existe o Taxvat*/
                existe = $j('input[name*="taxvat"]').length;

                if(queme == 'Fisica'){

                  /*fisica*/
                    /*Se existe o Taxvat alterna entre eles mudando o name conforme selecionado o tipo pessoa*/
                    if( existe != ''){

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

                        // Mascaras
                        $j('input[name*="taxvat"]').unmask();
                        $j('input[name*="taxvat"]').mask('999.999.999-99');
                        //$('#id_cnpj').mask('99.999.999/9999-99');

                    }else{
                        /*CADASTRO*/
                        $j('.inputcnpj').attr('name', 'NULL');
                        $j('.inputcpf').attr('name', 'cpfcnpj');

                        /*BILLING*/
                        $j('.Binputcnpj').attr('name', "NULL");             /*CNPJ NULL*/
                        $j('.Binputcpf').attr('name', "billing[cpfcnpj]");  /*CPF OK*/
                        //$j('.Binputcpf').attr('name', 'oioioi');
                        /*LIMPA CAMPOS*/
                        $j('input[name="cpfcnpj"]').val('');
                        $j('input[name="billing[cpfcnpj]"]').val('');

                        // Mascaras
                        $j('input[name="cpfcnpj"]').unmask();
                        $j('input[name="cpfcnpj"]').mask('999.999.999-99');
                        $j('input[name="billing[cpfcnpj]"]').unmask();
                        $j('input[name="billing[cpfcnpj]"]').mask('999.999.999-99');
                        //$('#id_cnpj').mask('99.999.999/9999-99');
                    }

                    /*Exibe ou oculta os boxs*/
                    $j('.boxpj').hide();
                    $j('.boxpf').show();

                    /*Exibe ou oculta o entregar em outro endere�o conforme a selecao do tipo pessoa*/
                    $j('li.options').find("label:contains('Entregar')").css('visibility', 'visible');
                    $j('input[name*="[same_as_billing]"]').css('visibility', 'visible');

                }else if(queme == 'Juridica'){
                  /*juricica*/

                    /*Se existe o Taxvat alterna entre eles mudando o name conforme selecionado o tipo pessoa*/
                    if( existe != ''){
                        /*CADASTRO*/
                        $j('input[name="taxvat-old"]').attr('name', 'taxvat');
                        $j('input[name="taxvat"]:eq(0)').attr('name', 'taxvat-old');

                        $j('input[name="taxvat-old"]').attr('class', 'input-text');
                        $j('input[name="taxvat"]').attr('class', 'validar_cpfcnpj input-text');

                        /*BILLING*/
                        $j('input[name="billing[taxvat-old]"]').attr('name', 'billing[taxvat]');
                        $j('input[name="billing[taxvat]"]:eq(0)').attr('name', 'billing[taxvat-old]');

                        /*LIMPA CAMPOS*/
                        $j('input[name="taxvat"]').val('');
                        $j('input[name="billing[taxvat]"]').val('');

                        /*ADD CLASS TAXVAT*/
                        $j('input[name*="taxvat"]').attr('class', 'validar_cpfcnpj input-text');

                        // Mascaras
                        $j('input[name*="taxvat"]').unmask();
                        $j('input[name*="taxvat"]').mask('99.999.999/9999-99');
                        //$('#id_cnpj').mask('99.999.999/9999-99');

                    }else{
                        /*CADASTRO*/
                        $j('.inputcnpj').attr('name', 'cpfcnpj');
                        $j('.inputcpf').attr('name', 'NULL');

                        /*BILLING*/
                        $j('.Binputcnpj').attr('name', 'billing[cpfcnpj]'); /*CNPJ OK*/
                        $j('.Binputcpf').attr('name', 'NULL');              /*CPF NULL*/

                        /*LIMPA CAMPOS*/
                        $j('input[name="cpfcnpj"]').val('');
                        $j('input[name="billing[cpfcnpj]"]').val('');

                        // Mascaras
                        $j('input[name="cpfcnpj"]').unmask();
                        $j('input[name="billing[cpfcnpj]"]').unmask();
                        $j('input[name="cpfcnpj"]').mask('99.999.999/9999-99');
                        $j('input[name="billing[cpfcnpj]"]').mask('99.999.999/9999-99');
                        //$('#id_cnpj').mask('99.999.999/9999-99');

                    }

                    /*Exibe ou oculta os boxs*/
                    $j('.boxpj').show();
                    $j('.boxpf').hide();

                    /*Exibe ou oculta o entregar em outro endere�o conforme a selecao do tipo pessoa*/
                    $j('li.options').find("label:contains('Entregar')").css('visibility', 'hidden');
                    $j('input[name*="[same_as_billing]"]').css('visibility', 'hidden');
                }
            });
/*===================================================== End Click ===========================================================*/

            /*Faz o checkout do IE para isento*/
            $j('input[name*="isento"]').click( function(){

                if ($j(this).attr('checked')) {
                    $j('input[name*="ie"]').val("isento");
                    $j('input[name*="ie"]').css('background', '#DDDDDD');
                    //$j('input[name*="ie"]').attr('disabled', true);
                    $j('input[name*="ie"]').attr('readonly', 'readonly');
                } else {
                    $j('input[name*="ie"]').val('');
                    $j('input[name*="ie"]').css('background', '#FFFFFF');
                    //$j('input[name*="ie"]').removeAttr('disabled');
                    $j('input[name*="ie"]').removeAttr('readonly');
                }
            });

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

            $j('input').click( function(){
                    $j('html head').find('title').text(  "OSC: Finalizando compra no campo [ " + $j(this).attr('title') + " ]"  );
                    _gaq.push(['_trackPageview', '#' + $j(this).attr('name') + '']);
            });

            $j(':input').blur( function(){
                    pageTracker._trackEvent("OSC no campo: ", "input_exit", $j(this).attr('name'));
            });



        });




        /********************* Busca de CEP na base dos correios por Ajax *********************/
        /********************* Busca de CEP na base dos correios por Ajax *********************/
        /********************* Busca de CEP na base dos correios por Ajax *********************/


        function buscarEndereco(host, quale) {
            var prefix = "#"+ quale + "\\:",
                cep = $j(prefix+'postcode').val().replace(/[^0-9]+/g, '');
            if (cep.toString().length != 8) {
                return false;
            }
    			$j.ajax({
                    url: host + 'frontend/base/default/deivison/buscacep.php?cep=' + cep,
    				type:'GET',
    				dataType: 'html',
    				success:function(respostaCEP){
                        //alert(respostaCEP); //para testes

                        var obj = eval ("(" + respostaCEP + ")");

                        $j(prefix+'street1').val(obj.logradouro);
                        $j(prefix+'street4').val(obj.bairro);
                        $j(prefix+'city').val(obj.cidade);

                        $j('select[id*="'+quale+':region"]').children("option:contains('"+obj.uf_extenso+"')").attr('selected', 'selected');
                        $j('select[id*="'+quale+':region_id"]').val(obj.codigo);

                        if ($j('#billing\\:street1').is($j(document.activeElement)) && $j('#billing\\:street1').val() != ""){
                            setTimeout(function() { $j(prefix+'street2').focus(); }, 1);
                        }
                        checkout.update({
                            // 'review': 1
                            'shipping-method': 1
                        });

    				}
    			});

        };




        /********************* Valida CPF e CNPJ *********************/
        /********************* Valida CPF e CNPJ *********************/
        /********************* Valida CPF e CNPJ *********************/

    	// Adicionar classe de validacao de cpf e cnpj ao Taxvat
    	//$j('#billing:taxvat"]').addClassName('validar_cpf'); //removido e colocado na m�o

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




/*  deivison 02
    FUN��O QUE EXECUTA PASSO A PASSO DE ATUALIZA��O DOS CAMPOS PAYMENTS E REVIEW
    -------------------------------------------------------------------------------------------------------------------------------
    Essa fun��o foi feita para atualiza��o dos valores, caso haja desconto para pagamentos espec�ficos como 10% pagamento no boleto
    -------------------------------------------------------------------------------------------------------------------------------
    M�todos de atualia��o
    'payment-method': 1,    <- Atualiza os meios de pagamentos
    'shipping-method': 1,   <- Atualiza os m�todos de envio
    'review': 1             <- Atualiza o resumo da compra
*/

//Para atualizar caso tenha desconto no boleto
$j(function($) {
      $j('input[name*="payment[method]"]').live('click', function() {
              checkout.update({
                    // 'review': 1
                    //,'shipping-method': 1
                    'payment-method': 1
              });

             setTimeout(function(){
                        checkout.update({
                            'review': 1
                            //,'payment-method': 1
                        });
             }, 1000);

              $j('html head').find('title').text(  "OSC: Finalizando compra no campo [ " + $j(this).attr('name') + " ]"  );
              _gaq.push(['_trackPageview', '#' + $j(this).attr('name') + '']);
              pageTracker._trackEvent("OSC no campo: ", "input_exit", $j(this).attr('name'));
      });


      $j('input[name*="shipping_method"]').live('click', function() {
              checkout.update({
                    'review': 1
                    ,'payment-method': 1
                    //'shipping-method': 1
              });
              setTimeout(function(){
              checkout.update({
                'review': 1
                //,'payment-method': 1
                        });
             }, 500);

              $j('html head').find('title').text(  "OSC: Finalizando compra no campo [ " + $j(this).attr('value') + " ]"  );
              _gaq.push(['_trackPageview', '#' + $j(this).attr('value') + '']);
              pageTracker._trackEvent("OSC no campo: ", "input_exit", $j(this).attr('value'));
      });


      $j('#checkout-payment-method-load input').live('click', function() {
              $j('html head').find('title').text(  "OSC: Finalizando compra no campo [ " + $j(this).attr('name') + " ]"  );
              _gaq.push(['_trackPageview', '#' + $j(this).attr('name') + '']);
              pageTracker._trackEvent("OSC no campo: ", "input_exit", $j(this).attr('name'));

      });


});



