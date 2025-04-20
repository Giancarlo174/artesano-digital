import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Chaquiras',
      image: 'pulsera-chaquiras.webp',
      slug: 'chaquiras'
    },
    {
      id: 2,
      name: 'Sombreros',
      image: 'sombrero-pintao.webp',
      slug: 'sombreros'
    },
    {
      id: 3,
      name: 'Cutarras y Sandalias',
      image: 'cutarras-cuero.webp',
      slug: 'cutarras-sandalias'
    },
    {
      id: 4,
      name: 'Tembleques',
      image: 'tembleques-fiesta.webp',
      slug: 'tembleques'
    }
  ];

  // Track image load errors
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (categoryId) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };

  return (
    <CategoriesSection>
      <TitleContainer>
        <SectionTitle>Categorías</SectionTitle>
      </TitleContainer>
      
      <CategoriesContainer>
        {categories.map(category => (
          <CategoryItem key={category.id} to={`/categoria/${category.slug}`}>
            <CategoryImageWrapper>
              {imageErrors[category.id] ? (
                <FallbackImage categoryName={category.name} />
              ) : (
                <CategoryImage 
                  src={`https://guneqwgknfkxeywlrbga.supabase.co/storage/v1/object/public/imagenes-productos/${category.image}`}
                  alt={category.name}
                  onError={() => handleImageError(category.id)}
                />
              )}
            </CategoryImageWrapper>
            <CategoryName>{category.name}</CategoryName>
          </CategoryItem>
        ))}
      </CategoriesContainer>
    </CategoriesSection>
  );
};

// Local fallback image component instead of external service
const FallbackImage = ({ categoryName }) => (
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
      {categoryName}
    </text>
  </SVGPlaceholder>
);

const SVGPlaceholder = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 150 150',
  preserveAspectRatio: 'xMidYMid meet'
})`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const CategoriesSection = styled.section`
  background-color: #ffffff;
  padding: 0;
  width: 100%;
  max-width: 1800px; /* Increased max-width */
  margin: 0 auto 50px; /* Added bottom margin */
  
  
  `;
//   outline: 1px solid red;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2.5rem; /* Increased spacing */
  padding-left: 2rem;
  
  `;
//   outline: 1px solid red;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 9.5rem; /* Maintain your existing large gap */
  padding: 1.5rem; /* Increased padding */
  width: 90%; /* Width relative to parent */
  margin: 0 auto;
  
  /* Responsive adjustments */
  @media (max-width: 1600px) {
    gap: 8rem;
  }
  
  @media (max-width: 1400px) {
    gap: 7rem;
  }
  
  @media (max-width: 1200px) {
    gap: 5rem;
  }
  
  @media (max-width: 992px) {
    gap: 3.5rem;
  }
  
  @media (max-width: 768px) {
    gap: 2.5rem;
  }
  
  @media (max-width: 576px) {
    gap: 1.5rem;
    justify-content: space-around;
  }
`;

const CategoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryName = styled.span`
  font-size: 1rem;
  color: #333;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 500;
`;

export default Categories;
