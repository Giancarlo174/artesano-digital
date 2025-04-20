// API configuration
export const API_BASE_URL = 'http://localhost:3000';
export const SUPABASE_URL = 'https://guneqwgknfkxeywlrbga.supabase.co';
export const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`;

// Supabase storage buckets
export const BUCKET_PRODUCTOS = 'imagenes-productos';

// Fallback data for carousel
export const CAROUSEL_PRODUCTOS_FALLBACK = [
  {
    id_producto: 1,
    nombre: 'Sombrero Pintao',
    descripcion: 'Sombrero tradicional panameño hecho a mano',
    precio: 89.99,
    imagen: 'sombrero-pintao.webp',
    stock: 10
  },
  {
    id_producto: 2,
    nombre: 'Mola Kuna',
    descripcion: 'Textil tradicional de la etnia Kuna de Panamá',
    precio: 45.99,
    imagen: 'mola-kuna.webp',
    stock: 15
  },
  {
    id_producto: 3,
    nombre: 'Collar de Chaquiras',
    descripcion: 'Collar tradicional indígena hecho con chaquiras',
    precio: 35.50,
    imagen: 'chaquiras-collar.webp',
    stock: 8
  }
];

export const CATEGORIAS = [
  { id: 1, nombre: 'Chaquiras', imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/chaquiras.webp` },
  { id: 2, nombre: 'Sombreros', imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/sombrero-palma.webp` },
  { id: 3, nombre: 'Cutarras y Sandalias', imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/cutarra.webp` },
  { id: 4, nombre: 'Tembleques', imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/tembleque.webp` },
];

export const PROMOCIONES = [
  { id: 1, nombre: 'Collares de chaquira', precio: 45.99, imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/chaquiras-collar.webp` },
  { id: 2, nombre: 'Peinetas artesanales', precio: 89.99, imagen: `${SUPABASE_STORAGE_URL}/imagenes-productos/peineta.webp` },
];
