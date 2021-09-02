import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import CommentsList from "../components/CommentsList";
import Loader from "../components/UI/loader/Loader";

const SinglePostPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
    const post = await PostService.getPostById(id)
    setPost(post)
  })
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
    const comments = await PostService.getCommentsPostById(id)
    setComments(comments)
  })

  useEffect(() => {
    fetchPost(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div className="singlePost">
      <h1 className="title">Страница поста с id {params.id}</h1>
      {postError || commentsError && <h2 className="error">{postError?.message || commentsError?.message}</h2>}
      {isPostLoading
        ? <div className="loader__wrapper"><Loader/></div>
        : <article className="post">
          <div className="post__content">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </article>
      }
      {isCommentsLoading
        ? <div className="loader__wrapper"><Loader/></div>
        : <CommentsList comments={comments}/>
      }
    </div>
  );
};

export default SinglePostPage;
