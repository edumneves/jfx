/**
 * Created by Edu on 11/01/14.
 */

//==============================================================================
// Casper generated Sat Jan 11 2014 12:13:18 GMT-0200 (Horário brasileiro de verão)
//==============================================================================

/*
var casper = require('casper').create();
 */

var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1920, height: 612};

var BASE_URL = casper.cli.get('url');
casper.start(BASE_URL);

var nomeCadastro = "teste" + Math.floor((Math.random()*10000)+1);

casper.waitForSelector(x("//a[normalize-space(text())='Cadastrar']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Cadastrar']"));
        this.click(x("//a[normalize-space(text())='Cadastrar']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Cadastrar']"));
    });
casper.waitForSelector("input[name='lastname']",
    function success() {
        this.sendKeys("input[name='lastname']", nomeCadastro);
    },
    function fail() {
        this.test.assertExists("input[name='lastname']");
    });
casper.waitForSelector("input[name='day']",
    function success() {
        this.sendKeys("input[name='day']", "09");
    },
    function fail() {
        this.test.assertExists("input[name='day']");
    });
casper.waitForSelector("input[name='month']",
    function success() {
        this.sendKeys("input[name='month']", "05");
    },
    function fail() {
        this.test.assertExists("input[name='month']");
    });
casper.waitForSelector("input[name='year']",
    function success() {
        this.sendKeys("input[name='year']", "1982");
    },
    function fail() {
        this.test.assertExists("input[name='year']");
    });
casper.waitForSelector("select[name='gender']",
    function success() {
        this.sendKeys("select[name='gender']", "m");
    },
    function fail() {
        this.test.assertExists("select[name='gender']");
    });

casper.waitForSelector("input[name='confirm_email']",
    function success() {
        this.sendKeys("input[name='confirm_email']", nomeCadastro+ "@teste.com");
    },
    function fail() {
        this.test.assertExists("input[name='confirm_email']");
    });
casper.waitForSelector("form#form-validate input[name='password']",
    function success() {
        this.test.assertExists("form#form-validate input[name='password']");
        this.click("form#form-validate input[name='password']");
    },
    function fail() {
        this.test.assertExists("form#form-validate input[name='password']");
    });
casper.waitForSelector("input[name='password']",
    function success() {
        this.sendKeys("input[name='password']", "123456");
    },
    function fail() {
        this.test.assertExists("input[name='password']");
    });
casper.waitForSelector("input[name='confirmation']",
    function success() {
        this.sendKeys("input[name='confirmation']", "123456");
    },
    function fail() {
        this.test.assertExists("input[name='confirmation']");
    });
casper.waitForSelector(".buttons-set button > span",
    function success() {
        this.test.assertExists(".buttons-set button > span");
        this.click(".buttons-set button > span");
    },
    function fail() {
        this.test.assertExists(".buttons-set button > span");
    });
// submit form
casper.waitForSelector(x("//a[normalize-space(text())='Minha Conta']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Minha Conta']"));
        this.click(x("//a[normalize-space(text())='Minha Conta']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Minha Conta']"));
    });
casper.waitForSelector(".hello strong",
    function success() {
        this.test.assertExists(".hello strong");
        this.click(".hello strong");
    },
    function fail() {
        this.test.assertExists(".hello strong");
    });
casper.waitForSelector(".hello strong",
    function success() {
        this.test.assertExists(".hello strong");
        this.click(".hello strong");
    },
    function fail() {
        this.test.assertExists(".hello strong");
    });
casper.waitForSelector(x("//*[contains(text(), 'teste6')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'teste6')]"));
    },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'teste6')]"));
    });
casper.waitForSelector(".hello strong",
    function success() {
        this.test.assertExists(".hello strong");
        this.click(".hello strong");
    },
    function fail() {
        this.test.assertExists(".hello strong");
    });
casper.waitForSelector(".hello strong",
    function success() {
        this.test.assertExists(".hello strong");
        this.click(".hello strong");
    },
    function fail() {
        this.test.assertExists(".hello strong");
    });
casper.waitForSelector(".hello",
    function success() {
        this.test.assertExists(".hello");
        this.click(".hello");
    },
    function fail() {
        this.test.assertExists(".hello");
    });
casper.waitForSelector(x("//*[contains(text(), 'teste6@teste.com')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'teste6@teste.com')]"));
    },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'teste6@teste.com')]"));
    });
casper.waitForSelector(x("//*[contains(text(), 'teste6 teste6')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'teste6 teste6')]"));
    },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'teste6 teste6')]"));
    });
casper.waitForSelector(x("//*[contains(text(), 'Olá, teste6 teste6!')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'Olá, teste6 teste6!')]"));
    },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'Olá, teste6 teste6!')]"));
    });
casper.waitForSelector(x("//a[normalize-space(text())='Sair']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Sair']"));
        this.click(x("//a[normalize-space(text())='Sair']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Sair']"));
    });
casper.then(function() {
    this.test.assertUrlMatch(/^http:\/\/localhost\/jfx\/index.php\/customer\/account\/logoutSuccess\/$/);
});

casper.run(function() {this.test.renderResults(true);});
