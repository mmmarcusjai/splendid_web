<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateSgSplendidgroupGlobalNews extends Migration
{
    public function up()
    {
        Schema::create('sg_splendidgroup_global_news', function($table)
        {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('title');
            $table->text('content');
            $table->string('news_image')->nullable();
            $table->string('news_image_thumbnail')->nullable();
            $table->string('news_category')->nullable();
            $table->integer('sort_order')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('sg_splendidgroup_global_news');
    }
}
