import { Pagination } from 'react-bootstrap'
import usePaginator from '@/app/components/paginator/hooks'

interface PaginatorProps {
  current_page: number;
  last_page: number;
  per_page: number;

  to: number;
  from: number;
  total: number;

  changePage: (page: number) => void
}

export default function Paginator ({ current_page, last_page, per_page, from, to, total, changePage }: PaginatorProps) {
  const items = Array.from({length: 10}, (_, i) => i + 1)

  return (
    <>
      <Pagination size="sm">
        <Pagination.First onClick={() => changePage(1)} />

        <Pagination.Prev />

        {items.map((i) => (
          <Pagination.Item disabled={current_page === i} key={i} onClick={() => changePage(i)}>{i}</Pagination.Item>
        ))}

        <Pagination.Next active={current_page > to} onClick={() => changePage(current_page + 1)} />

        <Pagination.Last onClick={() => changePage(last_page)} />
      </Pagination>
    </>
  )
}