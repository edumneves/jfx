var BASE_URL = casper.cli.get('url');

casper.options.retryTimeout = 10;

var CEP, rua, bairro, cidade, estado;
CEP = '20230-014';
rua = 'RUA RIACHUELO';
bairro = 'Centro';
cidade = 'RIO DE JANEIRO';
estado = '502';

var cepsDefinidos = [
    {cep:'20230-014', rua:'RUA RIACHUELO', bairro:'Centro', cidade: 'RIO DE JANEIRO', estado: '502'},
    {cep:'36844-000', rua:'', bairro:'', cidade: 'TOMBOS', estado: '496'},
    {cep:'36010-030', rua:'RUA HENRIQUE SURERUS', bairro:'Centro', cidade: 'JUIZ DE FORA', estado: '496'},
    {cep:'32060-040', rua:'AVENIDA E', bairro:'Tupã', cidade: 'CONTAGEM', estado: '496'},
    {cep:'09530-120', rua:'RUA JOAQUIM NABUCO', bairro:'SANTO ANTÔNIO', cidade: 'SAO CAETANO DO SUL', estado: '508'},
    {cep:'03206-040', rua:'RUA BISPO EUGENIO DEMAZEMOD', bairro:'VILA ALPINA', cidade: 'SAO PAULO', estado: '508'},
    {cep:'11960-000', rua:'', bairro:'', cidade: 'ELDORADO', estado: '508'},
    {cep:'88990-000', rua:'', bairro:'', cidade: 'PRAIA GRANDE', estado: '507'},
    {cep:'29101-320', rua:'RUA JOSE PENNA MEDINA', bairro:'PRAIA DA COSTA', cidade: 'VILA VELHA', estado: '491'},
    {cep:'87660-000', rua:'', bairro:'', cidade: 'PARANACITY', estado: '499'},
    {cep:'99700-000', rua:'', bairro:'', cidade: 'ERECHIM', estado: '504'},
    {cep:'93310-050', rua:'RUA TEIXEIRA DE FREITAS', bairro:'RIO BRANCO', cidade: 'NOVO HAMBURGO', estado: '504'},
    {cep:'97010-490', rua:'RUA SILVA JARDIM', bairro:'NOSSA SENHORA DO ROSÁRIO', cidade: 'SANTA MARIA', estado: '504'},
    {cep:'68440-000', rua:'', bairro:'', cidade: 'ABAETETUBA', estado: '497'},
    {cep:'68506-000', rua:'QUADRA ZERO', bairro:'NOVA MARABÁ', cidade: 'MARABA', estado: '497'},
    {cep:'68506-000', rua:'QUADRA ZERO', bairro:'NOVA MARABÁ', cidade: 'MARABA', estado: '497'},
    {cep:'65710-000', rua:'', bairro:'', cidade: 'LAGO DO JUNCO', estado: '493'},
    {cep:'50020-050', rua:'RUA DA CONCORDIA', bairro:'SÃO JOSÉ', cidade: 'RECIFE', estado: '500'},
    {cep:'22220-060', rua:'RUA MACHADO DE ASSIS', bairro:'FLAMENGO', cidade: 'RIO DE JANEIRO', estado: '502'}
];

phantom.page.injectJs( 'utils/adiciona_carrinho.js');

// Preenche CEP
casper.waitForSelector("input[id='postcode']",
    function success() {
        this.test.info('Preenchendo CEP de envio');
        this.test.comment('Adicionando CEP ' );

        this.fill('form#shipping-zip-form', {
            'estimate_postcode': CEP
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
        this.test.assertEquals(ruaBilling.toUpperCase(), rua.toUpperCase(), 'Rua correta.');

        var bairroBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[street][4]');
        });
        this.test.comment("Bairro de cobrança = " + bairroBilling);
        this.test.assertEquals(bairroBilling.toUpperCase(), bairro.toUpperCase(), 'Bairro correto.');

        var cidadeBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[city]');
        });
        this.test.comment("Cidade de cobrança = " + cidadeBilling);
        this.test.assertEquals(cidadeBilling.toUpperCase(), cidade.toUpperCase(), 'Cidade correta.');

        var estadoBilling = this.evaluate(function() {
            return __utils__.getFieldValue('billing[region_id]');
        });
        this.test.comment("Estado de cobrança = " + estadoBilling);
        this.test.assertEquals(estadoBilling.toUpperCase(), estado.toUpperCase(), 'Estado correto.');

    },
    function fail() {
        this.test.fail("Não carregou página de checkout");
    });

casper.waitForSelector('form#onepagecheckout_orderform input[name="billing[postcode]"]',
    function success() {
        this.test.info('Testando o preenchimento de vários CEPS');

//        for (var i = 0; i < cepsDefinidos.length; i++) {
//        for (var i = 0; i < 2; i++) {

        this.eachThen(cepsDefinidos, function(response){
            var cepDefinido = response.data;

                this.echo("###### TESTANDO CEP " + cepDefinido.cep);

                this.fill('form#onepagecheckout_orderform', {
                    'billing[postcode]': '',
                    'billing[street][1]' : '',
                    'billing[street][4]' : '',
                    'billing[region_id]' : '',
                    'billing[city]' : ''

                }, false);


            this.waitForSelectorTextChange('billing[city]', function() {
                this.echo('Mudou a cidade!!');
            },function fail() {
                this.capture('Erro de não mudou a cidade' + cepDefinido.cep.replace('-', '') + '.png');
            });

            this.test.comment("Preenchendo CEP = " + cepDefinido.cep);

            this.fill('form#onepagecheckout_orderform', {
                'billing[postcode]': cepDefinido.cep.replace('-', '')
            }, false);

            this.waitFor(function check() {
                return this.evaluate(function() {
                    return jQuery('billing[city]').val() != '';
                });
            }, function then() {

                this.test.comment("Esperei pela cidade . CEP = " + cepDefinido.cep);
                this.capture('Cidade cep' + cepDefinido.cep.replace('-', '') + '.png');

                this.test.comment("Depois da espera da cidade CEP = " + cepDefinido.cep);

                this.capture('cep' + cepDefinido.cep.replace('-', '') + '.png');

                // confere os valores
                var sameAsBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('shipping[same_as_billing]');
                });
                this.test.comment("Mesmo endereço = " + sameAsBilling);

                var CEPBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('billing[postcode]');
                });
                this.test.comment("CEP de cobrança = " + CEPBilling);
                this.test.assertEquals(CEPBilling.toUpperCase(), cepDefinido.cep.toUpperCase(), 'CEP correto.');

                var ruaBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('billing[street][1]');
                });
                this.test.comment("Rua de cobrança = " + ruaBilling);
                this.test.assertEquals(ruaBilling.toUpperCase(), cepDefinido.rua.toUpperCase(), 'Rua correta.');

                var bairroBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('billing[street][4]');
                });
                this.test.comment("Bairro de cobrança = " + bairroBilling);
                this.test.assertEquals(bairroBilling.toUpperCase(), cepDefinido.bairro.toUpperCase(), 'Bairro correto.');

                var cidadeBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('billing[city]');
                });
                this.test.comment("Cidade de cobrança = " + cidadeBilling);
                this.test.assertEquals(cidadeBilling.toUpperCase(), cepDefinido.cidade.toUpperCase(), 'Cidade correta.');

                var estadoBilling = this.evaluate(function() {
                    return __utils__.getFieldValue('billing[region_id]');
                });
                this.test.comment("Estado de cobrança = " + estadoBilling);
                this.test.assertEquals(estadoBilling.toUpperCase(), cepDefinido.estado.toUpperCase(), 'Estado correto.');
            });

        });


    },
    function fail() {
        this.test.assertExists("#btn-checkout", "Não achou botão de finalizar pedido");
    });



casper.run(function() {
    this.test.done();
});