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
            <FormControl type="datetime-local" defaultValue={data.scheduled_at} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  )
}