# Atlantis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Pasos para Usar Docker con Angular y yarn install
Clonar el Repositorio

bash
git clone https://github.com/DavianAscanio97/expert-group-frontend
cd tu-proyecto-angular
Construir y Ejecutar con Docker Compose

bash
docker-compose up --build
Esto construirá la imagen Docker basada en el Dockerfile proporcionado, instalará las dependencias usando yarn install, construirá la aplicación Angular en modo de producción (yarn build --prod), y luego ejecutará la aplicación en el puerto 4200 del host.

Acceder a la Aplicación
Abre tu navegador y visita la siguiente URL para acceder a tu aplicación Angular:

http://localhost:4200
Detener y Limpiar
Cuando hayas terminado de trabajar, detén y elimina los contenedores.

bash
docker-compose down
Este setup te permite desarrollar y desplegar tu aplicación Angular usando Docker de manera eficiente. Puedes ajustar los puertos y configuraciones según tus necesidades específicas.
