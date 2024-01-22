import { ChangeEvent, useState } from 'react'
import { post } from '@/app/utils/http'
import { Alert, Toast } from 'react-bootstrap'

export default function FileUpload() {
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)

  const onChangeGetFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files

    if (files && files.length) {
      await upload(files[0])
    }
  }

  const upload = async (file: File) => {
    setFileUploadLoading(true)
    setUploadError(null)

    const form = new FormData();
    form.append('file', file ?? '')

    try {
      await post('/contacts/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setFileUploadLoading(false)
      setUploadSuccess(true)
    } catch (e: Error | any) {
      setFileUploadLoading(false)
      setUploadError(e.message)
      console.log(e)
    }
  }

  return (
    <>
      {uploadError && (
        <Alert variant="danger" dismissible>
          {uploadError}
        </Alert>
      )}

      {uploadSuccess && (
        <Alert variant="success" dismissible>
          Arquivo enviado com sucesso.
        </Alert>
      )}

      <div className="mb-3">
        <label htmlFor="formFileSm" className="form-label">{fileUploadLoading ? 'Enviando...' : 'Selecione um arquivo CSV'}</label>
        <input type="file" className="form-control form-control-sm" onChange={onChangeGetFile} />
      </div>
    </>
  )
}