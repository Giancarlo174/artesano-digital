import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PromoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  // Mock data for the two featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Collar de Chaquira",
      price: 20.00,
      image: "collar-panameno.webp",
      slug: "collar-chaquira"
    },
    {
      id: 2,
      name: "Sombrero Pintao",
      price: 65.00,
      image: "sombrero-pintao.webp",
      slug: "sombrero-pintao"
    },
    {
      id: 3,
      name: "Mola Kuna",
      price: 45.00,
      image: "faja-bordada.webp",
      slug: "mola-kuna"
    },
    {
      id: 4,
      name: "Tembleques",
      price: 35.00,
      image: "bolso-tejido.webp",
      slug: "tembleques"
    }
  ];

  const totalSlides = Math.ceil(featuredProducts.length / 2);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Handle image error
  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Calculate which products to show based on current index
  const startIndex = currentIndex * 2;
  const visibleProducts = featuredProducts.slice(
    startIndex, 
    Math.min(startIndex + 2, featuredProducts.length)
  );

  return (
    <SectionContainer>
      <SectionTitle>Más Vendidos</SectionTitle>
      
      <CarouselContainer>
        <NavButton onClick={prevSlide} aria-label="Anterior" className="left">
          <FaChevronLeft />
        </NavButton>
        
        <CardsContainer>
          {visibleProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>Desde ${product.price.toFixed(2)}</ProductPrice>
              <BuyButton to={`/producto/${product.slug}`}>
                Comprar Ahora
              </BuyButton>
              <ProductImageContainer>
                {imageErrors[product.id] ? (
                  <FallbackImage productName={product.name} />
                ) : (
                  <ProductImage 
                    src={`https://guneqwgknfkxeywlrbga.supabase.co/storage/v1/object/public/imagenes-productos/${product.image}`}
                    alt={product.name}
                    onError={() => handleImageError(product.id)}
                  />
                )}
              </ProductImageContainer>
            </ProductCard>
          ))}
        </CardsContainer>
        
        <NavButton onClick={nextSlide} aria-label="Siguiente" className="right">
          <FaChevronRight />
        </NavButton>
      </CarouselContainer>
    </SectionContainer>
  );
};

// Local fallback component
const FallbackImage = ({ productName }) => (
  <SVGPlaceholder>
    <rect width="100%" height="100%" fill="#f0f0f0" />
    <text 
      x="50%" 
      y="50%" 
      fontFamily="Arial" 
      fontSize="14" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fill="#888888"
    >
      {productName}
    </text>
  </SVGPlaceholder>
);

const SVGPlaceholder = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 150',
  preserveAspectRatio: 'xMidYMid meet'
})`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const SectionContainer = styled.section`
  background-color: #ffffff;
  padding: 0;
  width: 100%;
  max-width: 1800px; /* Increased max-width */
  margin: 0 auto 50px; /* Added bottom margin */

`;

const SectionTitle = styled.h2`
    display: flex;
  text-align: center;
  font-size: 2rem; /* Increased font size */
  color: #333;
  margin-bottom: 3rem; /* Increased spacing */
  font-weight: 600;
  justify-content: flex-start;
  padding-left: 2rem;

`;

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1600px; /* Increased max-width */
  width: 92%; /* Adjusted width */
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem; /* Increased gap */
  width: 100%;
  
  @media (max-width: 992px) {
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }
`;

const ProductCard = styled.div`
  background: #f3eee9;
  border-radius: 12px;
  padding: 1.8rem; /* Increased padding */
  width: 100%;
  max-width: 400px; /* Increased card size */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12); /* Enhanced shadow */
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  }
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const BuyButton = styled(Link)`
  background-color: #5c3b28;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: #7d5038;
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 220px; /* Increased height */
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3eee9;
  color: #5c3b28;
  border: none;
  border-radius: 50%;
  width: 48px; /* Increased size */
  height: 48px; /* Increased size */
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; /* Ensure arrows appear above other elements */
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  
  &:hover {
    background-color: #5c3b28;
    color: white;
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
  
  svg {
    font-size: 20px; /* Larger icons */
  }
  
  @media (max-width: 768px) {
    top: calc(50% - 40px);
  }
`;

export default PromoSection;
