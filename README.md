# AUTOCENTER AUTOMOTRIZ - Sistema de Orden de Trabajo y Recepción

Sistema web interactivo para la gestión de recepción de vehículos, inventario, presupuesto estimado y generación de Órdenes de Trabajo exportables a PDF o impresión directa.

## 🚀 Despliegue en Render

Este proyecto está listo para ser desplegado en [Render.com](https://render.com).

### Opción A: Render Web Service (Recomendado)
1. En Render, crea un nuevo **Web Service**.
2. Conecta el repositorio GitHub `https://github.com/blosttt/AutoCenterV1`.
3. Configuración automática:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Haz clic en **Create Web Service**.

### Opción B: Render Static Site
1. En Render, crea un nuevo **Static Site**.
2. Conecta el repositorio `AutoCenterV1`.
3. **Publish directory**: `./`
4. Haz clic en **Create Static Site**.

---

## 🛠️ Ejecución Local

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor:
```bash
npm start
```

3. Abrir en el navegador en `http://localhost:3000`.

---

## ⚡ Características
- Generación dinámica de orden de trabajo con el logo de **AUTOCENTER AUTOMOTRIZ**.
- Diagrama interactivo de inspección visual de carrocería (marcar abolladuras y rayones directamente en la silueta).
- Firma digital táctil o con ratón para el cliente y el taller.
- Cálculo automático de presupuesto, subtotal, IVA y total estimado.
- Exportación en un clic a **PDF** de alta resolución y soporte para impresión directa A4 (`@media print`).
- Guardado y carga de borradores en historial local (`localStorage`).
