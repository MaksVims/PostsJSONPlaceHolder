import React, {Fragment} from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostsList = ({posts, remove}) => {
  return (
    <div className="posts">
      {posts.length
        ?
        <Fragment>
          <h2 className="title">Список постов</h2>
          <TransitionGroup>
            {posts.map((post, idx) => (
              <CSSTransition
                key={post.id}
                timeout={300}
                classNames="post"
              >
                <PostItem
                  post={post}
                  number={idx + 1}
                  remove={remove}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

        </Fragment>
        : <h2 className="title">Посты не найдены</h2>
      }
    </div>
  );
};

export default PostsList;
