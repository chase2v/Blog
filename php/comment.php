<?php
$post = $_POST;
// echo $comment;

$init_content = file_get_contents('../data/comment.json');
$content = json_decode($init_content);
$amount = $content->amount;
$content->name[$amount] = $post['name'];
$content->content[$amount] = $post['comment'];
$content->amount ++;
$end_content = json_encode($content);
file_put_contents('../data/comment.json',$end_content);

echo $end_content;
?>