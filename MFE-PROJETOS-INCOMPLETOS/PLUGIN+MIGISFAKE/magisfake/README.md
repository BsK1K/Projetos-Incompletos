# 🚀 Magis AutoSep — Sistema Completo de Automação

Sistema em duas partes para simulação e automação de separação de pedidos.

---

## 📦 ESTRUTURA DE ARQUIVOS

```
fake-magis/
└── index.html          ← Simulador Web (abrir no navegador)

magis-plugin/
├── manifest.json       ← Manifest da extensão Chrome/Edge
├── popup.html          ← Interface do plugin
├── popup.js            ← Lógica de automação
└── content.js          ← Script que interage com o simulador
```

---

## 🖥 PARTE 1 — SIMULADOR WEB

### Como usar:
1. Abra `fake-magis/index.html` no Chrome/Edge
2. O sistema carrega 200 pedidos simulados automaticamente
3. Use os filtros de busca, loja e data
4. Selecione pedidos com os checkboxes
5. Clique em "Imprimir Selecionados"

### Funcionalidades:
- ✅ 200 pedidos com produtos realistas de bebê/maternidade
- ✅ Campo de busca por produto/SKU/ID
- ✅ Filtro por loja (Shopee, Mercado Livre, Amazon, Magalu)
- ✅ Filtro por data
- ✅ Seleção individual e "Selecionar todos filtrados"
- ✅ Modal de impressão com lista detalhada
- ✅ Log visual de operações em tempo real
- ✅ Paginação (25 por página)
- ✅ API de automação exposta em `window.MagisAPI`
- ✅ Atributos `data-automation` em todos os elementos críticos

### API para o Plugin (`window.MagisAPI`):
```js
MagisAPI.setSearch("ninho")    // Preenche campo de busca
MagisAPI.clickSearch()          // Executa busca
MagisAPI.selectAll()            // Seleciona todos filtrados
MagisAPI.clickPrint()           // Abre modal de impressão
MagisAPI.confirmPrint()         // Confirma impressão
MagisAPI.getStats()             // Retorna { total, filtered, selected, currentSearch }
MagisAPI.pluginLog(type, action, msg)  // Adiciona log ao simulador
```

---

## 🔌 PARTE 2 — PLUGIN DE NAVEGADOR

### Instalação no Chrome/Edge:
1. Abra `chrome://extensions/` (ou `edge://extensions/`)
2. Ative o **Modo do Desenvolvedor** (canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta `magis-plugin/`
5. O plugin "Magis AutoSep" aparecerá na barra de extensões

> ⚠️ **Nota:** As extensões precisam de ícones. Crie uma pasta `icons/` dentro de `magis-plugin/` com arquivos `icon16.png`, `icon48.png` e `icon128.png`. Se não houver ícones, o Chrome usará um ícone padrão e pode mostrar um aviso — a extensão funcionará normalmente.

### Como usar:
1. Abra o simulador (`fake-magis/index.html`) em uma aba
2. Clique no ícone do plugin "Magis AutoSep" na barra de extensões
3. Configure as palavras-chave (uma por linha)
4. Ajuste o delay entre ações (padrão: 2000ms)
5. Escolha se deseja o Modo Seguro ativado
6. Clique em **"▶ Iniciar Automação"**

---

## ⚙️ FLUXO DE EXECUÇÃO (por palavra-chave)

```
Para cada palavra-chave:
  1. [Modo Seguro?] → Confirmar: Digitar palavra-chave
  2. → Preenche campo de busca
  3. [Modo Seguro?] → Confirmar: Executar busca
  4. → Clica em "Buscar"
  5. [Modo Seguro?] → Confirmar: Selecionar todos
  6. → Marca todos os pedidos filtrados
  7. [Modo Seguro?] → Confirmar: Imprimir etiquetas
  8. → Clica em "Imprimir Selecionados"
  9. [Modo Seguro?] → Confirmar: Confirmar impressão no modal
 10. → Confirma no modal
 11. → Aguarda delay configurado
 12. → Próxima palavra-chave
```

---

## 🔒 MODO SEGURO

Quando ativado:
- Antes de CADA etapa crítica, exibe um popup de confirmação com:
  - Nome da ação
  - Palavra-chave atual
  - **✓ Confirmar** — executa a ação
  - **⤭ Pular** — ignora esta etapa e avança
  - **✕ Cancelar** — interrompe toda a automação

---

## 📊 PALAVRAS-CHAVE SUGERIDAS

```
ninho
almofada
berço
carrinho
kit higiene
monitor
cadeira
cobertor
bolsa
trocador
```

---

## 🛑 CONTROLE DE EXECUÇÃO

- **Botão STOP**: Interrompe após a ação atual ser concluída
- **Modo Seguro**: Permite cancelar em qualquer ponto
- **Log em tempo real**: Visível no plugin E no simulador

---

## 🚀 EXPANSÕES FUTURAS

### Integração com Magis Real:
1. Identificar seletores CSS reais dos elementos
2. Atualizar `SELECTORS` em `content.js`
3. Remover dependência de `window.MagisAPI`
4. Adicionar suporte a login automático

### Funcionalidades planejadas:
- [ ] Agrupamento visual por corredor/prioridade
- [ ] Relatórios persistentes em CSV/Excel
- [ ] Detecção automática de elementos por IA
- [ ] Automação completa sem Modo Seguro (opção)
- [ ] Multi-janela / multi-conta
- [ ] Integração com sistemas de impressão reais

---

## 🐛 TROUBLESHOOTING

**Plugin não aparece:**
→ Verifique se o Modo do Desenvolvedor está ativado

**"Nenhuma aba ativa encontrada":**
→ Abra o simulador e clique sobre ele antes de iniciar

**Ações não funcionam:**
→ Verifique se a aba ativa contém o simulador Magis
→ Recarregue a extensão em `chrome://extensions/`

**Timeout nas ações:**
→ Aumente o valor de "Timeout por etapa" nas configurações
