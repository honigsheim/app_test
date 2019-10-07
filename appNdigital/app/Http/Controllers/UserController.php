<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        
            $users = User::all();
            return response()->json($users, 200);
    } 
    public function user($id)
    {

        $user = User::find($id);
        return response()->json($user, 200);
    } 
    public function searchUsers(Request $request)
    {
        
        $search = $request->odd;
        $users = User::where('name', 'like', '%'.$search.'%')
                            ->get();

        return response()->json($users, 200);
    }  
    public function blacklist($id)
    {
        error_log($id);
        $user = User::find($id);
        
        if($user->blacklist == 1)
        {
            $user->blacklist = 0; 
            $user->save();
        } else {
            $user->blacklist = 1; 
            $user->save();
        }        
    }  
    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        $user = User::find($id);
        $result = $user->delete();
        if($result == true){
            return response()->json('User Deleted Successfully.');
        } else{
            return response()->json('User has not been Deleted.');
        }
    } 
}
