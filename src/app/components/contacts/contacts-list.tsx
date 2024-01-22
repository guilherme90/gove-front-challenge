import Table from 'react-bootstrap/Table'
import { Card, CardBody, CardTitle, CardText, CardFooter, Button, FormCheck } from 'react-bootstrap'
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { FormContact, FormData } from '@/app/components/contacts/form-contact'
import { useContacts } from '@/app/components/contacts/hooks/useContacts'
import Loading from '@/app/components/loading'
import Paginator from '@/app/components/paginator'
import FileUpload from '@/app/components/file-upload'

export default function ContactsList () {
  const [page, setPage] = useState<number>(1)
  const [contactsNotified, setContactsNotified] = useState<string>('off')
  const { contactsLoading, contacts } = useContacts(contactsNotified, page)

  const [show, setShow] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: '',
    email: '',
    scheduled_at: ''
  })

  const handleClose = (): void => setShow(false)
  const handleShow = (formData: FormData): void => {
    setFormData(formData)
    setShow(true)
  }

  const changePage = (page: number) => setPage(page)

  const onChangeContactsNotified = (e: ChangeEvent<HTMLInputElement>) => setContactsNotified(e.target.checked ? 'on' : 'off')

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <CardTitle>Upload</CardTitle>
          <CardText>
            <FileUpload />
          </CardText>
        </CardBody>
      </Card>

      <Card className="shadow mt-3">
        <CardBody>
          <CardTitle>Lista de contatos</CardTitle>
          <CardText>
            <Loading loading={contactsLoading} />

            <Card className="mb-4">
              <CardBody>
                <h6>Filtrar por contatos</h6>
                <FormCheck type="switch" label="Notificados" defaultValue={contactsNotified} onChange={onChangeContactsNotified} />
              </CardBody>
            </Card>


            {!contactsLoading && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Notificado</th>
                    <th>Data de notificação</th>
                  </tr>
                </thead>
                <tbody>
                {contacts?.data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Button variant="primary" size="sm"  onClick={
                        () => handleShow({ id: item.id, name: item.contact.name, email: item.contact.email, scheduled_at: item.scheduled_at })
                      }>Editar</Button>
                    </td>
                    <td>{item.contact.name}</td>
                    <td>{item.contact.email}</td>
                    <td>{item.notified ? 'Sim' : 'Não'}</td>
                    <td>{item.scheduled_at}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            )}
          </CardText>

          <CardFooter>
            {contacts?.data.length && (
              <Paginator
                current_page={contacts?.current_page}
                last_page={contacts?.last_page}
                per_page={contacts?.per_page}
                from={contacts?.from}
                to={contacts?.to}
                total={contacts?.total}
                changePage={changePage}
              />
            )}
          </CardFooter>
        </CardBody>
      </Card>

      <FormContact show={show} handleClose={handleClose} data={formData} />
    </>
  )
}