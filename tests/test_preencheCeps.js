/**
 * Created by edumneves on 15/03/14.
 */

casper.test.info('Teste de preenchimento de vários CEPS');
casper.inicioAteFinalizaCompra();

casper.verificaEndereco('billing', cepsDefinidos[0]);

// Mudando o timeout pois o clique do endereço está lento
casper.options.waitTimeout = 15000;
casper.marcaMesmaEntrega(false);
casper.options.waitTimeout = 10000;

// Testar o preenchimento de vários CEPs tanto no billing quanto no shipping
casper.eachThen(cepsDefinidos, function(response){
    var cepDefinido = response.data;
    this.limpaEndereco('shipping', cepDefinido);
    this.preencheEndereco('shipping', cepDefinido);

    // Testa um cep aleatório no billing
    var idCepBilling = Math.floor(Math.random()*cepsDefinidos.length);
    this.echo("Identificador aleatório = " + idCepBilling);
    this.limpaEndereco('billing', cepsDefinidos[idCepBilling]);
    this.preencheEndereco('billing', cepsDefinidos[idCepBilling]);
});

casper.run(function() {
    this.test.done();
});