import React, { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import './Form.css';
import { evaluar } from './evaluar';

const Formcredito = () => {
  const [score, setScore] = useState('');
  const [moraActiva, setMoraActiva] = useState(false);
  const [ingresosVerificados, setIngresosVerificados] = useState(false);
  const [dti, setDti] = useState('');
  const [antiguedadMeses, setAntiguedadMeses] = useState('');
  const [perfil, setPerfil] = useState('estudiante');
  const [garante, setGarante] = useState(false);
  const [resultado, setResultado] = useState('');

  const handleSubmit = () => {
    if (!score || !dti || !antiguedadMeses) {
      alert('Por favor complete todos los campos numéricos.');
      return;
    }

    const solicitud = {
      score: parseInt(score),
      moraActiva,
      ingresosVerificados,
      dti: parseInt(dti),
      antiguedadMeses: parseInt(antiguedadMeses),
      perfil,
      garante,
    };

    const res = evaluar(solicitud);
    setResultado(res);
  };

  const handleReset = () => {
    setScore('');
    setMoraActiva(false);
    setIngresosVerificados(false);
    setDti('');
    setAntiguedadMeses('');
    setPerfil('estudiante');
    setGarante(false);
    setResultado('');
  };

  return (
    <>
      <h1 className="mb-4">Evaluación UnitTest JS</h1>
      <Form className="form-evaluar">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formScore">
              <Form.Label>Score Crediticio (300-900)</Form.Label>
              <Form.Control
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Ingrese el score"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDti">
              <Form.Label>DTI Porcentaje</Form.Label>
              <Form.Control
                type="number"
                value={dti}
                onChange={(e) => setDti(e.target.value)}
                placeholder="Ingrese el DTI"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAntiguedadMeses">
              <Form.Label>Meses de Antigüedad</Form.Label>
              <Form.Control
                type="number"
                value={antiguedadMeses}
                onChange={(e) => setAntiguedadMeses(e.target.value)}
                placeholder="Ingrese los meses"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPerfil">
              <Form.Label>Perfil</Form.Label>
              <Form.Control
                as="select"
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
              >
                <option value="estudiante">Estudiante</option>
                <option value="empleado">Empleado</option>
                <option value="independiente">Independiente</option>
                <option value="retirado">Retirado</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Check
              type="checkbox"
              label="Mora Activa"
              checked={moraActiva}
              onChange={(e) => setMoraActiva(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Ingresos Verificados"
              checked={ingresosVerificados}
              onChange={(e) => setIngresosVerificados(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Garante"
              checked={garante}
              onChange={(e) => setGarante(e.target.checked)}
            />
          </Col>
        </Row>

        <div className="button-group mb-3">
          <Button variant="secondary" onClick={handleReset} className="me-2">
            Limpiar Formulario
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Evaluar Solicitud
          </Button>
        </div>
      </Form>

      {resultado && (
        <Alert variant={resultado === 'Aprobado' ? 'success' : 'danger'}>
          <h4 className="mb-0">Resultado: {resultado}</h4>
        </Alert>
      )}
    </>
  );
};

export default Formcredito;
