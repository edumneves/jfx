var BASE_URL = casper.cli.get('url');
casper.options.retryTimeout = 10;

phantom.page.injectJs( 'utils/adiciona_carrinho.js');

var CEP, rua, bairro, cidade, estado;
CEP = '20230014';
rua = 'RUA RIACHUELO';
bairro = 'Centro';
cidade = 'RIO DE JANEIRO';
estado = '502';

/*
var cepsDefinidos = [
    {cep:'20230014'},
    {key:"notes", sortable:true,resizeable:true},......
 */

// Preenche CEP
casper.waitForSelector("input[id='postcode']",
    function success() {
        this.test.info('Preenchendo CEP de envio');
        this.test.comment('Adicionando CEP ' );

        this.fill('form#shipping-zip-form', {
            'estimate_postcode': '20230014'
        }, true);

        this.test.comment('Calcular frete');
    },
    function fail() {
        this.test.assertExists("input[id='postcode']", "Não encontrou campo de CEP");
    });

// Verifica se carregou as opções de frete
casper.waitForSelector("button[title='Atualizar Total']",
    function success() {
        this.test.assertTextExists('Sedex', 'Encontrou frete Sedex');
        this.test.assertTextExists('PAC', 'Encontrou frete PAC');

        this.test.info('Selecionando PAC como frete e atualizando total');
        this.click('#s_method_pedroteixeira_correios_41106');
        this.test.comment('Clicando em atualizar total');
        this.click("button[title='Atualizar Total']");
    },
    function fail() {
        this.test.assertExists("button[title='Atualizar Total']", "Não carregou as opções de Frete");
    });

// Verifica se atualizou os valores com a opção de Frete
casper.waitForText("Embalagem e Entrega (Correios - PAC)",
    function success() {
        this.test.info('Valores atualizados');

    },
    function fail() {
        this.test.fail("Não Atualizou os valores");
    });

// Finalizando pedido
casper.waitForSelector("#btn-checkout",
    function success() {
        this.test.info('Clicando em Finalizar pedido');
        this.click("#btn-checkout");
    },
    function fail() {
        this.test.assertExists("#btn-checkout", "Não achou botão de finalizar pedido");
    });

//
casper.waitForUrl("http://localhost/jfx/onepagecheckout?cep=20230-014",
    function success() {
        this.test.info('Página de checkout carregada');

        this.test.comment('Testar se CEP é igual ao preenchido anteriormente');

        var sameAsBilling = this.evaluate(function() {
            return __utils__.getFieldValue('shipping[same_as_billing]');
        });
        this.test.comment("Mesmo endereço = " + sameAsBilling);

        var CEPBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[postcode]');
        });
        this.test.comment("CEP de cobrança = " + CEPBilling);

        var ruaBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[street][1]');
        });
        this.test.comment("Rua de cobrança = " + ruaBilling);
        this.test.assertEquals(ruaBilling, rua, 'Rua diferente da esperada.');

        var bairroBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[street][4]');
        });
        this.test.comment("Bairro de cobrança = " + bairroBilling);
        this.test.assertEquals(bairroBilling, bairro, 'Bairro diferente do esperado.');

        var cidadeBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[city]');
        });
        this.test.comment("Cidade de cobrança = " + cidadeBilling);
        this.test.assertEquals(cidadeBilling, cidade, 'Cidade diferente da esperada.');

        var estadoBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[region_id]');
        });
        this.test.comment("Estado de cobrança = " + estadoBilling);
        this.test.assertEquals(estadoBilling, estado, 'Estado diferente do esperado.');

    },
    function fail() {
        this.test.fail("Não carregou página de checkout");
    });






casper.run(function() {
    this.test.done();
});