<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSgSplendidgroupProductionNews2 extends Migration
{
    public function up()
    {
        Schema::table('sg_splendidgroup_production_news', function($table)
        {
            $table->string('title')->change();
            $table->string('news_image')->change();
            $table->string('news_image_thumbnail')->change();
            $table->integer('sort_index')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('sg_splendidgroup_production_news', function($table)
        {
            $table->string('title', 191)->change();
            $table->string('news_image', 191)->change();
            $table->string('news_image_thumbnail', 191)->change();
            $table->integer('sort_index')->nullable(false)->change();
        });
    }
}
