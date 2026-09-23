# Generador de Copies SPARC — versión pública

Formulario + generación de copies con IA, usable por cualquier persona sin cuenta de Claude.

## Cómo desplegarlo (gratis, ~5 minutos)

1. **Sube estos 3 archivos a un repositorio de GitHub**
   (`index.html`, `api/generate.js`, `package.json`).

2. **Entra a [vercel.com](https://vercel.com)**, crea una cuenta gratuita con tu GitHub
   y elige **"Add New Project"** → selecciona ese repositorio.

3. **Antes de darle "Deploy"**, ve a *Environment Variables* y agrega:
   - Name: `ANTHROPIC_API_KEY`
   - Value: tu API key de [console.anthropic.com](https://console.anthropic.com)
     (Settings → API Keys)

4. Dale **Deploy**. Vercel te da una URL pública tipo
   `https://tu-proyecto.vercel.app` — esa es la que compartes.
   Cualquiera puede entrar y usarlo sin cuenta de Claude ni de Vercel.

## Importante sobre costos y seguridad

- Cada clic en "Generar" consume créditos de **tu** cuenta de Anthropic
  (la key nunca se expone al navegador, solo vive en el servidor de Vercel).
- Como el enlace es público, cualquiera con el link puede generar copies y
  gastar tu saldo. Si vas a compartirlo ampliamente, considera:
  - Ponerle una contraseña simple (Vercel tiene "Password Protection" en
    proyectos de pago, o puedes agregar un campo de código en el formulario
    que `api/generate.js` valide antes de llamar a Anthropic).
  - Un límite de usos por IP/día (se puede agregar con un servicio como
    Upstash Redis, gratis en su capa básica).
- Si prefieres no exponerlo públicamente sin control, puedes dejarlo con
  el link de Vercel sin difundir demasiado, o pedirme que te agregue el
  código de acceso simple.

## Actualizar el contenido

Si luego quieres ajustar el prompt maestro o los campos del formulario,
edita `index.html` y vuelve a subir el cambio a GitHub — Vercel lo
redespliega automáticamente.
