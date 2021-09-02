import {useEffect, useRef} from "react";

export default function useObserver(target, isLoading, canLoad, callback) {
  const observer = useRef()

  useEffect(() => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    const cb = function (entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(target.current)
  }, [isLoading])
}
