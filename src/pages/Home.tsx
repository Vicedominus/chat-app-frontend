import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/main');
  }, [user, navigate]);

  return (
    <div className="home-container">
      <h1>ChatApp</h1>
      <p>Una plataforma moderna y ultra-rápida de comunicación. Conéctate con tus amigos al instante.</p>
      <div className="button-group">
        <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        <button onClick={() => navigate('/register')} className="secondary-button">Registrarse</button>
      </div>
    </div>
  );
}
