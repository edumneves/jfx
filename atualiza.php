<?php
/**
 * Created by PhpStorm.
 * User: edumneves
 * Date: 05/08/14
 * Time: 20:29
 */

// Conecta com banco de dados
$host = 'localhost:/Users/edumneves/REM.FDB';
$username = 'sysdba';
$password = 'masterkey';

$dbh = ibase_connect($host, $username, $password);
$stmt = "select CODIGO, cast(SALDO as integer) as SALDO FROM PRODUTO WHERE EMPRESA = '01' AND TIPO_PECA = 'CM' ORDER BY CODIGO";
$sth = ibase_query($dbh, $stmt);

// Conecta com o SOAP
$client = new SoapClient('http://jfxrockwear.com.br/test/api/soap/?wsdl');
$session = $client->login('edumneves', 'LO23we456');

$products = $client->call($session, 'catalog_product.list');

//echo "<br><br>";
   // echo "Produto = " . $products[0]['sku'] . "<br/>";
$listaProdutosSimples = array();
foreach( $products as $product ){

    //echo "Produto = " . $product['sku'] . " type = " . $product['type'] . "<br/>";
    if ($product['type'] == 'simple')
        $listaProdutosSimples[] = trim($product['sku']);
}

//echo "<br>";
$listaEstoque = array();
$stocks = $client->call($session, 'cataloginventory_stock_item.list', array($listaProdutosSimples));

//var_dump($listaProdutosSimples);
//echo "<br>";

foreach( $stocks as $stock){
    $index = trim($stock['sku']);
    $listaEstoque[$index] = (int)$stock['qty'];
}

//echo "Quantidade = " . $quant . "<br/>";

//var_dump($listaEstoque);

// Atualizando camisas
$quant = 0;
while ($row = ibase_fetch_object($sth)) {
    $codigo = trim($row->CODIGO);
    $saldo = trim($row->SALDO);

    echo "Codigo = " . $codigo . " -> ";
    echo "Saldo = " . $saldo . " -> ";
    if (array_key_exists($codigo, $listaEstoque)){

        if ($listaEstoque[$codigo] != $saldo){


            $stockItemData = array(
                'qty' => $saldo
                //    'qty' => '100',
                //    'is_in_stock ' => 1,
                //    'manage_stock ' => 1,
                //    'use_config_manage_stock' => 0,
                //    'min_qty' => 2,
                //    'use_config_min_qty ' => 0,
                //    'min_sale_qty' => 1,
                //    'use_config_min_sale_qty' => 0,
                //    'max_sale_qty' => 10,
                //    'use_config_max_sale_qty' => 0,
                //    'is_qty_decimal' => 0,
                //    'backorders' => 1,
                //    'use_config_backorders' => 0,
                //    'notify_stock_qty' => 10,
                //    'use_config_notify_stock_qty' => 0
            );

            $result = $client->call(
                $session,
                'product_stock.update',
                array(
                    $codigo,
                    $stockItemData
                )
            );
            echo "Atualizado <br/>";
            $quant++;

        } else
            echo "NÃO ATUALIZADO <br/>";
    } else {
        echo "NÃO ENCONTREI <br/>";
    }
}

echo "<br>" . $quant . " Registros atualizados<br>";
//var_dump($listaProdutosSimples);


ibase_free_result($sth);
ibase_close($dbh);

$client->endSession($session);

/*
 *


// If somestuff requires api authentification,
// then get a session token

$result = $client->call($session, 'catalog_product.info', 'CMMCU00032');
var_dump($result);

echo '<br> Vou atualizar<br/>';

$productId = 'CMMCU00032';
$stockItemData = array(
    'qty' => '50'
//    'qty' => '100',
//    'is_in_stock ' => 1,
//    'manage_stock ' => 1,
//    'use_config_manage_stock' => 0,
//    'min_qty' => 2,
//    'use_config_min_qty ' => 0,
//    'min_sale_qty' => 1,
//    'use_config_min_sale_qty' => 0,
//    'max_sale_qty' => 10,
//    'use_config_max_sale_qty' => 0,
//    'is_qty_decimal' => 0,
//    'backorders' => 1,
//    'use_config_backorders' => 0,
//    'notify_stock_qty' => 10,
//    'use_config_notify_stock_qty' => 0
);

$result = $client->call(
    $session,
    'product_stock.update',
    array(
        $productId,
        $stockItemData
    )
);

//echo 'Resultado <br/>';
//$result2 = $client->call($session, 'catalog_product.info', 'CMMCU00032');
//var_dump($result2);
//


// If you don't need the session anymore
$client->endSession($session);

*/