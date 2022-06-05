# PokeQuick

Aplicación para la prueba de frontend de la empresa Quick, donde fue requerido el uso de la pokeapi. El demo de la aplicación se encuentra alojado en [Pokequick](https://pokequick.netlify.app/)

## Dependencias principales

- React
- Redux-Toolkit
- TailwindCSS
- React Router
- Headless UI

Usando Vite, Prettier y Eslint para mejor experiencia de desarrollo.

## Instalación local

Se deberá clonar el proyecto y abrir una terminal dentro de dicha carpeta, donde se correrá el siguiente comando para instalar las dependencias.

```bash
npm install
```

Al finalizar la instalación podremos correrla en modo de desarrollo con el siguiente comando

```bash
npm run dev
```

O correrla en modo producción

```bash
npm run build && npm run preview
```

## Docker (experimental)

Similar a la instalación local sera necesario clonar el proyecto, y al abrir la terminal en el proyecto, se usara el siguiente comando.

```bash
docker compose up
```

## Despliegue

El despliegue de la aplicación sera bastante sencillo en hostings como [Netlify](https://app.netlify.com) o [Vercel](https://vercel.com), solo sera necesario crear una cuenta en cualquiera de ellos, y posteriormente solo se tendrá que conectar la cuenta de github, y elegir el repositorio requerido.
