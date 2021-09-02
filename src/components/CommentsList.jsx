import React from 'react';
import CommentItem from "./CommentItem";
import {TransitionGroup} from "react-transition-group";

const CommentsList = ({comments}) => {

  if (!comments.length) {
    return (<div><h2 className="title">Комментариев нет</h2></div>)
  }

  return (
    <div className="comments">
      <h2 className="title">Список комментариев</h2>
      <div className="comments__content">
        {comments.map(comment => (
          <CommentItem
            {...comment}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
