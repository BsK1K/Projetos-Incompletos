# Metagi - Sistema Kanban para Gestão Ágil

## 🎯 Conceito & Visão
Um sistema Kanban profissional, moderno e acessível para gestão de metodologias ágeis. Interface elegante com suporte a dark/light mode, drag-and-drop intuitivo, e foco em produtividade e acessibilidade.

## 🛠️ Stack Tecnológica
- **Frontend**: React (Vite) + TypeScript
- **Estilização**: Tailwind CSS com shadcn/ui components
- **Drag & Drop**: @dnd-kit (moderno, acessível)
- **Persistência**: LocalStorage (sem backend)
- **Ícones**: Lucide React

## 📁 Estrutura do Projeto
```
metagi/
├── src/
│   ├── components/
│   │   ├── Board.tsx          # Quadro Kanban principal
│   │   ├── Column.tsx         # Colunas (To Do, Doing, Done)
│   │   ├── Card.tsx           # Cards de tarefas
│   │   ├── Modal.tsx          # Modal para criar/editar tarefas
│   │   ├── Header.tsx         # Cabeçalho com controles
│   │   └── ThemeToggle.tsx    # Toggle dark/light mode
│   ├── hooks/
│   │   └── useLocalStorage.ts # Persistência
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## ✨ Funcionalidades Principais

### 1. Quadro Kanban
- 3 colunas padrão: **To Do**, **In Progress**, **Done**
- Drag-and-drop para mover cards entre colunas
- Contador de tarefas em cada coluna

### 2. Cards de Tarefa
- Título (obrigatório)
- Descrição (opcional)
- Prioridade: 🔴 Alta, 🟡 Média, 🟢 Baixa
- Data de criação automática
- Botão de editar e excluir

### 3. Modal de Tarefa
- Criar nova tarefa
- Editar tarefa existente
- Validação de formulário
- Fechar com ESC ou clicando fora

### 4. Acessibilidade (A11y)
- Navegação completa por teclado (Tab, Enter, Escape)
- ARIA labels em todos os elementos interativos
- Focus visible com indicador claro
- Suporte a leitores de tela

### 5. Qualidade de Vida (QoL)
- Dark/Light mode com toggle suave
- Persistência automática (LocalStorage)
- Animações suaves de transação
- Responsive design (desktop, tablet, mobile)

### 6. Recursos Extras
- Data atual no header
- Estatísticas (total de tarefas por coluna)
- Botão para limpar todas as tarefas
- Feedback visual ao arrastar cards

## 🎨 Design Visual
- **Tema claro**: Background branco, texto escuro, bordas sutis
- **Tema escuro**: Background #0f172a, cards mais escuros, acentos em cyan
- **Cards**: Sombra suave, bordas arredondadas, hover elevado
- **Colunas**: Background semi-transparente, header destacado
- **Tipografia**: Inter ou similar (Google Fonts)

## 🧪 Testes
- Verificar se drag-and-drop funciona em todas as colunas
- Testar criação e edição de tarefas
- Validar dark/light mode toggle
- Testar navegação por teclado
- Verificar responsividade em diferentes tamanhos
- Garantir que dados persistem após recarregar página