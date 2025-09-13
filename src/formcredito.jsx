import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import './Form.css';

const Formcredito = ({ onEvaluar }) => {
  const [score, setScore] = useState('');
  const [moraActiva, setMoraActiva] = useState(false);
  const [ingresosVerificados, setIngresosVerificados] = useState(false);
  const [dti, setDti] = useState('');
  const [antiguedadMeses, setAntiguedadMeses] = useState('');
  const [perfil, setPerfil] = useState('estudiante');
  const [garante, setGarante] = useState(false);

  const handleSubmit = () => {
    const solicitud = {
      score: parseInt(score, 10),
      moraActiva,
      ingresosVerificados,
      dti: parseInt(dti, 10),
      antiguedadMeses: parseInt(antiguedadMeses, 10),
      perfil,
      garante,
    };
    onEvaluar(solicitud);
  };

  const handleReset = () => {
    setScore('');
    setMoraActiva(false);
    setIngresosVerificados(false);
    setDti('');
    setAntiguedadMeses('');
    setPerfil('estudiante');
    setGarante(false);
  };

  return (
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
              className="input-form"
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
              className="input-form"
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
              className="input-form"
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
              className="input-form"
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
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Mora Activa"
            checked={moraActiva}
            onChange={(e) => setMoraActiva(e.target.checked)}
            className="checkbox-form"
          />
        </Col>
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Ingresos Verificados"
            checked={ingresosVerificados}
            onChange={(e) => setIngresosVerificados(e.target.checked)}
            className="checkbox-form"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Garante"
            checked={garante}
            onChange={(e) => setGarante(e.target.checked)}
            className="checkbox-form"
          />
        </Col>
      </Row>

      <div className="button-group">
        <Button variant="secondary" onClick={handleReset} className="btn-reset">
          Limpiar Formulario
        </Button>
        <Button variant="primary" onClick={handleSubmit} className="btn-submit">
          Evaluar Solicitud
        </Button>
      </div>
    </Form>
  );
};

export default Formcredito;
