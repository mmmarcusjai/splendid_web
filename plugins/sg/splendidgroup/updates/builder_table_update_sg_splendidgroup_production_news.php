<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSgSplendidgroupProductionNews extends Migration
{
    public function up()
    {
        Schema::table('sg_splendidgroup_production_news', function($table)
        {
            $table->string('title');
            $table->text('content');
            $table->string('news_image');
            $table->string('news_image_thumbnail');
            $table->integer('sort_index');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->bigIncrements('id')->unsigned(false)->change();
        });
    }

    public function down()
    {
        Schema::table('sg_splendidgroup_production_news', function($table)
        {
            $table->dropColumn('title');
            $table->dropColumn('content');
            $table->dropColumn('news_image');
            $table->dropColumn('news_image_thumbnail');
            $table->dropColumn('sort_index');
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
            $table->dropColumn('deleted_at');
            $table->bigIncrements('id')->unsigned()->change();
        });
    }
}
