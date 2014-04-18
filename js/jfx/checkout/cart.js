/**
 * Created by edumneves on 14/04/14.
 */
var $j = jQuery.noConflict();

$j(function(){
    $j('#shopping-cart-table input').bind('input', function (event){
        var numeros = /[^\d+]/g;

        // Não deixa inserir nada sem ser números nos campos de quantidade
        if (numeros.test(this.value)){
            this.value = parseInt(this.value.replace(numeros, ''));
            event.preventDefault();
        }

        if (this.value == '') {
            this.value = 0;
        }
/*

        // Pega o valor unitário
        var valorUnitario = realParaNumber($j(this).parent().prev().find('.price').text());

        //Calcula o valor total
        var valorTotal = valorUnitario * this.value;

        // preenche o valor total do item
        $j(this).parent().next().find('.price').text(numberParaReal(valorTotal));
*/
    });
});
