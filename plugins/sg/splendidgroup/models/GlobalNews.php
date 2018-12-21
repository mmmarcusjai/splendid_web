<?php namespace sg\SplendidGroup\Models;

use Model;

/**
 * Model
 */
class GlobalNews extends Model
{
    use \October\Rain\Database\Traits\Validation;

    use \October\Rain\Database\Traits\SoftDelete;

    use \October\Rain\Database\Traits\Sortable;

    protected $dates = ['deleted_at'];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'sg_splendidgroup_global_news';

    public function scopeNewsCat($query, $cat)
    {
        return $query->where('news_category', $cat)->orWhere('news_category', 'share');
    }

    public static function getNewsByType($type, $cat)
    {
        // $type = product | company | all
        // $cat = productions | solutions...
        if($type == 'all') 
        {
            $query = GlobalNews::whereIn('news_category', [$cat, "share"])->orderBy('id', 'desc');
        }
        else 
        {
            $query = GlobalNews::where('news_type', $type)->whereIn('news_category', [$cat, "share"])->orderBy('id', 'desc');
        }
        
        $news = $query;

        return $news;
    }
}
