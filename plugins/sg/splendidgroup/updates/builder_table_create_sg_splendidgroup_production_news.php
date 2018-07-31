<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateSgSplendidgroupProductionNews extends Migration
{
    public function up()
    {
        Schema::create('sg_splendidgroup_production_news', function($table)
        {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('sg_splendidgroup_production_news');
    }
}
