# XPERT GROUP | PRUEBA TECNICA 

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

http://localhost/#/
Detener y Limpiar
Cuando hayas terminado de trabajar, detén y elimina los contenedores.

bash
docker-compose down
Este setup te permite desarrollar y desplegar tu aplicación Angular usando Docker de manera eficiente. Puedes ajustar los puertos y configuraciones según tus necesidades específicas.
