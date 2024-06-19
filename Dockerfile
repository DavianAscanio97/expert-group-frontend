# Etapa de compilación (Build Stage)
FROM node:14-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de configuración de dependencias
COPY package.json yarn.lock ./

# Instalar las dependencias usando Yarn
RUN yarn install --frozen-lockfile

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular en modo producción
RUN yarn build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de compilación de la etapa de compilación al servidor nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Configurar el archivo de configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para que nginx sirva la aplicación
EXPOSE 80

# Comando para iniciar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
