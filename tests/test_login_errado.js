/**
 * Created by edumneves on 15/03/14.
 */

casper.test.info('Teste de login com senha errada');
casper.abrePaginaInicial();
casper.abrePaginaLogin();
casper.then (function (){
        var usuario = usuarios[0];
        usuario.senha = "senha errada";
        casper.fazLogin(usuario);
        this.testaLoginFalhou();
    }
);

casper.run(function() {
    this.test.done();
});