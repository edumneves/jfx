<?php

ob_clean();
$t = $_GET['boleto'];
$im = imagecreate(450, 14);

$bg = imagecolorallocate($im, 255, 255, 255);
$textcolor = imagecolorallocate($im, 0, 0, 0);

imagestring($im, 5, 0, 0, "$t", $textcolor);

header("Content-type: image/png");
imagepng($im);

?>