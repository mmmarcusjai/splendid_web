<?php

use sg\SplendidGroup\Models\GlobalNews;

Route::get('api/getNewsByPage/{type}/{cat}/{pageNo}', function($type, $cat, $pageNo) {
    $perpage = ($type == 'product') ? 6 : 3;
    $get_all = GlobalNews::getNewsByType($type, $cat)->paginate($perpage, $pageNo);

    return $get_all;
});
