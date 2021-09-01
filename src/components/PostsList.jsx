import React, {Fragment} from 'react';
import PostItem from "./PostItem";

const PostsList = ({posts, remove}) => {
  return (
    <div className="posts">
      {posts.length
        ?
        <Fragment>
          <h2 className="title">Список постов</h2>
          {posts.map((post, idx) => (
            <PostItem
              post={post}
              number={idx + 1}
              key={post.id}
              remove={remove}
            />
          ))}
        </Fragment>
        : <h2 className="title">Посты не найдены</h2>
      }
    </div>
  );
};

export default PostsList;
