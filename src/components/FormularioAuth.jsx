import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'

function FormularioAuth({ titulo, error, enviando, textoBoton, onEnviar, pie, children }) {
  return (
    <Card className="auth-card card-resaltada mx-auto">
      <Card.Body className="p-4">
        <h2 className="h3 text-center mb-4">{titulo}</h2>
        <Form onSubmit={onEnviar} noValidate>
          {error && <Alert variant="warning" role="alert">{error}</Alert>}
          {children}
          <Button type="submit" className="w-100 rounded-pill mt-2" disabled={enviando}>
            {enviando && <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />}
            {textoBoton}
          </Button>
        </Form>
        <p className="small text-center text-body-secondary mt-4 mb-0">{pie}</p>
      </Card.Body>
    </Card>
  )
}

export default FormularioAuth
