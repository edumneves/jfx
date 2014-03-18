/**
 * Created by edumneves on 15/03/14.
 */

casper.test.info('Teste de login com senha certa');
casper.abrePaginaInicial();
casper.abrePaginaLogin();
//casper.assert(true, casper.fazLogin(usuarios[0]));
casper.fazLogin(usuarios[0]);
casper.testaLoginSucesso(usuarios[0]);

casper.run(function() {
    this.test.done();
});