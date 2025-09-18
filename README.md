# burokratilo
just a Poc about MVC for a system for administrative stuff


# Instrucciones para iniciar el backend

## Requisitos
- Node.js y npm instalados
- MongoDB instalado y corriendo localmente

## Instalación y ejecución

1. Abre una terminal y navega a la carpeta del backend:
	```powershell
	cd sistema_tramites/backend
	```
2. Instala las dependencias:
	```powershell
	npm install
	```
3. Inicia el servidor de MongoDB en otra terminal:
	```powershell
	mongod
	```
4. Inicia el backend:
	```powershell
	npm start
	```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para verificar que el backend está funcionando y conectado a MongoDB.

## Configuración de la base de datos

El archivo `.env` debe contener:
```
MONGODB_URI=mongodb://localhost:27017/burokratilo
```
