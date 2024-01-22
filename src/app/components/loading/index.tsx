import { Spinner } from 'react-bootstrap'

interface Props {
  loading: boolean
}

export default function Loading ({ loading }: Props) {
  return (
    <div className="text-center">
      {loading && <Spinner animation="grow" variant="info" />}
    </div>
  )
}