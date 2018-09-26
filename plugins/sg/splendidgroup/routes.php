<?php

use sg\SplendidGroup\Models\GlobalNews;

Route::get('api/getNewsByPage/{type}/{cat}/{pageNo}', function($type, $cat, $pageNo) {
    // $type = 'product';
    // $cat = 'solutions';
    // $page = '2';
    $get_all = GlobalNews::getNewsByType($type, $cat)->paginate(3, $pageNo);

    return $get_all;
});
//
// Route::get('api/getNewsByPage/{type}', function($type) {
//     return $type;
// });
