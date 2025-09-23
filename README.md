
# Burokratilo

Sistema administrativo tipo MVC con backend Express/MongoDB y frontend Svelte SPA.

## Tecnologías principales

- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Frontend:** Svelte, Vite
- **Testing:** Jest, Supertest
- **Plugins/Librerías:**
  - express
  - mongoose
  - bcrypt
  - dotenv
  - jest
  - supertest
  - svelte
  - vite
  - @sveltejs/vite-plugin-svelte

## Estructura del proyecto

- `sistema_tramites/backend`: API REST, autenticación, base de datos
- `sistema_tramites/svelte-app`: SPA Svelte, vistas por rol

## Instalación local

### Requisitos
- Node.js y npm
- MongoDB Community Server

### Backend
1. Abre una terminal y navega a la carpeta del backend:
	```powershell
	cd sistema_tramites/backend
	```
2. Instala dependencias:
	```powershell
	npm install
	```
3. Crea el archivo `.env` con el contenido:
	```
	MONGODB_URI=mongodb://localhost:27017/burokratilo
	```
4. Inicia MongoDB en otra terminal:
	```powershell
	mongod
	```
5. Inserta usuarios de prueba:
	```powershell
	node seeds/usuarios.js
	```
6. Inicia el backend:
	```powershell
	npm start
	```

### Frontend
1. Abre otra terminal y navega a la carpeta del frontend:
	```powershell
	cd sistema_tramites/svelte-app
	```
2. Instala dependencias:
	```powershell
	npm install
	```
3. Inicia la app:
	```powershell
	npm run dev
	```
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Pruebas

Para ejecutar los tests del backend:
```powershell
cd sistema_tramites/backend
npm test
```

---
### Autor
marcelodanieldm
