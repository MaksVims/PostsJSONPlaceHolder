import {useMemo} from "react";


export const useSortedPosts = (posts, sort) => {
  return useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return posts
  }, [posts, sort])
}

export const useSortedAndSearchingPosts = (posts, query, sort) => {
  const sortedPosts = useSortedPosts(posts, sort)
  return useMemo(() => {
    return [...sortedPosts].filter(post => post.title.toLowerCase().trim().includes(query.toLowerCase().trim()))
  }, [sortedPosts, query])
}
