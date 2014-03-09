var BASE_URL = casper.cli.get('url');

// Go to home
casper.test.comment('Go to home');
casper.start(BASE_URL, function() {
    this.test.pass('Home was loaded');
});

// Go to product list
casper.then(function() {
    casper.test.comment('Clica no Menu');
    this.click('a#mobnav-trigger');
    this.test.assertExists('.nav-2-1 a', 'Encontrei categoria Bandas');
    this.click('.nav-2-1 a');
});

// Go to product view
casper.then(function() {
    this.test.info('Current location is ' + this.getCurrentUrl());
    this.test.comment('Go to product view');
    this.test.assertExists('div.category-products li.item a.product-image', 'Found product view link');
    this.click('div.category-products li.item a.product-image');
});

// Select options and add product to cart
casper.then(function() {
    this.test.info('Current location is ' + this.getCurrentUrl());
    this.test.comment('Select options');
    var option1 = this.evaluate(function() {
        // Selecting first available gender, should be Mens
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
    var option2 = this.evaluate(function() {
        // Selecting first available size, should be 8
        document.querySelector('dd.last select.super-attribute-select').selectedIndex = 1;
        return true;
    });
    this.test.assert(option1 && option2, 'Selected options');
    // Adding product to cart
    this.test.comment('Add product to cart');
    this.click('button.btn-cart');
});

casper.then(function() {
    this.test.assertTextExists('was added to your shopping cart', 'Product was added');
    this.test.info('Current location is ' + this.getCurrentUrl());
});

casper.run(function() {
    this.test.done();
});