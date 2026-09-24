<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('armadas', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        $used = [];
        $rows = DB::table('armadas')->orderBy('id')->get();

        foreach ($rows as $row) {
            $base = Str::slug($row->name) ?: 'armada';
            $slug = $base;
            $counter = 2;

            while (isset($used[$slug]) || DB::table('armadas')->where('slug', $slug)->where('id', '!=', $row->id)->exists()) {
                $slug = $base.'-'.$counter;
                $counter++;
            }

            $used[$slug] = true;

            DB::table('armadas')->where('id', $row->id)->update(['slug' => $slug]);
        }

        Schema::table('armadas', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('armadas', function (Blueprint $table) {
            $table->dropUnique('armadas_slug_unique');
            $table->dropColumn('slug');
        });
    }
};
