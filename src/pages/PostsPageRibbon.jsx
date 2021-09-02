import React, {useRef} from "react";
import {useEffect, useState} from "react";
import {getTotal} from "../utils/posts";
import PostService from "../API/PostService";
import {useSortedAndSearchingPosts} from "../hooks/usePosts";
import useFetching from "../hooks/useFetching";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostsFilter from "../components/PostsFilter";
import Loader from "../components/UI/loader/Loader";
import PostsList from "../components/PostsList";
import useObserver from "../hooks/useObserver";


const PostsPageRibbon = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [postFormIsVisible, setPostFormIsVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const targetObserve = useRef()
  const sortedAndSearchingPosts = useSortedAndSearchingPosts(posts, filter.query, filter.sort)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (page, limit) => {
    const response = await PostService.getPostsByPage(page, limit)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getTotal(totalCount, limit))
    setPosts([...posts, ...response.data])
  })
  useObserver(targetObserve, isPostsLoading, page < totalPages, () => setPage(page + 1))

  useEffect(() => {
    fetchPosts(page, limit)
  }, [page])

  const createPost = post => {
    setPosts([...posts, post])
    setPostFormIsVisible(false)
  }
  const removePost = postToRemove => setPosts(posts.filter(post => post.id !== postToRemove.id))

  return (
    <div className="posts">
      <MyButton onClick={() => setPostFormIsVisible(true)}>Создать пост</MyButton>
      <MyModal visible={postFormIsVisible} setVisible={setPostFormIsVisible}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostsFilter filter={filter} setFilter={setFilter}/>
      {postError && <h2 className="error">{postError.message}</h2>}
      <PostsList posts={sortedAndSearchingPosts} remove={removePost}/>
      {isPostsLoading && <div className="loader__wrapper"><Loader/></div>}
      <div ref={targetObserve} style={{height: 20}}></div>
    </div>
  );
};

export default PostsPageRibbon;
