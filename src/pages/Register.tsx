import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register/', {
        username,
        password,
      });
      setSuccess('Usuario creado exitosamente. Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      if (err.response?.data) {
        const errorMsg = Object.values(err.response.data).flat().join('. ');
        setError(errorMsg || 'Error al crear usuario. Verifica los datos.');
      } else {
        setError('Error al crear usuario. Verifica la conexión con el servidor.');
      }
    }
  };

  return (
    <div className="home-container">
      <div className="form-card">
        <h2>Registrarse</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Crear Cuenta</button>
        </form>
        <p className="mt-4 text-secondary">
          ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
