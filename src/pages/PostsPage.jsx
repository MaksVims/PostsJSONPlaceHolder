import React, {Fragment} from "react";
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
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";

const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [postFormIsVisible, setPostFormIsVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const sortedAndSearchingPosts = useSortedAndSearchingPosts(posts, filter.query, filter.sort)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (page, limit) => {
    const response = await PostService.getPostsByPage(page, limit)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getTotal(totalCount, limit))
    setPosts(response.data)
  })

  useEffect(() => {
    fetchPosts(page, limit)
  }, [limit])

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
    <div className="posts">
      <MyButton onClick={() => setPostFormIsVisible(true)}>Создать пост</MyButton>
      <MyModal visible={postFormIsVisible} setVisible={setPostFormIsVisible}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostsFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        defaultValue="Количество постов"
        value={limit}
        onChange={limit => setLimit(limit)}
        options={[
          {value: 5, name: 5},
          {value: 10, name: 10},
          {value: 25, name: 25},
          {value: -1, name: "Все посты"},
        ]}
      />
      {postError && <h2 className="error">{postError.message}</h2>}
      {isPostsLoading
        ? <div className="loader__wrapper"><Loader/></div>
        :
        <Fragment>
          <PostsList posts={sortedAndSearchingPosts} remove={removePost}/>
          {totalPages > 1 && <Pagination page={page} changePage={changePage} totalPages={totalPages}/>}
        </Fragment>
      }
    </div>
  );
};

export default PostsPage;
