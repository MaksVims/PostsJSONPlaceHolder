import React, {useMemo} from 'react';
import {getArrayToNumber} from "../../../utils/posts";
import cl from './Pagination.module.css'

const Pagination = ({page, changePage, totalPages}) => {
  const arrayNumber = useMemo(() => {
    return getArrayToNumber(totalPages)
  }, [totalPages])

  return (
    <div className={cl.pagination}>
      {arrayNumber.map(number => (
        <span
          key={number}
          className={number === page ? `${cl.pagination__item} ${cl.current}` : cl.pagination__item}
          onClick={() => changePage(number)}
        >{number}</span>
      ))}
    </div>
  );
};

export default Pagination;
