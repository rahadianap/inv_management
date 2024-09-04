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
        Schema::create('products', function (Blueprint $table) {
            $table->string('product_code');
            $table->string('product_name');
            $table->string('category_id');
            $table->string('available_status');
            $table->string('product_description');
            $table->string('product_price');
            $table->string('product_photos');
            $table->string('special_type')->nullable();
            $table->boolean('is_taxable')->default(false);
            $table->string('barcode');
            $table->string('max_stock');
            $table->string('max_count');
            $table->string('product_weight');
            $table->boolean('is_sold_by_weight')->default(false);
            $table->string('selling_time_id');
            $table->string('supplier_id');
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('category_id')->references('category_code')->on('categories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('supplier_id')->references('supplier_code')->on('suppliers')->onUpdate('cascade')->onDelete('cascade');

            $table->primary('product_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
