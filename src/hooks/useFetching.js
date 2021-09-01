import {useState} from "react";

export default function useFetching(callback) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetching = async (...args) => {
    try {
      setIsLoading(true)
      await callback(...args)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
