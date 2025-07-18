import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ESTADOS, TIPO_ACTIVIDAD } from '../helpers/todoHelpers';

function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <Card className="m-2 shadow-sm border-0">
      <Card.Body>
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 8,
            color: ESTADOS[todo.estado]?.color,
            background: ESTADOS[todo.estado]?.background
        }}>
            <span style={{ marginRight: 6 }}>{ESTADOS[todo.estado]?.icon}</span>
            {ESTADOS[todo.estado]?.nombre}
        </div>
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: 10,
            fontSize: 13,
            color: '#555',
            background: '#f3f4f6',
            borderRadius: 8,
            padding: '2px 8px',
            marginBottom: 8,
        }}>
            <span style={{ marginRight: 6 }}>{TIPO_ACTIVIDAD[todo.tipoActividad]?.icon}</span>
            {TIPO_ACTIVIDAD[todo.tipoActividad]?.nombre}
        </div>
        <Card.Title>{todo.titulo}</Card.Title>
        <Card.Text>{todo.descripcion}</Card.Text>
        <Card.Text>
          <strong>Fecha Límite:</strong> {new Date(todo.fechaLimite).toISOString().split('T')[0]}
        </Card.Text>
        <Card.Text>
          <strong>Tipo Actividad:</strong> {TIPO_ACTIVIDAD[todo.tipoActividad]?.icon} {TIPO_ACTIVIDAD[todo.tipoActividad]?.nombre}
        </Card.Text>
        <Card.Text>
          <strong>Prioridad:</strong> {todo.prioridad}
        </Card.Text>
        <div className="d-flex justify-content-end gap-2">
          <Button 
            variant="primary" 
            onClick={onEdit}
          >
            Editar
          </Button>
          <Button 
            variant="danger" 
            onClick={onDelete}
          >
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TodoCard;
