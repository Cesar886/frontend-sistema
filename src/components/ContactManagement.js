import React, { useState, useEffect } from 'react';
import { contactsAPI } from '../services/api';
import ContactForm from './ContactForm';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error('Error cargando contactos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      try {
        await contactsAPI.delete(id);
        loadContacts();
      } catch (error) {
        console.error('Error eliminando contacto:', error);
      }
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingContact(null);
    loadContacts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading) {
    return <div>Cargando contactos...</div>;
  }

  if (showForm) {
    return (
      <ContactForm
        contact={editingContact}
        onSave={handleFormSave}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Gestión de Contactos</h2>
        <button onClick={handleCreate}>Nuevo Contacto</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{contact.address}</td>
              <td>{contact.gender}</td>
              <td className="actions">
                <button onClick={() => handleEdit(contact)}>Editar</button>
                <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {contacts.length === 0 && (
        <p>No hay contactos registrados.</p>
      )}
    </div>
  );
};

export default ContactManagement;
