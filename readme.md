# travel-agency

travel-agency es una landing page de una agencia de viajes ficticia.

En la web se aplica responsive design, lazy loading de las imagenes y animaciones simples

El sitio es el producto final del curso "Git a Web Developer Job: Mastering the Modern Workflow" de Brad Schiff con modificaciones.

![ScreenShot](https://raw.githubusercontent.com/nicoierino/travel-agency/master/screenshot.png "ScreenShot")

## Demo

La demo está hosteada en netlify y usa Continuous Deployment por lo que se rebuildea y republica con cada cambio en la master branch

[https://travel-agency-demo.netlify.app/](https://travel-agency-demo.netlify.app/)

## Tecnologias usadas

Node, Webpack, postcss, babel, GiT y Netlify para deploy del demo

## Instalación

```node
node install
```

## Build

Crea la carpeta docs/ con el proyecto listo para ser publicado.

```node
npm run build
```

## Webpack devServer para desarollo

Webpack hostea localmente el proyecto en el puerto 3000 y se actualiza on-the-fly con cada cambio del codigo

[http://localhost:3000](http://localhost:3000)

```node
npm run dev
```
