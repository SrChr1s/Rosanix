# Rosanix

![Logo principal de Rosanix](./public/main-logo.png)

Rosanix es un gestor de tareas personal desarrollado por el equipo **Caleidoscopio**. Esta aplicación permite a los usuarios gestionar sus tareas y notas personales con autenticación y autorización, garantizando que cada usuario solo pueda acceder a sus propios datos.

## Tecnologías Utilizadas

- **React**: Biblioteca principal para construir la interfaz de usuario.
- **Vite**: Herramienta de construcción rápida y ligera para optimizar el desarrollo.
- **Tailwind CSS**: Framework CSS para estilos personalizados y diseño responsivo.
- **Ant Design (antd)**: Framework de componentes UI para mejorar la experiencia visual de la aplicación.
- **react-router-dom**: Manejo de rutas protegidas y navegación segura para los usuarios.
- **Axios**: Realiza peticiones HTTP a la API de backend de Rosanix.
- **js-cookie**: Almacenamiento y acceso a cookies para la autenticación de usuarios mediante JWT.
- **sweetalert2**: Alertas personalizadas para mejorar la experiencia de usuario.
- **react-icons** y **@ant-design/icons**: Iconos para mejorar la usabilidad e interfaz de la aplicación.

## Funcionalidades

- **Autenticación y Autorización**: Cada usuario puede ver solo sus tareas y notas mediante un sistema de autenticación segura con JWT.
- **Gestión de Tareas y Notas**: Los usuarios pueden añadir, ver, editar y eliminar sus tareas.
- **Interfaz Intuitiva**: La interfaz está diseñada para ser accesible y fácil de usar, utilizando Ant Design y Tailwind CSS.
- **Alertas Personalizadas**: Las alertas son proporcionadas por sweetalert2 para mejorar la comunicación visual.

## Estructura de Rutas

La aplicación utiliza `react-router-dom` para proteger las rutas y asegurar que solo los usuarios autenticados puedan acceder a sus tareas y notas.

## Hooks Utilizados

- `useState` y `useEffect`: Para el manejo de estados y efectos secundarios.
- `createContext` y `useContext`: Para crear un contexto de autenticación que permite compartir información de usuario y estado de autenticación en toda la aplicación.

## Instalación y Ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/srchr1s/rosanix.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd rosanix
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

## Licencia

Este proyecto está bajo la licencia MIT.

```
MIT License

Copyright (c) 2024 Caleidoscopio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

Desarrollado por el equipo **Caleidoscopio**.
