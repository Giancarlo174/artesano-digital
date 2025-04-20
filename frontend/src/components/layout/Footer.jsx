import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import logoImage from '../../assets/logo-artesano.png';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterBranding>
          <FooterLogoContainer>
            <FooterLogoImg src={logoImage} alt="Artesano Digital" />
          </FooterLogoContainer>
          <FooterBrandText>
            La mejor plataforma para comprar y vender artesanías panameñas.
          </FooterBrandText>
        </FooterBranding>
        
        <FooterColumn>
          <FooterTitle>Categorías</FooterTitle>
          <FooterLink to="/categoria/1">Chaquiras</FooterLink>
          <FooterLink to="/categoria/2">Sombreros</FooterLink>
          <FooterLink to="/categoria/3">Cutarras y Sandalias</FooterLink>
          <FooterLink to="/categoria/4">Tembleques</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Sobre nosotros</FooterTitle>
          <FooterLink to="/quienes-somos">Quiénes somos</FooterLink>
          <FooterLink to="/nuestra-historia">Nuestra historia</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Servicio al cliente</FooterTitle>
          <FooterLink to="/contacto">Contacto</FooterLink>
          <FooterLink to="/faq">Preguntas frecuentes</FooterLink>
          <FooterLink to="/terminos">Términos y condiciones</FooterLink>
        </FooterColumn>
        
        <FooterSubscribe>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterText>Suscríbete para recibir las últimas novedades</FooterText>
          <SubscribeForm onSubmit={(e) => e.preventDefault()}>
            <SubscribeInput 
              placeholder="Tu email" 
              aria-label="Email para suscripción"
              type="email"
              required
            />
            <SubscribeButton type="submit" aria-label="Suscribirse al newsletter">
              Suscribirse
              <FaArrowRight />
            </SubscribeButton>
          </SubscribeForm>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={24} />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} />
            </SocialLink>
            <SocialLink href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={24} />
            </SocialLink>
          </SocialLinks>
        </FooterSubscribe>
      </FooterContent>
      
      <FooterBottom>
        <FooterCopyright>
          © {new Date().getFullYear()} Artesano Digital. Todos los derechos reservados.
        </FooterCopyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #6F4E37;
  color: white;
  padding: 4rem 0 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    
    & > *:first-child {
      grid-column: 1 / -1;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.8rem;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    color: #ECB176;
  }
`;

const FooterBranding = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogoContainer = styled.div`
  margin-bottom: 1rem;
`;

const FooterLogoImg = styled.img`
  width: 100px;
  height: auto;
`;

const FooterBrandText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterSubscribe = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background-color: #ECB176;
    margin-top: 0.5rem;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SubscribeForm = styled.form`
  display: flex;
  margin-bottom: 1.5rem;
`;

const SubscribeInput = styled.input`
  padding: 0.7rem;
  border: none;
  border-radius: 4px 0 0 4px;
  flex-grow: 1;
  outline: none;
`;

const SubscribeButton = styled.button`
  background-color: #ECB176;
  color: #6F4E37;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #FED8B1;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ECB176;
    color: #6F4E37;
  }
`;

const FooterBottom = styled.div`
  margin-top: 4rem;
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterCopyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

export default Footer;
