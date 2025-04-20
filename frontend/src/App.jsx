import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import './assets/styles/main.css';

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:id" element={<div>Página de categoría (en desarrollo)</div>} />
            <Route path="/producto/:id" element={<div>Página de producto (en desarrollo)</div>} />
            <Route path="/promocion/:id" element={<div>Página de promoción (en desarrollo)</div>} />
            <Route path="/quienes-somos" element={<div>Quiénes somos (en desarrollo)</div>} />
            <Route path="/nuestra-historia" element={<div>Nuestra historia (en desarrollo)</div>} />
            <Route path="/blog" element={<div>Blog (en desarrollo)</div>} />
            <Route path="/contacto" element={<div>Contacto (en desarrollo)</div>} />
            <Route path="/faq" element={<div>Preguntas frecuentes (en desarrollo)</div>} />
            <Route path="/terminos" element={<div>Términos y condiciones (en desarrollo)</div>} />
            <Route path="/registro" element={<div>Registro (en desarrollo)</div>} />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;
