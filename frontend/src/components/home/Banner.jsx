import React from 'react';
import styled from 'styled-components';
// Import the image directly
import sombreroBackground from '../../assets/sombrero-artesano.png';

const Banner = () => {
  return (
    <BannerContainer>
      <BannerTitle>Conviértete en artesano</BannerTitle>
      <BannerText>
            Comparte tu pasión por las artesanías y vende tus productos en nuestra plataforma
      </BannerText>
      <BannerButton href="/registro-artesano">Convertirse en Artesano</BannerButton>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  background-color:rgb(81, 57, 38);
  padding: 5rem 6%;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  
  /* Use the imported image instead of a URL path */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${sombreroBackground});
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const BannerTitle = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 2rem;
  max-width: 500px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BannerButton = styled.a`
  background-color: #513926;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px hsla(0, 0.00%, 0.00%, 0.30);
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    background-color: #41301f;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

export default Banner;
