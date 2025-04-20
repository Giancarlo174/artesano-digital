import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import logoImage from '../../assets/logo-artesano.png';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link to="/">
            <LogoImg src={logoImage} alt="Artesano Digital" />
          </Link>
        </LogoContainer>

        <NavAndSearchContainer>
          <SearchContainer>
            <SearchInput placeholder="¿Qué estás buscando?" aria-label="Buscar productos" />
            <SearchButton aria-label="Buscar">
              <FaSearch />
            </SearchButton>
          </SearchContainer>
          
          <NavLinks>
            <NavItem to="/">Inicio</NavItem>
            <NavItem to="/categorias">Categorías</NavItem>
            <NavItem to="/nosotros">Sobre nosotros</NavItem>
            <NavItem to="/servicio">Servicio al cliente</NavItem>
            <NavItem to="/vender">Vender</NavItem>
          </NavLinks>
        </NavAndSearchContainer>
          
        <HeaderActions>
          <LoginButton aria-label="Iniciar sesión">
            <FaUser />
            <span>Iniciar sesión</span>
          </LoginButton>
          <CartButton aria-label="Ver carrito">
            <FaShoppingCart />
            <CartCount>0</CartCount>
          </CartButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #6F4E37;
  color: #FFFFFF;
  width: 100%;
  padding: 0.6rem 0;
  position: relative;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: -1rem;
  margin-bottom: -1rem;
  
  @media (max-width: 992px) {
    margin-bottom: 0;
    width: 100%;
  }
`;

const LogoImg = styled.img`
  height: 150px;
  width: auto;
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    height: 120px;
  }
  
  @media (max-width: 480px) {
    height: 90px;
  }
`;

const NavAndSearchContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 6px;
  height: 40px;
  padding: 0 0 0 15px;
  max-width: 600px;
  width: 100%;
  margin: 0 20px;

  @media (max-width: 768px) {
    order: 3;
    margin: 10px 0 0;
    width: 100%;
    max-width: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between; /* Change from space-around to space-between */
  width: 100%; /* Match the width of the search bar container */
  max-width: 600px; /* Adjust this to match your search bar width */
  margin: 0 auto; /* Center the nav links */
  margin-top: 0.8rem;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 70px;
    left: 0;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0;
  
  @media (max-width: 992px) {
    width: 100%;
    justify-content: center;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
  color: #333;
  
  &::placeholder {
    color: #888;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  cursor: pointer;  
  padding: 13px;
  font-size: 1.1rem;
  background-color: #ecb176;
  box-sizing: border-box;
  margin: 0;
  height: 100%; 

  &:hover {
    background-color: #FED8B1;
  }
`;


const LoginButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 480px) {
    span {
      display: none;
    }
  }

  &:hover {
    background-color: #A67B5B;
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;

  
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ECB176;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export default Header;
