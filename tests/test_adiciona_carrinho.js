var BASE_URL = casper.cli.get('url');

phantom.page.injectJs( 'utils/adiciona_carrinho.js');

casper.run(function() {
    this.test.done();
});