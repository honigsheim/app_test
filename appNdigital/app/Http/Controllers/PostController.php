<?php
   
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\Post;
use App\Likes;
// require 'vendor/autoload.php';
// use \Mailjet\Resources;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $title = $request->title;
        if(isset($title)){

            $posts = Post::where('title', $title)->get();
            return response()->json($posts, 200);

        } else{
            $posts = Post::all();
            return response()->json($posts, 200);
        }
        // $response = $mj->post(Resources::$Email, ['body' => $body]);
        // $response->success() && var_dump($response->getData());
        
    }    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function likes(Request $request)
    {
    //     $comment_id = $request->comment_id;
    //     $user_id = $request->user_id;
    
        $like = 1;
        $getlikes = Likes::where('comment_id', $request->comment_id)->where('user_id', $request->user_id)->get();

        error_log($getlikes[0]['likes']);   

        if($getlikes === null){
            $likes = new Likes([
                'comment_id' => $request->get('comment_id'),
                'user_id' => $request->get('user_id'),
                'likes' => 1,
                ]);
            $likes->save();
        }
        elseif($getlikes[0]['likes'] == 1){
            Likes::where('user_id', $request->user_id)
            ->update(array('likes' => 0));

        } else {
            Likes::where('user_id', $request->user_id)
            ->update(array('likes' => 1));
        }

        // $l = User::where($request->get('user_id'), $id)->get();

        // $likes = new Likes([
        //     'comment_id' => $request->get('comment_id'),
        //     'user_id' => $request->get('user_id'),
        //     'likes' => $like,
        //     ]);
        // $likes->save();
        
        return response()->json(['success', 'like stored']);
    }
    public function getLikes(Request $request)
    {
        // error_log($request->user_id);
        $likes = Likes::all();
        // error_log($likes);
        return response()->json($likes, 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $body = $request->body;
        $title = $request->title;
        $user_name = $request->user_name;

    	$request->validate([
            'title'=>'required',
            'body'=>'required',
            'user_name' => 'required',
            'user_id' => 'required'
        ]);
    
        Post::create($request->all());
    
        return response()->json(['succes', 'comment stored']);
    }

    public function myPosts(Request $request)
    {
        $id = $request->user_id;
        $posts = Post::where('user_id', $id)->get();

        return response()->json($posts, 200);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        $post = Post::find($id);
        $result = $post->delete();
        if($result == true){
            return response()->json('Comment Deleted Successfully.');
        } else{
            return response()->json('Comment has not been Deleted.');
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    	$post = Post::find($id);
        return view('posts.show', compact('post'));
    }
}