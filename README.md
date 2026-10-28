# 🚀 Nexus Dashboard | Sreng Sopheakanha

A terminal-inspired, sleek personal portfolio built with **React**, **Vite**, and **Framer Motion**.

### ✨ Features
- **Terminal UI:** Aesthetic code-centric design.
- **Skill Sphere:** 3D interactive skill cloud.
- **GitHub Live:** Live repository data integration.
- **Contact:** Integrated via EmailJS.
- **Responsive Design:** Fully optimized for mobile and desktop views.
- **Security Focused:** Implemented CSP and security headers for safe hosting.

### 🛡️ Security Features
- **Content Security Policy (CSP):** Restricted resource loading to trusted domains only.
- **Security Headers:** Implemented HSTS, X-Frame-Options, X-Content-Type-Options, and more.
- **Hosting Compatibility:** Pre-configured `_headers` (Netlify/Cloudflare) and `.htaccess` (Apache).

### 🚀 Setup
```bash
git clone https://github.com/ROXYTINA/TINA.git
npm install
npm run dev
```

## 🛡️ Security & Configuration

The website uses environment variables to keep credentials secure. Ensure you create a `.env` file in the root directory based on `.env.example`:

- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS Service ID.
- `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID.
- `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key.
- `VITE_CONTACT_EMAIL`: The email address where you want to receive messages.

### Hosting Security
The project includes pre-configured security headers for various hosting platforms:
- `public/_headers`: For Netlify and Cloudflare Pages (CSP, HSTS, XSS protection).
- `public/.htaccess`: For Apache-based hosting (SPA routing and security headers).
- `index.html`: Includes meta-tag based security policies as a fallback.

## 👤 Author
**Sreng Sopheakanha**
- [GitHub](https://github.com/ROXYTINA) | [LinkedIn](https://www.linkedin.com/in/sreng-sopheakanha-58a5b2296/) | [Telegram](https://t.me/Da1nonlyRoxy)

---
*Built with ❤️ in Cambodia*
