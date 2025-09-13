const { evaluarCredito } = require('../domain/evaluarCredito');

describe('evaluarCredito', () => {
  
  test('devuelve "No aprobado" si existe mora activa', () => {
    const solicitud = {
      score: 780,
      moraActiva: true,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "No aprobado" cuando el score está por debajo de 600', () => {
    const solicitud = {
      score: 199,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  // Pruebas para reglas base: ingresosVerificados y dti
  test('devuelve "No aprobado" si los ingresos no están verificados y no es estudiante con garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "No aprobado" si el dti excede 35 y no es estudiante con garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "Aprobado" para estudiante con garante incluso sin ingresos verificados', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: true,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" para estudiante con garante aunque el dti sea superior a 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: true,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  // Pruebas para condiciones específicas de perfil: estudiante
  test('devuelve "Aprobado" para estudiante con garante y un score de 650 o superior', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: true,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "No aprobado" para estudiante con garante pero score inferior a 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: true,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "No aprobado" para estudiante sin garante aunque cumpla otros criterios', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });


  test('devuelve "Aprobado" para empleado con 6 o más meses de antigüedad y score de 650 o más', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "No aprobado" para empleado con menos de 6 meses de antigüedad', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 5,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "No aprobado" para empleado con score inferior a 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });


  test('devuelve "Aprobado" para independiente con 12 o más meses de antigüedad y score de 670 o más', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "No aprobado" para independiente con menos de 12 meses de antigüedad', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 11,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "No aprobado" para independiente con score inferior a 670', () => {
    const solicitud = {
      score: 669,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

 
  test('devuelve "Aprobado" para retirado con score de 640 o superior', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "No aprobado" para retirado con score inferior a 640', () => {
    const solicitud = {
      score: 639,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  
  test('devuelve "No aprobado" justo en el límite de score de 600', () => {
    const solicitud = {
      score: 600,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('No aprobado');
  });

  test('devuelve "Aprobado" para empleado justo en el límite de 6 meses de antigüedad', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" para independiente justo en el límite de 12 meses de antigüedad', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" para estudiante justo en el límite de score de 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante',
      garante: true,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" para retirado justo en el límite de score de 640', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" para independiente justo en el límite de score de 670', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });

  test('devuelve "Aprobado" justo en el límite de dti de 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 35,
      antiguedadMeses: 6,
      perfil: 'empleado',
      garante: false,
    };
    expect(evaluarCredito(solicitud)).toBe('Aprobado');
  });
});
