# 🚌 Laboratorio 07-08

📌 **Descripción:** Aplicación web desarrollada con **React** para la gestión de rutas, paradas y unidades de transporte de Quito. Permite registrar, consultar, actualizar y eliminar unidades, además de controlar el aforo de una unidad en tiempo real.

🎓 **Proyecto académico:** Estudiantes de la carrera de Tecnología en Desarrollo de Software de la **Escuela Politécnica Nacional (EPN)**.

---

## 👥 Integrantes

- 👤 **Araujo Gregory**
- 👤 **Barreno Nicolay**
- 👤 **Cajas Jordy**

---

## 🧩 Conceptos desarrollados

### 🔹 Componentes y estado local

- 🧱 **Componente:** función de React que devuelve una parte de la interfaz. Permite dividir la aplicación en piezas reutilizables. *Ejemplo: `ParadaBus`.*
- 🔢 **`useState`:** hook que guarda un valor que puede cambiar. Cada cambio vuelve a dibujar la interfaz con el nuevo valor. *Ejemplo: contador de pasajeros a bordo.*
- 📦 **Props:** datos que un componente padre envía a un componente hijo. Son de solo lectura. *Ejemplo: `<ParadaBus nombre="Estadio Olímpico" troncal="Ecovía" />`.*

### 🔹 Ciclo de vida e interfaz

- ⏱️ **`useEffect`:** hook que ejecuta código después de que el componente aparece en pantalla. Se usa, por ejemplo, para pedir datos a un servidor. Su lista de dependencias indica cuándo se vuelve a ejecutar.
- 🌐 **`fetch`:** función que realiza peticiones HTTP para obtener datos. En este proyecto, `json-server` simula una API REST en `http://localhost:3000`.
- 🔀 **Renderizado condicional:** mostrar un contenido u otro según una condición. *Ejemplo: "Unidad Llena" cuando se alcanzan 50 pasajeros, o "Espacio Disponible" en caso contrario.*

### 🔹 Lógica reutilizable y estado global

- 🪝 **Custom hook:** función que empieza con `use` y reúne lógica reutilizable, como estado y efectos. *Ejemplo: `useTiempoLlegada(distancia)`, que calcula el tiempo estimado de llegada de un bus.*
- 🌍 **Zustand:** librería para manejar un estado global que comparten varios componentes sin tener que pasar props de uno en uno. *Ejemplo: alertas operativas como cierres viales o desvíos.*
- 💾 **`localStorage`:** almacenamiento del navegador que conserva datos aunque se cierre la página. *Ejemplo: guardar las paradas favoritas del usuario.*

---

## 🖼️ Vista de la aplicación

### ☀️ Modo claro
![Modo claro de la aplicación](docs/modo-claro.png)

### 🌙 Modo oscuro
![Modo oscuro de la aplicación](docs/modo-oscuro.png)

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React 18**: construcción de la interfaz
- ⚡ **Vite**: servidor de desarrollo y empaquetado
- 🎨 **Tailwind CSS**: estilos
- 🗄️ **json-server**: API REST simulada con `db.json`
- 🆔 **uuid**: generación de identificadores únicos

---

## 🚀 Instalación y ejecución

Se necesitan **dos terminales** abiertas en la carpeta del proyecto.

📥 **1. Clonar el repositorio**
```bash
git clone https://github.com/NicolayBarreno2134/laboratorio-07-08
cd laboratorio-07-08
```

📦 **2. Instalar las dependencias** (solo la primera vez)
```bash
npm install
```

🗄️ **3. Terminal 1: iniciar el servidor de datos** (puerto 3000)
```bash
npx json-server --watch db.json --port 3000
```

💻 **4. Terminal 2: iniciar la aplicación**
```bash
npm run dev
```

Luego abre en el navegador la dirección que muestre la terminal (normalmente `http://localhost:5173`).

---

## 📂 Estructura principal

```
laboratorio-07-08/
├── db.json                      # Datos simulados (metro y paradas)
├── docs/                        # Capturas de la aplicación
├── src/
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Punto de entrada
│   └── components/
│       ├── Formulario.jsx       # Registro y actualización de unidades
│       ├── Listar.jsx           # Listado de unidades
│       ├── Mensajes.jsx         # Mensajes de alerta
│       └── ParadasCorredor.jsx  # Paradas por corredor (useEffect)
└── package.json
```

---

🏫 **Escuela Politécnica Nacional (EPN)**
📅 **Año 2026**
