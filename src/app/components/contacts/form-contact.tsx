import {
  Button,
  Form, FormControl,
  FormGroup,
  FormLabel, FormText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from 'react-bootstrap'
import { ChangeEvent, useEffect, useState } from 'react'
import { useChangeSchedule } from '@/app/components/contacts/hooks/useContacts'

export interface FormData {
  id: number;
  name: string;
  email: string;
  scheduled_at: string;
}

interface FormContactsProps {
  show: boolean;
  handleClose: () => void;
  data: FormData
}

export function FormContact({ show, handleClose, data }: FormContactsProps) {
  const [formData, setFormData] = useState<{ scheduled_at: string }>({ scheduled_at: data.scheduled_at })
  const { loading, success, onClick } = useChangeSchedule(data.id, formData.scheduled_at)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ scheduled_at: e.target.value })

  useEffect(() => {
    if (success) {
      handleClose()
    }
  }, [success])

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Editar notificação</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Nome</FormLabel>
            <FormControl plaintext readOnly size="sm" defaultValue={data.name} />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Email</FormLabel>
            <FormControl plaintext readOnly size="sm" defaultValue={data.email} />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Data da notificação</FormLabel>
            <FormControl type="datetime-local" defaultValue={data.scheduled_at} onChange={onChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Fechar
        </Button>
        <Button variant="primary" onClick={onClick} disabled={loading}>
          {loading ? 'Salvando, aguarde...' : 'Salvar'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}