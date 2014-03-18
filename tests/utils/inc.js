/**
 * Created by edumneves on 15/03/14.
 */


var BASE_URL = casper.cli.get('url');

casper.options.retryTimeout = 10;

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

var usuarios = [
    {login: 'edumneves@gmail.com', senha: '123456', nome: 'Eduardo', sobreNome: 'Neves', email: 'edumneves@gmail.com', cpf: '05853475657'}
];


casper.abrePaginaInicial = function abrePaginaInicial() {
    // Go to home
    this.test.comment('Abre a página inicial ' + BASE_URL);
    this.start(BASE_URL, function() {
        this.test.pass('Página inicial foi carregada');
    });

}

casper.abrePaginaProduto = function abrePaginaProduto() {
// Clica na categoria de bandas e camisas rock
    this.then(function() {
        this.test.comment('Clica no Menu');
        this.click('a#mobnav-trigger');
        this.test.assertExists('.nav-2-1 a', 'Encontrei categoria Bandas');
        this.test.comment('Clica na categoria Bandas');
        this.click('.nav-2-1 a');
    });

// Clica na página do primeiro produto
    this.then(function() {
        this.test.info('Página atual: ' + this.getCurrentUrl());
        this.test.comment('Abre o primeiro produto');
        this.test.assertExists('div.category-products li.item a.product-image', 'Encontrou primeiro produto');
        this.test.comment('Clica no primeiro produto');
        this.click('div.category-products li.item a.product-image');
        this.waitForSelector('select.super-attribute-select', function(){
            this.test.comment('Encontrou combo de tamanhos');
        });
    });
}

casper.selecionaPrimeiroTamanho = function(){
    this.then(function (){
        // Select options and add product to cart
        this.test.info('Página atual ' + this.getCurrentUrl());
        this.test.comment('Escolhe tamanhos');
        var option1 = this.evaluate(function() {
            // Selecionar primeiro tamanho permitido
            document.querySelector('select.super-attribute-select').selectedIndex = 1;
            return true;
        });
        // Firing onchange event to populate the second select box
        this.evaluate(function() {
            var element = document.querySelector('select.super-attribute-select');
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            element.dispatchEvent(evt);
        });
        this.test.assert(option1, 'Opção de tamanho selecionada');
    });
}

casper.adicionaCarrinho = function (){

    this.waitForSelector("button.btn-cart", function () {
        // Adding product to cart
        this.test.comment('Adicionar produto ao carrinho');
        this.click('button.btn-cart');

        this.waitForSelector("input[id='postcode']", function () {
            this.test.comment('Tela de carrinho carregou');
        });
    });
}

casper.preencheCEPCarrinho = function(cepDefinido){
    var CEP = cepDefinido.cep;
    // Preenche CEP
    casper.waitForSelector("input[id='postcode']",
        function success() {
            this.test.info('Preenchendo CEP de envio');
            this.test.comment('Adicionando CEP ' );

            this.fill('form#shipping-zip-form', {
                'estimate_postcode': CEP
            }, true);

            this.test.comment('Calcular frete');

            // Verifica se carregou as opções de frete
            this.waitForSelector("button[title='Atualizar Total']", function(){
                this.test.comment('Carregou as opções de frete');
            });
        },
        function fail() {
            this.test.assertExists("input[id='postcode']", "Não encontrou campo de CEP");
        });

}

casper.escolheFretePACCarrinho = function(){

    // Verifica se carregou as opções de frete
    this.waitForSelector("button[title='Atualizar Total']",
        function success() {
            this.test.assertTextExists('Sedex', 'Encontrou frete Sedex');
            this.test.assertTextExists('PAC', 'Encontrou frete PAC');

            this.test.info('Selecionando PAC como frete e atualizando total');
            this.click('#s_method_pedroteixeira_correios_41106');
            this.test.comment('Clicando em atualizar total');
            this.click("button[title='Atualizar Total']");

            // Verifica se atualizou os valores com a opção de Frete
            this.waitForText("Embalagem e Entrega (Correios - PAC)",
                function success() {
                    this.test.info('Valores atualizados');
                },
                function fail() {
                    this.test.fail("Não Atualizou os valores");
                });
        },
        function fail() {
            this.test.assertExists("button[title='Atualizar Total']", "Não carregou as opções de Frete");
        });
}

casper.finalizaPedidoCarrinho = function (){
    // Finalizando pedido
    this.waitForSelector("#btn-checkout",
        function success() {
            this.test.info('Clicando em Finalizar pedido');
            this.click("#btn-checkout");

            this.waitForUrl(/onepagecheckout\?cep/, function success() {
                this.test.info('Página de checkout carregada');
            },
            function fail() {
                this.test.assertExists("#btn-checkout", "Não achou botão de finalizar pedido");
            });
        });
}

casper.verificaEndereco = function (modo, cepDefinido) {
    // Espera o componente de cep
    this.waitForSelector('form#onepagecheckout_orderform input[name="' + modo + '[postcode]"]', function () {
        this.test.info("### Conferindo endereço de " + modo + " do CEP = " + cepDefinido.cep);

        var cepTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[postcode]');
        }, modo);
        this.test.comment("CEP de cobrança = " + cepTela);
        this.test.assertEquals(cepTela.toUpperCase(), cepDefinido.cep.toUpperCase(), 'CEP correto.');

        var ruaTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[street][1]');
        }, modo);
        this.test.comment("Rua de cobrança = " + ruaTela);
        this.test.assertEquals(ruaTela.toUpperCase(), cepDefinido.rua.toUpperCase(), 'Rua correta.');

        var bairroTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[street][4]');
        }, modo);
        this.test.comment("Bairro de cobrança = " + bairroTela);
        this.test.assertEquals(bairroTela.toUpperCase(), cepDefinido.bairro.toUpperCase(), 'Bairro correto.');

        var cidadeTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[city]');
        }, modo);
        this.test.comment("Cidade de cobrança = " + cidadeTela);
        this.test.assertEquals(cidadeTela.toUpperCase(), cepDefinido.cidade.toUpperCase(), 'Cidade correta.');

        var estadoTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[region_id]');
        }, modo);
        this.test.comment("Estado de cobrança = " + estadoTela);
        this.test.assertEquals(estadoTela.toUpperCase(), cepDefinido.estado.toUpperCase(), 'Estado correto.');
    });
}

casper.limpaEndereco = function (modo, cepDefinido){
    this.waitForSelector('form#onepagecheckout_orderform input[name="' + modo + '[postcode]"]', function () {
        // Verifica se tem algum valor preenchido
        var cepTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[postcode]');
        }, modo);
        var ruaTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[street][1]');
        }, modo);
        var bairroTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[street][4]');
        }, modo);
        var cidadeTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[city]');
        }, modo);
        var estadoTela = this.evaluate(function(modo) {
            return __utils__.getFieldValue(modo + '[region_id]');
        }, modo);

        // Limpa o formulário
        if ((cepTela != '') || (ruaTela != '') || (bairroTela != '') || (cidadeTela != '') || (estadoTela != '')){
            var values = {};
            values[modo + '[postcode]'] = '';
            values[modo + '[street][1]'] = '';
            values[modo + '[street][4]'] = '';
            values[modo + '[region_id]'] = '';
            values[modo + '[city]'] = '';

            this.fill('form#onepagecheckout_orderform', values, false);
        }

        this.waitForSelectorTextChange(modo + '[city]', function() {
            this.test.comment('Limpou o formulário!!');
        },function fail() {
        });
    });
}

casper.preencheEndereco = function (modo, cepDefinido){
    this.waitForSelector('form#onepagecheckout_orderform input[name="' + modo + '[postcode]"]', function () {

        var values = {};
        values[modo + '[postcode]'] = cepDefinido.cep.replace('-', '');
        this.fill('form#onepagecheckout_orderform', values, false);

        this.sendKeys('form#onepagecheckout_orderform input[name="' + modo + '[postcode]"]', cepDefinido.cep.replace('-', ''));

        this.waitFor(function check() {
            var cidadeTela = this.evaluate(function(modo) {
                return jQuery('input[name = "' + modo + '[city]"]').val();
            }, modo).toUpperCase();
            var cidadeEsperada = cepDefinido.cidade.toUpperCase();
            return cidadeTela == cidadeEsperada;
        }, function then() {
            this.verificaEndereco(modo, cepDefinido);
        }, function fail(){
            this.capture('nao_mudou_cidade.png');
            this.fail("Não mudou a cidade " + modo + " do CEP = " + cepDefinido.cep);
        });

    });
}


casper.abrePaginaLogin = function (){
    this.then(function(){
        this.waitForSelector('li a[title="Entrar"]', function () {
            // Adding product to cart
            this.test.comment('Clicando em entrar');
            this.click('li a[title="Entrar"]');

            this.waitForUrl(/customer\/account\/login/, function success() {
                this.test.info('Página de login carregada');
            },
            function fail() {
                this.test.assertExists("#btn-checkout", "Não achou botão de finalizar pedido");
            });

        });
    });
}

function testaLoginCerto (){
    return false;
}

casper.testaLoginSucesso = function (usuario){
    this.waitForText("Minha Conta", function success() {
        this.test.comment('Login feito com sucesso.');
        this.test.pass('Login feito com sucesso.');
        this.test.comment('Olá, ' + usuario.nome + ' ' + usuario.sobreNome);
        this.test.assertTextExists('Olá, ' + usuario.nome + ' ' + usuario.sobreNome, 'Testando saudação!');
    }, function fail (){
        this.test.comment('Login certo falhou.');
        this.fail('Login certo falhou.');
    });
}

casper.testaLoginFalhou = function (){
    this.waitForText("Login ou senha inválido(s).", function success() {
        this.test.comment('Login falhou.');
        this.test.pass('Login errado com sucesso.');
    }, function fail (){
        this.test.comment('Tentativa de Login errado falhou.');
        this.fail('Login errado falhou.');
    });

}


casper.fazLogin = function(usuario){
    this.waitForUrl(/customer\/account\/login/, function success() {
        this.waitForSelector('form#login-form', function(){
            this.test.comment('Encontrou campos de login');

            this.test.comment('Fazendo login para usuario: ' + usuario.login);
            this.fill('form#login-form', {
                'login[username]': usuario.login,
                'login[password]': usuario.senha
            }, true);

        });

    },
    function fail() {
        this.test.assertExists("#btn-checkout", "Não achou botão de finalizar pedido");
    });
}

casper.marcaMesmaEntrega = function (marca){
    this.waitForSelector('input[name="shipping[same_as_billing]"]', function () {
        var mesmaEntrega = this.evaluate(function () {
            return jQuery('input[name="shipping[same_as_billing]"]').prop('checked');
        });

        this.test.comment("Check de mesmo endereço de entrega = " + mesmaEntrega);

        // marca ou desmarca a checkbox
        if ((!marca && mesmaEntrega) || (marca && !mesmaEntrega)){
            this.test.comment("Clicando na checkbox de mesmo endereço de entrega");
            this.click('input[name="shipping[same_as_billing]"]');
        }

        // Espera até o endereço de entrega sumir ou aparecer
        if (!marca && mesmaEntrega) {
            this.waitUntilVisible('input[name="shipping[same_as_billing]"]', function(){
                this.test.comment("Endereço de entrega apareceu");
            });
        }
        else if (marca && !mesmaEntrega){
            this.waitWhileVisible('input[name="shipping[same_as_billing]"]', function(){
                this.test.comment("Endereço de entrega sumiu");
            },
                function fail() {
                });
        }
    });
}


