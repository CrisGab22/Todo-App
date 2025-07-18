import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ESTADOS, TIPO_ACTIVIDAD, PRIORIDADES } from '../helpers/todoHelpers';

function getInitialState() {
    return {
        titulo: '',
        descripcion: '',
        prioridad: 'Baja',
        tipoActividad: 'Investigación',
        fechaLimite: new Date().toISOString().slice(0, 10),
        estado: 'Pendiente',
    };
}

const TodoForm = ({ show, handleClose, handleSave, todoToEdit }) => {
    const [form, setForm] = useState(getInitialState());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (todoToEdit) {
            setForm({
                titulo: todoToEdit.titulo,
                descripcion: todoToEdit.descripcion,
                prioridad: todoToEdit.prioridad,
                tipoActividad: todoToEdit.tipoActividad,
                fechaLimite: new Date(todoToEdit.fechaLimite).toISOString().slice(0, 10),
                estado: todoToEdit.estado,
                id: todoToEdit.id,
            });
        } else {
            setForm(getInitialState());
        }
        setErrors({});
    }, [todoToEdit, show]);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.titulo.trim()) newErrors.titulo = 'El título es obligatorio.';
        if (!form.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria.';
        if (!form.prioridad) newErrors.prioridad = 'La prioridad es obligatoria.';
        if (!form.tipoActividad) newErrors.tipoActividad = 'El tipo de actividad es obligatorio.';
        if (!form.estado) newErrors.estado = 'El estado es obligatorio.';
        if (!form.fechaLimite) newErrors.fechaLimite = 'La fecha límite es obligatoria.';
        else {
            const fechaSeleccionada = new Date(form.fechaLimite);
            const hoy = new Date();
            fechaSeleccionada.setHours(0,0,0,0);
            hoy.setHours(0,0,0,0);
            if (fechaSeleccionada < hoy) {
                newErrors.fechaLimite = 'La fecha límite no puede ser anterior a hoy.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSave(form);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{todoToEdit ? 'Editar tarea' : 'Crear nueva tarea'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            placeholder="Ingresa el título de la tarea"
                            value={form.titulo}
                            onChange={onChange}
                            autoFocus
                            isInvalid={!!errors.titulo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.titulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            placeholder="Ingresa una descripción"
                            value={form.descripcion}
                            onChange={onChange}
                            isInvalid={!!errors.descripcion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Select
                            name="prioridad"
                            value={form.prioridad}
                            onChange={onChange}
                            isInvalid={!!errors.prioridad}
                        >
                            {PRIORIDADES.map((p, i) => (
                                <option key={i} value={p}>{p}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.prioridad}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Actividad</Form.Label>
                        <Form.Select
                            name="tipoActividad"
                            value={form.tipoActividad}
                            onChange={onChange}
                            isInvalid={!!errors.tipoActividad}
                        >
                            {Object.entries(TIPO_ACTIVIDAD).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.icon} {value.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.tipoActividad}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha Límite</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaLimite"
                            value={form.fechaLimite}
                            onChange={onChange}
                            isInvalid={!!errors.fechaLimite}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fechaLimite}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            name="estado"
                            value={form.estado}
                            onChange={onChange}
                            isInvalid={!!errors.estado}
                        >
                            {Object.entries(ESTADOS).map((e, i) => (
                                <option key={i} value={e[1].nombre}>
                                    {e[1].icon} {e[1].nombre}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.estado}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    {todoToEdit ? 'Guardar' : 'Crear'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TodoForm;