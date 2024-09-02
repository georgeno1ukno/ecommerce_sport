# Ecommerce Application

Este proyecto es una aplicación de comercio electrónico que incluye un backend desarrollado en Spring Boot y un frontend desarrollado con React. A continuación, se detalla una descripción general de cada parte del proyecto y se incluyen instrucciones sobre cómo ejecutarlo en un entorno local.

## Descripción General

### Backend

El backend está construido utilizando Spring Boot y proporciona una API RESTful para manejar las funcionalidades clave del sistema de comercio electrónico. Esto incluye la gestión de usuarios, productos, carritos de compras, y pedidos.

#### Estructura de Paquetes

- **config**: Contiene la configuración de seguridad, JWT, y CORS.
- **controller**: Controladores que manejan las solicitudes HTTP entrantes y delegan las operaciones correspondientes a los servicios.
- **model**: Entidades que representan las tablas de la base de datos.
- **repository**: Interfaces que extienden `JpaRepository` para interactuar con la base de datos.
- **service**: Contiene la lógica de negocio de la aplicación.
- **resources**: Configuraciones y archivos estáticos, como `application.properties`.
- **test**: Contiene las pruebas unitarias y de integración para el backend.

### Frontend

El frontend está desarrollado en React y se encarga de la interacción del usuario con la aplicación. Permite a los usuarios ver productos, gestionar carritos de compras y realizar pedidos.

#### Estructura de Carpetas

- **components**: Contiene todos los componentes reutilizables y específicos de la aplicación como formularios de autenticación, carritos de compras, catálogos, y órdenes.
- **services**: Servicios que se encargan de las llamadas a la API para interactuar con el backend.
- **style**: Archivos CSS para manejar los estilos globales y específicos.
- **public**: Contiene archivos públicos como `index.html` y archivos de imagen.
- **src**: Contiene el código fuente principal de la aplicación React.

## Ejecución del Proyecto

### Requisitos Previos

- **Backend**: 
  - Java 22+
  - Maven
  - MySQL (o cualquier otra base de datos configurada en `application.properties`)

- **Frontend**:
  - Node.js
  - npm (o yarn)

### Ejecución del Backend

1. Clona el repositorio.
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-app.git
   cd ecommerce-app