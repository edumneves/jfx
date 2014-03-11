var BASE_URL = casper.cli.get('url');

// Go to home
casper.test.comment('Abre a página inicial');
casper.start(BASE_URL, function() {
    this.test.pass('Página inicial foi carregada');
});

// Go to product list
casper.then(function() {
    casper.test.comment('Clica no Menu');
    this.click('a#mobnav-trigger');
    this.test.assertExists('.nav-2-1 a', 'Encontrei categoria Bandas');
    casper.test.comment('Clica na categoria Bandas');
    this.click('.nav-2-1 a');
});

// Go to product view
casper.then(function() {
    this.test.info('Página atual: ' + this.getCurrentUrl());
    this.test.comment('Abre o primeiro produto');
    this.test.assertExists('div.category-products li.item a.product-image', 'Encontrou primeiro produto');
    this.test.comment('Clica no primeiro produto');
    this.click('div.category-products li.item a.product-image');
});

// Select options and add product to cart
casper.then(function() {
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
    // Adding product to cart
    this.test.comment('Adicionar produto ao carrinho');
    this.click('button.btn-cart');
});

casper.then(function() {

});
