<?php
$dados = file_get_contents('http://app:3000/produtos');
$dados = json_decode($dados, true);

foreach ($dados as $produtos) {
    echo $produtos['nome'] . ' - ' . $produtos['valor'] . '<br>';
}