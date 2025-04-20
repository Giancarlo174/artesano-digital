# 🧵 Artesano Digital - Plataforma de Comercio Electrónico

## 📄 Descripción General

**Artesano Digital** es una plataforma de comercio electrónico diseñada para promover y facilitar la venta de **artesanías panameñas**. Conecta directamente a artesanos locales con compradores, brindando herramientas para registrar productos, gestionar ventas y explorar el catálogo con una experiencia moderna e intuitiva.

---

## 🏗️ Arquitectura del Sistema

El proyecto está basado en una arquitectura **cliente-servidor**, con los siguientes componentes clave:

- **Frontend**: Aplicación React con `Styled Components` para estilizado.
- **Backend**: API RESTful desarrollada con **Node.js** y **Express**.
- **Base de Datos**: Supabase (PostgreSQL gestionado).
- **Autenticación**: Simulada con JWT en la versión actual.

---

## 📁 Estructura de Directorios

```
artesano/
├── frontend/                  # Aplicación React
│   └── src/
│       ├── assets/           # Imágenes, estilos, etc.
│       ├── components/       # Componentes reutilizables
│       ├── constants/        # Constantes y configuración
│       └── ...               # Otros recursos (hooks, pages, etc.)
├── backend/                  # API de Node.js
│   ├── API/                  # Rutas definidas
│   ├── controllers/          # Lógica de negocio
│   ├── middlewares/          # Middlewares: auth, manejo de errores
│   ├── models/               # Modelos de datos (usuario, producto)
│   ├── services/             # Servicios externos, conexión con Supabase
│   ├── utils/                # Funciones auxiliares
│   └── server.js             # Archivo principal del servidor
└── README.md                 # Documentación del proyecto
```

---

## 🎨 Frontend

### 🛠️ Tecnologías Utilizadas

- **React** – UI moderna basada en componentes.
- **Styled Components** – CSS-in-JS para encapsular estilos.
- **React Router** – Navegación entre rutas.
- **Axios** – Cliente HTTP para consumir la API.

### 📑 Estructura de Páginas y Componentes

#### 📄 Páginas

- **Home** – Página de inicio con secciones promocionales y productos.

#### 🧩 Componentes

- **Header** – Barra de navegación con logo, buscador y enlaces.
- **Footer** – Pie de página con créditos y enlaces útiles.
- **Carousel** – Carrusel de productos destacados.
- **Categories** – Visualización de categorías con íconos o imágenes.
- **PromoSection** – Tarjetas destacadas de promoción.
- **PopularProducts** – Grid con productos populares.
- **Banner** – Invitación a registrarse como artesano.
- **Benefits** – Lista de beneficios de usar la plataforma.

### ⚙️ Funcionalidades y Optimización

- **Lazy loading** para mejorar carga de componentes pesados.
- **Suspense y placeholders** mientras se carga el contenido.
- **useMemo** para memorizar cálculos y evitar renders innecesarios.
- Responsive design adaptado a móviles y escritorios.
- Paleta visual en tonos tierra, con estilo cultural y artesanal.

---

## 🔧 Backend

### 🛠️ Tecnologías

- **Node.js** – Motor de ejecución del backend.
- **Express** – Framework para construir la API REST.
- **Supabase** – Base de datos PostgreSQL gestionada.
- **Express Validator** – Validación y sanitización de datos.

### 📡 API RESTful

#### 🔐 Endpoints de Usuarios

```
http
POST   /api/usuarios/registro       # Registro de nuevos usuarios
POST   /api/usuarios/login          # Autenticación (simulada)
GET    /api/usuarios/perfil         # Perfil del usuario logueado
PUT    /api/usuarios/perfil         # Actualizar datos del usuario
GET    /api/usuarios                # Listar usuarios (admin)
GET    /api/usuarios/:id            # Obtener usuario por ID (admin)
PUT    /api/usuarios/:id            # Actualizar usuario (admin)
DELETE /api/usuarios/:id            # Eliminar usuario (admin)
```

#### 🛒 Endpoints de Productos

```
http
GET    /api/productos               # Listar todos los productos
GET    /api/productos/activos       # Solo productos activos
GET    /api/productos/tienda/:id    # Productos por tienda específica
GET    /api/productos/:id           # Detalles de un producto
POST   /api/productos               # Crear producto (admin)
PUT    /api/productos/:id           # Editar producto (admin)
DELETE /api/productos/:id           # Eliminar producto (admin)
```

---

## 🗃️ Modelos de Datos

### 👤 Usuario

| Campo         | Tipo      | Descripción                        |
|---------------|-----------|------------------------------------|
| id_usuario    | UUID      | Identificador único                |
| nombre        | String    | Nombre completo                    |
| correo        | String    | Correo electrónico (único)         |
| telefono      | String    | Opcional                           |
| direccion     | String    | Opcional                           |
| tipo_usuario  | String    | 'cliente' o 'admin'                |
| created_at    | Timestamp | Fecha de creación                  |

### 🧺 Producto

| Campo         | Tipo      | Descripción                        |
|---------------|-----------|------------------------------------|
| id_producto   | UUID      | Identificador del producto         |
| id_tienda     | UUID      | Referencia a la tienda del artesano|
| nombre        | String    | Nombre del producto                |
| descripcion   | Text      | Descripción detallada              |
| precio        | Decimal   | Precio en dólares                  |
| stock         | Integer   | Cantidad disponible                |
| imagen        | String    | URL de la imagen                   |
| activo        | Boolean   | Estado de publicación              |
| created_at    | Timestamp | Fecha de creación                  |

---

## 🔌 Servicios

### SupabaseService

Servicio centralizado para operaciones con la base de datos Supabase, utilizando patrón singleton.

---

## 🧱 Middlewares

### AuthMiddleware

- `isAuthenticated`: Verifica sesión activa mediante token.
- `isAdmin`: Verifica si el usuario tiene permisos administrativos.

### ErrorMiddleware

Manejo centralizado de errores, con respuestas diferenciadas entre entornos de desarrollo y producción.

---

## ⚙️ Utilidades

### ResponseHandler

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... },
  "errors": []
}
```

### Validator

Middleware para validaciones usando `express-validator`.

---

## 🔒 Seguridad

- Validación exhaustiva de datos en cada endpoint.
- Autenticación basada en JWT.
- Roles y autorización (cliente vs admin).
- Sanitización y limpieza de entradas.
- Respuestas genéricas en producción para evitar exposición de errores.

---

## ⚙️ Configuración y Despliegue

### Variables de Entorno

```env
# Supabase
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-key

# Servidor
PORT=3000
NODE_ENV=development | production
```

---

### 🧪 Instalación y Ejecución

#### Backend

```bash
cd backend
npm install
npm run dev      # Modo desarrollo
npm start        # Modo producción
```

#### Frontend

```bash
cd frontend
npm install
npm run dev      # Modo desarrollo
npm run build    # Compilación para producción
```

---

## 🚀 Estado Actual y Próximos Pasos

### ✅ Implementado

- Navegación básica y componentes de interfaz.
- Conexión con Supabase y persistencia de productos/usuarios.
- Autenticación simulada por JWT.
- Endpoints REST para usuarios y productos.

### 🔜 Próximos Desarrollos

- Autenticación completa usando Supabase Auth.
- Funcionalidad de carrito de compras.
- Integración con pasarelas de pago.
- Panel de administración para artesanos.
- Módulo de reportes y analíticas.

---

> Desarrollado con amor y pereza por el equipo de Artesano Digital.  
> Con tecnología de código abierto, inspirado en la cultura panameña.