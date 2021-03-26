<?php
$col_x = 5;
$col_y = 5;
$col_z = 5;
$tool_x = array(1, 2, 0);
$tool_y = array(-1, 0, 2);
$tool_z = array(2, -2, 0);

function UseTool ($tool)
{
    $col_x += $tool[0];
    $col_y += $tool[1];
    $col_z += $tool[2];
}
$arr = array({-1,-1,-1,-1,-1})
for($i = 0; $i < count($arr); $i++)
{
    $rnd = rand(0, 3);
    switch($rnd)
    {
        case 0: ChechUse($tool_x, $i, $rnd); break;
        case 1: ChechUse($tool_y, $i, $rnd); break;
        case 2: ChechUse($tool_z, $i, $rnd); break;
    }
}
function ChechUse($tool, $index, $random)
{
    $check1 = $col_x + $tool[0] <= 10 && $col_x + $tool[0] >= 0;
    $check2 = $col_y + $tool[1] <= 10 && $col_y + $tool[1] >= 0;
    $check3 = $col_z + $tool[2] <= 10 && $col_z + $tool[2] >= 0;
    if($check1 && $check2 && $check3)
    {
        UseTool($tool);
        $arr[$index] = $random;
    }
}