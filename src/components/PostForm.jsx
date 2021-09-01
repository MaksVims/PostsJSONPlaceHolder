import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = e => {
    e.preventDefault()
    if (!post.title || !post.body) return
    create({...post, id: Date.now()})
    setPost({title: '', body: ''})
  }

  return (
    <form className="postForm">
      <MyInput
        type="text"
        placeholder="Название"
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
      />
      <MyInput
        type="text"
        placeholder="Описание"
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
      />
      <MyButton onClick={addNewPost}>Создать</MyButton>
    </form>
  );
};

export default PostForm;
