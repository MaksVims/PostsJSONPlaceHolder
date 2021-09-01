import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostsFilter = ({filter, setFilter}) => {

  return (
    <div className="posts__filter">
      <MyInput
        placeholder="Поиск..."
        type="text"
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect
        defaultValue="Сортировка"
        value={filter.sort}
        onChange={sort => setFilter({...filter, sort})}
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По содержанию'},
        ]}
      />
    </div>
  );
};

export default PostsFilter;
