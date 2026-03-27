import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Main() {
  const { user, authTokens, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (authTokens?.refreshToken) {
        await axios.post('/api/users/logout/', {
          refresh: authTokens.refreshToken
        }, {
          headers: {
            Authorization: `Bearer ${authTokens.accessToken}`
          }
        });
      }
    } catch (err) {
      console.error("Error logging out", err);
    } finally {
      logoutUser();
      navigate('/');
    }
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <h2>ChatApp Dashboard</h2>
        <div className="user-info">
          <span>Hola, <strong style={{color: 'var(--accent-color)'}}>{user?.username}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Salir</button>
        </div>
      </header>
      <main className="main-content">
        <div className="welcome-card">
          <h1>Página Principal</h1>
          <p>Has iniciado sesión exitosamente con JWT.</p>
          <div className="placeholder-chat">
            <em>Configura tus salas pronto...</em>
          </div>
        </div>
      </main>
    </div>
  );
}
