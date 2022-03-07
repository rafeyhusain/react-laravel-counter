<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Carbon\Carbon;
use DateTime;
use App\Counter;

class CounterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $rows = Counter::orderBy('created_at', 'DESC')->take(1)->get();
            $value = 1;

            if (count($rows) == 0) {
                $this->new();
            } else {
                $row = $rows[0];
                $now = new DateTime(Carbon::now());
                $latest = new DateTime($row["created_at"]);
                $interval = $now->diff($latest);

                if($interval->days > 0) {
                    $this->new();
                } else {
                    $value = $row["value"] + 1;
                
                    $this->update($row, $value);
                }
            }

            return ['value' => $value];

        } catch (\Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    private function new() {
        $counter = new Counter;
        $counter->fill(['value' => 1, 'timestamp' => Carbon::now()->timestamp])->save();
    }

    private function update($counter, $value) {
        $counter->fill(['value' => $value])->save();
    }
}
