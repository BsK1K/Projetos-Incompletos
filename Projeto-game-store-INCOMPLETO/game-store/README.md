# Game Store

Projeto fullstack em monorepo: backend Node.js + Express + TypeScript com Prisma e PostgreSQL, frontend React + Vite + TypeScript.

## Estrutura

```
game-store/
├── backend/          # API REST (Express, Prisma, JWT, bcrypt)
├── frontend/         # SPA React (Vite, React Router, Axios)
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

- Node.js 18+
- npm (ou pnpm/yarn)
- Docker e Docker Compose (para PostgreSQL)

## Como rodar localmente

### 1. Subir o banco de dados

```bash
docker-compose up -d
```

Isso sobe o PostgreSQL na porta **5432** com:
- **Usuário:** gamestore  
- **Senha:** gamestore123  
- **Database:** game_store  

### 2. Instalar dependências

Na raiz do projeto:

```bash
npm run install:all
```

Ou manualmente:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configurar o backend

O backend já inclui um arquivo `.env` de exemplo. Se quiser usar outro, copie `.env.example` para `.env` e ajuste:

```bash
cd backend
cp .env.example .env
```

Variáveis usadas:
- `DATABASE_URL` – connection string do PostgreSQL (padrão: `postgresql://gamestore:gamestore123@localhost:5432/game_store`)
- `JWT_SECRET` – chave para assinatura dos tokens JWT
- `PORT` – porta da API (padrão: 3001)

### 4. Rodar as migrações do Prisma

```bash
npm run db:migrate
```

Ou a partir da pasta `backend`:

```bash
cd backend
npx prisma migrate dev
```

### 5. Iniciar backend e frontend

Em um terminal, backend:

```bash
npm run dev:backend
```

Em outro terminal, frontend:

```bash
npm run dev:frontend
```

- **API:** http://localhost:3001  
- **Frontend:** http://localhost:5173  

O Vite está configurado com proxy: requisições para `/api` no frontend são redirecionadas para o backend.

## Scripts úteis (raiz)

| Comando            | Descrição                          |
|--------------------|------------------------------------|
| `npm run dev:backend`  | Sobe o backend em modo desenvolvimento |
| `npm run dev:frontend` | Sobe o frontend (Vite)               |
| `npm run db:up`        | Sobe o PostgreSQL (Docker)          |
| `npm run db:down`      | Para e remove o container do banco  |
| `npm run db:migrate`   | Roda migrações Prisma               |
| `npm run db:studio`    | Abre o Prisma Studio                |
| `npm run install:all`  | Instala dependências em todo o monorepo |

## Backend (resumo)

- **Stack:** Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt  
- **Estrutura:** MVC (controllers, routes, middlewares, config)  
- **Rotas principais:**  
  - `POST /api/auth/register` – cadastro  
  - `POST /api/auth/login` – login  
  - `GET /api/auth/me` – usuário autenticado (requer JWT)  
  - `GET/POST /api/games` – listar e criar jogos  
  - `GET/PUT/DELETE /api/games/:id` – detalhe, atualizar e remover jogo (PUT/DELETE requer JWT)  

## Frontend (resumo)

- **Stack:** React 18, Vite, TypeScript, React Router, Axios  
- **Estrutura:** `pages/`, `components/`, `services/`, `types/`  
- **Funcionalidades:** login, cadastro, listagem de jogos, detalhe do jogo, criar jogo (área logada).  

## Licença

MIT
