<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use App\User;

class AuthController extends Controller
{
    /**
    * Edit the name.
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function editName(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->get('newname');
        error_log($user->name);
        $user->save();

        return response()->json('Name Updated Successfully.');
    }

    /**
    * Edit the mail.
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function editEmail(Request $request, $id)
    {
        $user = Auth::user();

        $user->email = $request->get('newemail');

        $user->save();

        return response()->json('Name Updated Successfully.');
    }
}
