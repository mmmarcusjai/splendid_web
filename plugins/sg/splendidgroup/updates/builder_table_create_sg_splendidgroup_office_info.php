<?php namespace sg\SplendidGroup\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateSgSplendidgroupOfficeInfo extends Migration
{
    public function up()
    {
        Schema::create('sg_splendidgroup_office_info', function($table)
        {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('office_name');
            $table->text('office_address');
            $table->string('office_tel');
            $table->string('contact_email');
            $table->timestamp('deleted_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('sg_splendidgroup_office_info');
    }
}
