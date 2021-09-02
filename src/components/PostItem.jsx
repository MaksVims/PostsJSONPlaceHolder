import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useHistory} from "react-router-dom";

const PostItem = ({post, number, remove}) => {
  const router = useHistory()

  return (
    <article className="post">
      <div className="post__content">
        <h3>{number}. {post.title}</h3>
        <p>{post.body}</p>
      </div>
      <div className="post__control">
        <MyButton onClick={() => router.push(`/posts/${post.id}`)}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </article>
  );
};

export default PostItem;
