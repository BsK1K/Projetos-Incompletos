# 🗂️ Portfólio — Guia de Personalização

## Início rápido

```bash
npm install
npm run dev
# Acesse http://localhost:5173
```

---

## 📝 O que editar

### 1. `src/data.js` — **arquivo principal**
Todas as suas informações pessoais ficam aqui:
- Nome, cargo, e-mail, GitHub, LinkedIn, link do CV
- Texto do "Sobre Mim"
- Áreas de interesse
- Skills por grupo
- Projetos do portfólio
- Texto e ID do formulário de contato

### 2. `public/` — **imagens**
Coloque seus arquivos aqui:

| Arquivo                  | Usado em                   |
|--------------------------|----------------------------|
| `foto-perfil.png`        | Seção Hero (foto circular) |
| `capa.jpg`               | Fundo da seção Hero        |
| `banner-portfolio.jpg`   | Cabeçalho da seção Portfólio |
| `projects/projeto1.png`  | Card de cada projeto       |
| `favicon.svg`            | Ícone da aba               |

### 3. `public/icons/` — **ícones de skills** (opcional)
Baixe SVGs das tecnologias (ex: do [devicons.dev](https://devicons.dev))
e referencie no campo `icon` dentro de `SKILL_GROUPS` em `data.js`.

Exemplo:
```js
{ name: 'React', icon: '/icons/react.svg' }
```

### 4. `src/index.css` — **cores globais**
Altere as variáveis CSS no `:root` para mudar a paleta:
- `--color-accent`  → cor do hover do botão CV
- `--color-primary` → cor dos botões de projetos
- `--color-border`  → cor da borda dos cards

### 5. `index.html` — **SEO e metadados**
Troque título, descrição, og:image e og:url.

---

## 📬 Formulário de contato (Formspree)

1. Crie conta gratuita em [formspree.io](https://formspree.io)
2. Crie um novo formulário e copie o ID (ex: `mkogddzo`)
3. Cole em `src/data.js` → `CONTACT.formspreeId`

---

## 🚀 Deploy (Vercel)

```bash
npm run build
# Arraste a pasta `dist/` para vercel.com
# ou conecte o repositório GitHub na Vercel
```
