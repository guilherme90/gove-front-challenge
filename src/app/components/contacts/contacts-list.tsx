import Table from 'react-bootstrap/Table'
import { Card, CardBody, CardTitle, CardText, CardFooter, Button } from 'react-bootstrap'
import { useState } from 'react'
import { FormContact, FormData } from '@/app/components/contacts/form-contact'
import useContactsPaginate from '@/app/components/contacts/hooks/useContactsPaginate'

export default function ContactsList () {
  const { contactsLoading, contacts } = useContactsPaginate()
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

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <CardTitle>Lista de contatos</CardTitle>
          <CardText>
            {contactsLoading && (
              <>Carregando...</>
            )}

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
            Fooe....
          </CardFooter>
        </CardBody>
      </Card>

      <FormContact show={show} handleClose={handleClose} data={formData} />
    </>
  )
}