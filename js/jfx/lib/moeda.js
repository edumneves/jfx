/**
 * Created by edumneves on 14/04/14.
 *
 *  Funções utilizadas para conversão de valores
 */

function numberParaReal(numero){
    var formatado = 'R$' + numero.toFixed(2).replace('.', ',');
    return formatado;
}

function realParaNumber(texto){
    var valor = parseFloat(texto.replace('R$', '').replace('.', '').replace(',', '.'));
    return valor;
}
