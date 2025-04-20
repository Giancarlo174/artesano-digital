import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ productos }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [imageError, setImageError] = useState({});

  // Handle next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % productos.length);
  }, [productos.length]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((current) => (current - 1 + productos.length) % productos.length);
  }, [productos.length]);

  // Pause autoplay when manually navigating
  const handleNavigation = useCallback((direction) => {
    setAutoplayPaused(true);
    if (direction === 'next') nextSlide();
    else prevSlide();
    
    // Resume autoplay after 10 seconds
    setTimeout(() => {
      setAutoplayPaused(false);
    }, 50000);
  }, [nextSlide, prevSlide]);

  // Autoplay effect
  useEffect(() => {
    if (!autoplayPaused && productos.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoplayPaused, nextSlide, productos.length]);

  // Reset image errors when the component mounts or the productos array changes
  useEffect(() => {
    setImageError({});
  }, [productos]);

  // Safety check
  if (!productos || productos.length === 0) {
    return null;
  }

  // Get current product
  const currentProduct = productos[currentSlide];
  const productId = currentProduct.id_producto || currentProduct.id;
  
  // Correctly build the image URL - use 'imagenes-productos' bucket
  const imageUrl = currentProduct.imagen 
    ? `https://guneqwgknfkxeywlrbga.supabase.co/storage/v1/object/public/imagenes-productos/${currentProduct.imagen}`
    : null;
  
  return (
    <CarouselContainer>
      {/* Fixed text on the left side */}
      <TextSection>
        <CarouselHeading>
          DESCUBRE LA BELLEZA DE LAS<br />
          <BoldText>ARTESANÍAS DE PANAMÁ</BoldText>
        </CarouselHeading>
        
        <BuyButton 
          to={`/producto/${productId}`}
          aria-label={`Comprar ${currentProduct.nombre}`}
        >
          Comprar Ahora
        </BuyButton>
      </TextSection>

      {/* Product image on the right side */}
      <ImageSection>
        {imageError[productId] || !imageUrl ? (
          <PlaceholderWrapper>
            <NoImagePlaceholder>
              <span>Imagen no disponible</span>
            </NoImagePlaceholder>
          </PlaceholderWrapper>
        ) : (
          <ProductImage 
            src={imageUrl} 
            alt={currentProduct.nombre}
            onError={() => setImageError(prev => ({ ...prev, [productId]: true }))}
          />
        )}
      </ImageSection>

      {/* Navigation arrows */}
      <NavButtonLeft 
        onClick={() => handleNavigation('prev')}
        aria-label="Producto anterior"
      >
        <FaChevronLeft />
      </NavButtonLeft>
      
      <NavButtonRight 
        onClick={() => handleNavigation('next')}
        aria-label="Producto siguiente"
      >
        <FaChevronRight />
      </NavButtonRight>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  background-color: #f3eee9;
  display: flex;
  position: relative;
  height: 500px; /* Increased from previous height */
  width: 100%;
  max-width: 1800px; /* Increased max-width */
  margin: 0 auto 40px; /* Added bottom margin for separation */
  overflow: hidden;

  @media (max-width: 768px) {
    height: 550px;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3% 0 6%; /* Adjusted padding */
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    flex: 0 0 auto;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const CarouselHeading = styled.h1`
  font-size: 2.5rem;
  color: #333;
  line-height: 1.2;
  margin-bottom: 2rem;
    font-weight: 400;
  
  @media (max-width: 1024px) {
    font-size: 2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
  display: inline-block;
`;

const BuyButton = styled(Link)`
  background-color: #6F4E37;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  max-width: fit-content;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8a6142;
  }
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const ProductImage = styled.img`
  max-height: 90%;
  max-width: 90%;
  object-fit: contain;
  transition: opacity 0.5s ease;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7); /* Increased opacity for better visibility */
  color: #6F4E37; /* Darker brown color for contrast */
  border: none;
  border-radius: 50%;
  width: 48px; /* Increased size */
  height: 48px; /* Increased size */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20; /* Ensure arrows are above other elements */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  
  &:hover {
    background-color: #6F4E37;
    color: white;
  }
  
  svg {
    font-size: 20px; /* Larger icons */
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: 20px;
`;

const NavButtonRight = styled(NavButton)`
  right: 20px;
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  color: #888;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;

  span {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const PlaceholderWrapper = styled.div`
  max-height: 90%;
  max-width: 90%;
  width: 300px;
  height: 300px;
`;

export default Carousel;
