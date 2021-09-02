import React from 'react';

const CommentItem = ({name, email, body}) => {
  return (
    <article className="comment">
      <h3 className="comment__name">Имя: {name}</h3>
      <p className="comment__email">Email: {email}</p>
      <p className="comment__content">{body}</p>
    </article>
  );
};

export default CommentItem;
