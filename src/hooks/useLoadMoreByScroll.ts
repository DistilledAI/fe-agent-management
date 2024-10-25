import React, { useEffect } from "react"

const useLoadMoreByScroll = (
  elRef: React.RefObject<any>,
  loadMore: () => void,
  hasMore = false,
) => {
  const handleScroll = () => {
    if (elRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = elRef.current
      const isScrollBottom = scrollTop + clientHeight >= scrollHeight
      const isLoadMore = isScrollBottom && hasMore
      if (isLoadMore) loadMore()
    }
  }

  useEffect(() => {
    const element = elRef.current
    if (element) {
      element.addEventListener("scroll", handleScroll)
      return () => element.removeEventListener("scroll", handleScroll)
    }
  }, [hasMore])
}

export default useLoadMoreByScroll
