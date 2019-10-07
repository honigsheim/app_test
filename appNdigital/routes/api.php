<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Auth Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LogoutController@logout');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('forgot-password', 'Auth\ForgotPasswordController@email');
    Route::post('password-reset', 'Auth\ResetPasswordController@reset');
});

// Resource Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1'
], function ($router) {

    Route::get('users', 'UserController@index');
    Route::post('destroy/user/{user}', 'UserController@destroy');
    Route::post('blacklist/user/{user}', 'UserController@blacklist');
    Route::post('search/users', 'UserController@searchUsers');
    Route::get('user/{id}', 'UserController@user');
    Route::post('post', 'PostController@store');
    Route::post('post/like', 'PostController@likes');
    Route::post('posts', 'PostController@index');
    Route::post('myposts', 'PostController@myPosts');
    Route::post('destroy/{post}', 'PostController@destroy');
    Route::post('getLikes', 'PostController@getLikes');
});

// Not Found
Route::fallback(function(){
    return response()->json(['message' => 'Resource not found.'], 404);
});
