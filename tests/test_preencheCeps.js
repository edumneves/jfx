/**
 * Created by edumneves on 15/03/14.
 */

casper.test.info('Teste de preenchimento de vários CEPS');
casper.abrePaginaInicial();
casper.abrePaginaProduto();
casper.selecionaPrimeiroTamanho();
casper.adicionaCarrinho();
casper.preencheCEPCarrinho(cepsDefinidos[0]);
casper.escolheFretePACCarrinho();
casper.finalizaPedidoCarrinho();
casper.verificaEndereco('billing', cepsDefinidos[0]);

casper.eachThen(cepsDefinidos, function(response){
    var cepDefinido = response.data;
    this.limpaEndereco('billing', cepDefinido);
    this.preencheEndereco('billing', cepDefinido);
});

casper.run(function() {
    this.test.done();
});