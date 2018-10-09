<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSgSplendidgroupOfficeInfo extends Migration
{
    public function up()
    {
        Schema::table('sg_splendidgroup_office_info', function($table)
        {
            $table->text('office_image');
        });
    }
    
    public function down()
    {
        Schema::table('sg_splendidgroup_office_info', function($table)
        {
            $table->dropColumn('office_image');
        });
    }
}
