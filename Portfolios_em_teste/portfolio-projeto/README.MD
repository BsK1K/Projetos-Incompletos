Como baixar o projeto:

No menu de três pontinhos (⋮) ao lado do nome do projeto no canto superior esquerdo, ou no menu de arquivos, tem a opção "Download as zip". Isso baixa o projeto inteiro num arquivo zip.

Pra rodar no seu ambiente local você vai precisar:

Node.js 24 instalado (baixa em nodejs.org)
pnpm instalado (depois do Node, roda npm install -g pnpm no terminal)
Depois de descompactar o zip, no terminal dentro da pasta do projeto:

pnpm install

Isso baixa todas as dependências (pode demorar um pouquinho).

Pra rodar só o portfólio:

cd artifacts/portfolio
pnpm dev

Aí abre no navegador o endereço que aparecer no terminal (normalmente algo tipo http://localhost:5173).

Observação importante: o arquivo que você vai editar (artifacts/portfolio/src/data/portfolio.ts) funciona exatamente igual no seu computador — pode abrir com qualquer editor de código (recomendo o VS Code, que é gratuito e muito usado por devs).