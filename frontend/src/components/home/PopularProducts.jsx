import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PopularProducts = ({ products = [], loading = false }) => {
  // Use example products if none are provided or loading
  const displayProducts = products.length > 0 ? products : [
    { id: 1, nombre: "Sombrero Ocueño", precio: 175.00, imagen: "sombrero-palma.webp" },
    { id: 2, nombre: "Cutarra sencilla", precio: 25.00, imagen: "cutarras-cuero.webp" },
    { id: 3, nombre: "Peineta con perlas", precio: 25.00, imagen: "diadema-floral.webp" },
    { id: 4, nombre: "Sombrero kimbol", precio: 153.00, imagen: "sombrero-pintao.webp" },
    { id: 5, nombre: "Tembleques", precio: 55.00, imagen: "tembleques-fiesta.webp" },
    { id: 6, nombre: "Chaquiras", precio: 47.50, imagen: "pulsera-chaquiras.webp" },
    { id: 7, nombre: "Sombrero Pintao", precio: 175.00, imagen: "sombrero-pintao.webp" },
    { id: 8, nombre: "Sandalia dorada", precio: 20.00, imagen: "sandalias-artesanales.webp" }
  ];

  return (
    <SectionContainer>
      <SectionTitle>Productos Populares</SectionTitle>
      
      <ProductsGrid>
        {displayProducts.map((product) => (
          <ProductCard key={product.id} to={`/producto/${product.id}`}>
            <ProductImageContainer>
              <ProductImage
                src={`https://guneqwgknfkxeywlrbga.supabase.co/storage/v1/object/public/imagenes-productos/${product.imagen}`}
                alt={product.nombre}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/placeholder-product.png`;
                }}
              />
            </ProductImageContainer>
            <ProductName>{product.nombre}</ProductName>
            <ProductPrice>${product.precio.toFixed(2)}</ProductPrice>
          </ProductCard>
        ))}
      </ProductsGrid>
      
      {loading && <LoadingMessage>Cargando productos...</LoadingMessage>}
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  background-color: #ffffff;
  padding: 0;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto 50px;
  
  `;
//   outline: 1px solid red;

const SectionTitle = styled.h2`
 display: flex;
  justify-content: flex-start;
  margin-bottom: 2.5rem; /* Increased spacing */
  padding-left: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  
  
  `;
//   outline: 1px solid red;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1600px;
  width: 94%;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }
`;

const ProductCard = styled(Link)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const ProductImageContainer = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 0.5rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: left;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: left;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export default PopularProducts;
