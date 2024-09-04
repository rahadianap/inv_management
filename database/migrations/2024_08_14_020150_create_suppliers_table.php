<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->string('supplier_code');
            $table->string('supplier_name');
            $table->string('supplier_address');
            $table->string('supplier_phone');
            $table->integer('supplier_account_no');
            $table->enum('supplier_type', ['snack', 'buah', 'sayur', 'kue_basah']);
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();
            $table->softDeletes();

            $table->primary('supplier_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
