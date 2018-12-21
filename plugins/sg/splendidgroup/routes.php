<?php

use sg\SplendidGroup\Models\GlobalNews;
use sg\SplendidGroup\Models\OfficeInfo;

//Get news by page
Route::get('api/getNewsByPage/{type}/{cat}/{pageNo}', function($type, $cat, $pageNo) {
    switch($cat) {
        case 'solutions' :
            $perpage = ($type == 'product') ? 6 : 3;    
        break;
        default :
            $perpage = 10;
            // $perpage = 5;
        break;
    }
    $get_all = GlobalNews::getNewsByType($type, $cat)->paginate($perpage, $pageNo);

    return $get_all;
});

// Get office detail
Route::get('api/getOfficeDetail', function() {
    $office_list = OfficeInfo::all();

    return $office_list;
});