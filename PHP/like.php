<?php

$handler = mysqli_connect("127.0.0.1", "root", "", "account");

$pid = mysqli_real_escape_string($handler, $_POST['commenter']);
$name = mysqli_real_escape_string($handler, $_POST['name']);
$selector = mysqli_real_escape_string($handler, $_POST['selector']);

$output = array();
$id_query = "SELECT id FROM useraccount WHERE username = '$name'";
$id_result = mysqli_query($handler, $id_query);
$id_first_row = mysqli_fetch_assoc($id_result);

$commenter_likes_query = "SELECT likes FROM comments WHERE commentid = '$pid'";
$commenter_likes_result = mysqli_query($handler, $commenter_likes_query);
$commenter_likes_first_row = mysqli_fetch_assoc($commenter_likes_result);


$commenter_dislikes_query = "SELECT dislikes FROM comments WHERE commentid = '$pid'";
$commenter_dislikes_result = mysqli_query($handler, $commenter_dislikes_query);
$commenter_dislikes_first_row = mysqli_fetch_assoc($commenter_dislikes_result);

if (!(empty($id_first_row['id']))){
    if ($selector == "1"){
        if(!(is_null($commenter_likes_first_row['likes']))){
            if (str_contains($commenter_likes_first_row['likes'],$id_first_row['id'])){
                $like_pos = strpos($commenter_likes_first_row['likes'],$id_first_row['id']);
                $like_part1 = substr($commenter_likes_first_row['likes'],0,$like_pos);
                $like_part2 = substr($commenter_likes_first_row['likes'],$like_pos+strlen($id_first_row['id'])+1);
                $like_final = $like_part1.$like_part2;
                if ($like_final == null){
                    $update_query = "UPDATE comments SET likes=null WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }else{
                    $update_query = "UPDATE comments SET likes='$like_final' WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }
                $dislike_final = $commenter_dislikes_first_row['dislikes'];
                // array_push($output,"1");
            }else{
                if (str_contains($commenter_dislikes_first_row['dislikes'],$id_first_row['id'])){
                    $dislike_pos = strpos($commenter_dislikes_first_row['dislikes'],$id_first_row['id']);
                    $dislike_part1 = substr($commenter_dislikes_first_row['dislikes'],0,$dislike_pos);
                    $dislike_part2 = substr($commenter_dislikes_first_row['dislikes'],$dislike_pos+strlen($id_first_row['id'])+1);
                    $dislike_final = $dislike_part1.$dislike_part2;
                    if ($dislike_final == null){
                        $update_query = "UPDATE comments SET dislikes=null WHERE commentid='$pid'";
                        mysqli_query($handler, $update_query);
                    }else{
                        $update_query = "UPDATE comments SET dislikes='$dislike_final' WHERE commentid='$pid'";
                        mysqli_query($handler, $update_query);
                    }
                }else{
                    $dislike_final = $commenter_dislikes_first_row['dislikes'];
                }
                $prelike_final = $commenter_likes_first_row['likes'];
                $like_final = $prelike_final . $id_first_row['id'] . ',';
                $like_query = "UPDATE comments SET likes='$like_final' WHERE commentid='$pid'";
                mysqli_query($handler, $like_query);
    
                // array_push($output,"2");
            }
        }else{
            if (str_contains($commenter_dislikes_first_row['dislikes'],$id_first_row['id'])){
                $dislike_pos = strpos($commenter_dislikes_first_row['dislikes'],$id_first_row['id']);
                $dislike_part1 = substr($commenter_dislikes_first_row['dislikes'],0,$dislike_pos);
                $dislike_part2 = substr($commenter_dislikes_first_row['dislikes'],$dislike_pos+strlen($id_first_row['id'])+1);
                $dislike_final = $dislike_part1.$dislike_part2;
                if ($dislike_final == null){
                    $update_query = "UPDATE comments SET dislikes=null WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }else{
                    $update_query = "UPDATE comments SET dislikes='$dislike_final' WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }
            }else{
                $dislike_final = $commenter_dislikes_first_row['dislikes'];
            }
            $like_final = $id_first_row['id'] . ',';
            $like_query = "UPDATE comments SET likes='$like_final' WHERE commentid='$pid'";
            mysqli_query($handler, $like_query);
            // array_push($output,"3");
        }
        $total_likes = count(explode(",", $like_final)) - 1;
        if ($total_likes == null){
            $total_likes = 0;
        }
        $total_dislikes = count(explode(",", $dislike_final)) - 1;
        if ($total_dislikes == null){
            $total_dislikes = 0;
        }
        array_push($output,$total_likes);
        array_push($output,$total_dislikes);
    
        echo json_encode($output);
    }else if ($selector == "2"){
        
        if(!(is_null($commenter_dislikes_first_row['dislikes']))){
            if (str_contains($commenter_dislikes_first_row['dislikes'],$id_first_row['id'])){
                $dislike_pos = strpos($commenter_dislikes_first_row['dislikes'],$id_first_row['id']);
                $dislike_part1 = substr($commenter_dislikes_first_row['dislikes'],0,$dislike_pos);
                $dislike_part2 = substr($commenter_dislikes_first_row['dislikes'],$dislike_pos+strlen($id_first_row['id'])+1);
                $dislike_final = $dislike_part1.$dislike_part2;
                if ($dislike_final == null){
                    $update_query = "UPDATE comments SET dislikes=null WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }else{
                    $update_query = "UPDATE comments SET dislikes='$dislike_final' WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }
                $like_final = $commenter_likes_first_row['likes'];
                // array_push($output,"1");
            }else{
                if (str_contains($commenter_likes_first_row['likes'],$id_first_row['id'])){
                    $like_pos = strpos($commenter_likes_first_row['likes'],$id_first_row['id']);
                    $like_part1 = substr($commenter_likes_first_row['likes'],0,$like_pos);
                    $like_part2 = substr($commenter_likes_first_row['likes'],$like_pos+strlen($id_first_row['id'])+1);
                    $like_final = $like_part1.$like_part2;
                    if ($like_final == null){
                        $update_query = "UPDATE comments SET likes=null WHERE commentid='$pid'";
                        mysqli_query($handler, $update_query);
                    }else{
                        $update_query = "UPDATE comments SET likes='$like_final' WHERE commentid='$pid'";
                        mysqli_query($handler, $update_query);
                    }
                }else{
                    $like_final = $commenter_likes_first_row['likes'];
                }
                $predislike_final = $commenter_dislikes_first_row['dislikes'];
                $dislike_final = $predislike_final . $id_first_row['id'] . ',';
                $dislike_query = "UPDATE comments SET dislikes='$dislike_final' WHERE commentid='$pid'";
                mysqli_query($handler, $dislike_query);
    
                // array_push($output,"2");
            }
        }else{
            if (str_contains($commenter_likes_first_row['likes'],$id_first_row['id'])){
                $like_pos = strpos($commenter_likes_first_row['likes'],$id_first_row['id']);
                $like_part1 = substr($commenter_likes_first_row['likes'],0,$like_pos);
                $like_part2 = substr($commenter_likes_first_row['likes'],$like_pos+strlen($id_first_row['id'])+1);
                $like_final = $like_part1.$like_part2;
                if ($like_final == null){
                    $update_query = "UPDATE comments SET likes=null WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }else{
                    $update_query = "UPDATE comments SET likes='$like_final' WHERE commentid='$pid'";
                    mysqli_query($handler, $update_query);
                }
            }else{
                $like_final = $commenter_likes_first_row['likes'];
            }
            $dislike_final = $id_first_row['id'] . ',';
            $dislike_query = "UPDATE comments SET dislikes='$dislike_final' WHERE commentid='$pid'";
            mysqli_query($handler, $dislike_query);
    
            // array_push($output,"3");
        }
        $total_likes = count(explode(",", $like_final)) - 1;
        if ($total_likes == null){
            $total_likes = 0;
        }
        $total_dislikes = count(explode(",", $dislike_final)) - 1;
        if ($total_dislikes == null){
            $total_dislikes = 0;
        }
        array_push($output,$total_likes);
        array_push($output,$total_dislikes);
    
        echo json_encode($output);
    }else{
        exit("Who are you?");
    }
}else{
    exit("Why you do this.");
}

?>