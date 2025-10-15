import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al sistema de gestión de contactos</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Información del Usuario</h3>
          <p><strong>Usuario:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
        </div>

        <div className="card">
          <h3>Acciones Rápidas</h3>
          <div className="action-links">
            <Link to="/contacts" className="action-link">
              Gestionar Contactos
            </Link>
            {isAdmin && (
              <Link to="/users" className="action-link">
                Gestionar Usuarios
              </Link>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="card">
            <h3>Panel de Administración</h3>
            <p>Como administrador, tienes acceso completo al sistema.</p>
            <ul>
              <li>Gestión de usuarios</li>
              <li>Creación de usuarios administradores</li>
              <li>Vista de todos los contactos del sistema</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
