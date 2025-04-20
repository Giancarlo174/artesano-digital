import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Suspense, lazy } from 'react';

// Constants
import { API_BASE_URL, CATEGORIAS, PROMOCIONES, CAROUSEL_PRODUCTOS_FALLBACK } from '../../constants';

// Eager loaded components
import Categories from '../home/Categories';
import PromoSection from '../home/PromoSection';
import Banner from '../home/Banner';
import Benefits from '../home/Benefits';
import PopularProducts from '../home/PopularProducts';

// Lazy loaded components
const Carousel = lazy(() => import('../home/Carousel'));

const Home = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/productos`);
        
        if (response.data && response.data.data) {
          // Set carousel products - use featured products or fallback
          const featuredProducts = response.data.data.filter(producto => producto.destacado);
          setCarouselProducts(featuredProducts.length ? featuredProducts : CAROUSEL_PRODUCTOS_FALLBACK);
          
          // Set popular products
          const populares = response.data.data.filter(producto => producto.popular) || response.data.data.slice(0, 8);
          setPopularProducts(populares);
        } else {
          // If no data, use fallback data
          console.warn('No products found, using fallback data');
          setCarouselProducts(CAROUSEL_PRODUCTOS_FALLBACK);
          setPopularProducts(CAROUSEL_PRODUCTOS_FALLBACK);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Use fallback data in case of error
        setCarouselProducts(CAROUSEL_PRODUCTOS_FALLBACK);
        setPopularProducts(CAROUSEL_PRODUCTOS_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoize carousel products to prevent unnecessary re-renders
  const memoizedCarouselProducts = useMemo(() => carouselProducts, [carouselProducts]);

  return (
    <PageContainer>
      {/* Hero Section - Carrusel */}
      <Suspense fallback={<LoadingPlaceholder>Cargando carrusel...</LoadingPlaceholder>}>
        <Carousel productos={memoizedCarouselProducts} />
      </Suspense>

      {/* Sección de Categorías */}
      <Categories categorias={CATEGORIAS} />

      {/* Mini-sección promocional */}
      <PromoSection promociones={PROMOCIONES} />

      {/* Productos Populares */}
      <PopularProducts products={popularProducts} loading={loading} />

      {/* Banner - Convertirse en artesano */}
      <Banner />

      {/* Sección de beneficios */}
      <Benefits />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const LoadingPlaceholder = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3eee9;
  font-size: 1.2rem;
  color: #6F4E37;
`;

export default Home;