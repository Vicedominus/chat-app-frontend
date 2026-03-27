import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login/', {
        username,
        password,
      });
      loginUser(response.data, username);
      navigate('/main');
    } catch (err) {
      setError('Credenciales incorrectas o error en el servidor');
    }
  };

  return (
    <div className="home-container">
      <div className="form-card">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-text">{error}</p>}
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
          <button type="submit">Entrar</button>
        </form>
        <p className="mt-4 text-secondary">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
