import { useState } from 'react'

export default function usePaginator() {
  const [page, setPage] = useState<number>(1)

  return { page, setPage }
}