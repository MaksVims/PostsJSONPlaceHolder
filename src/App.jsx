import React, {Fragment, useEffect, useState} from 'react';
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import {useSortedAndSearchingPosts} from "./hooks/usePosts";
import PostsFilter from "./components/PostsFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import useFetching from "./hooks/useFetching";
import {getTotal} from "./utils/posts";
import Pagination from "./components/UI/pagination/Pagination";

const App = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [postFormIsVisible, setPostFormIsVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const sortedAndSearchingPosts = useSortedAndSearchingPosts(posts, filter.query, filter.sort)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (page, limit) => {
    const response = await PostService.getPostsByPage(page, limit)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getTotal(totalCount, limit))
    setPosts(response.data)
  })

  useEffect(() => {
    fetchPosts(page, limit)
  }, [])

  const createPost = post => {
    setPosts([...posts, post])
    setPostFormIsVisible(false)
  }
  const removePost = postToRemove => setPosts(posts.filter(post => post.id !== postToRemove.id))
  const changePage = page => {
    setPage(page)
    fetchPosts(page, limit)
  }

  return (
    <div className="app">
      <MyButton onClick={() => setPostFormIsVisible(true)}>Создать пост</MyButton>
      <MyModal visible={postFormIsVisible} setVisible={setPostFormIsVisible}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostsFilter filter={filter} setFilter={setFilter}/>
      {postError && <h2 className="error">{postError.message}</h2>}
      {isPostsLoading
        ? <div className="loader__wrapper"><Loader/></div>
        :
        <Fragment>
          <PostsList posts={sortedAndSearchingPosts} remove={removePost}/>
          <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </Fragment>
      }
    </div>
  );
};

export default App;
