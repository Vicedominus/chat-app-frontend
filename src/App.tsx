import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>ChatApp</h1>
      <p>Una plataforma moderna y ultra-rápida de comunicación. Conéctate con tus amigos al instante utilizando tecnología de punta.</p>
      <button onClick={() => navigate('/login')}>Comenzar Ahora</button>
    </div>
  );
}

function Login() {
  return (
    <div className="home-container">
      <h2>Iniciar Sesión</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Próximamente: Integración con Django Backend.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Aquí agregaremos Register y las protecciones correspondientes para /chat */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
