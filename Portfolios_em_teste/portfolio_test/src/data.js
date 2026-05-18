// =======================================================
//  📝 DADOS DO PORTFÓLIO — edite este arquivo!
//  Todas as informações pessoais ficam aqui.
// =======================================================

// -------------------------------------------------------
// HERO (seção inicial)
// -------------------------------------------------------
export const HERO = {
  greeting: 'Meu nome é',          // ex: "Meu nome é"
  name: 'Seu Nome Aqui',           // ✏️ seu nome
  role: 'Desenvolvedor de Software', // ✏️ seu cargo/função
  photo: '/foto-perfil.png',        // coloque a imagem em /public
  email: 'voce@email.com',          // ✏️
  github: 'https://github.com/usuario', // ✏️
  linkedin: 'https://linkedin.com/in/usuario', // ✏️
  cv: 'https://link-para-seu-cv.pdf', // ✏️ link do Google Drive ou similar
}

// -------------------------------------------------------
// SOBRE MIM
// -------------------------------------------------------
export const ABOUT = `
  Escreva aqui um parágrafo sobre você. Quem é você, quando começou na área,
  o que te motiva e o que você busca na carreira.

  Segundo parágrafo opcional — formação, experiências marcantes, etc.

  Terceiro parágrafo opcional — valores, modo de trabalhar, diferenciais.
`

// -------------------------------------------------------
// INTERESSES / ÁREAS DE ATUAÇÃO
// -------------------------------------------------------
export const INTERESTS = [
  {
    title: 'Área de Interesse 1',       // ✏️ ex: "Desenvolvimento Web"
    description: 'Descrição breve do que você faz ou estuda nessa área.',
    icon: '💻',                          // emoji ou troque por um <img>
  },
  {
    title: 'Área de Interesse 2',
    description: 'Descrição breve do que você faz ou estuda nessa área.',
    icon: '⚙️',
  },
  {
    title: 'Área de Interesse 3',
    description: 'Descrição breve do que você faz ou estuda nessa área.',
    icon: '📐',
  },
]

// -------------------------------------------------------
// SKILLS — cada grupo aparece em uma linha separada
// -------------------------------------------------------
export const SKILL_GROUPS = [
  {
    title: 'Usando atualmente',
    skills: [
      // { name: 'React',    icon: '/icons/react.svg'    },
      // { name: 'Node.js',  icon: '/icons/nodejs.svg'   },
      // Adicione seus ícones em /public/icons e referencie aqui.
      // Por ora, coloque só o nome — o componente exibe as iniciais.
      { name: 'Tecnologia 1' },
      { name: 'Tecnologia 2' },
      { name: 'Tecnologia 3' },
      { name: 'Tecnologia 4' },
    ],
  },
  {
    title: 'Em aprendizado',
    skills: [
      { name: 'Tecnologia A' },
      { name: 'Tecnologia B' },
    ],
  },
  {
    title: 'Outras habilidades',
    skills: [
      { name: 'Habilidade 1' },
      { name: 'Habilidade 2' },
      { name: 'Habilidade 3' },
    ],
  },
]

// -------------------------------------------------------
// PROJETOS DO PORTFÓLIO
// -------------------------------------------------------
//  category: 'fullstack' | 'frontend' | 'backend'
// -------------------------------------------------------
export const PROJECTS = [
  {
    title: 'Nome do Projeto 1',
    description: 'Descrição curta do projeto. O que ele faz, qual problema resolve.',
    image: '/projects/projeto1.png',   // coloque a imagem em /public/projects
    tech: ['React', 'Node.js'],        // ✏️ tecnologias usadas
    category: 'fullstack',
    liveUrl: 'https://link-do-deploy.com', // null se não tiver
    codeUrl: 'https://github.com/usuario/repo', // null se não tiver
  },
  {
    title: 'Nome do Projeto 2',
    description: 'Descrição curta do projeto.',
    image: '/projects/projeto2.png',
    tech: ['Vue.js', 'CSS3'],
    category: 'frontend',
    liveUrl: null,
    codeUrl: 'https://github.com/usuario/repo2',
  },
  {
    title: 'Nome do Projeto 3',
    description: 'Descrição curta do projeto.',
    image: '/projects/projeto3.png',
    tech: ['Java', 'Spring Boot', 'PostgreSQL'],
    category: 'backend',
    liveUrl: null,
    codeUrl: null,
  },
  // Adicione mais projetos aqui...
]

// -------------------------------------------------------
// CONTATO
// -------------------------------------------------------
export const CONTACT = {
  title: 'Entre em contato',
  description:
    'Escreva aqui uma frase de apresentação breve para a seção de contato.',
  // O formulário usa Formspree — crie uma conta gratuita em formspree.io
  // e substitua o ID abaixo pelo seu endpoint.
  formspreeId: 'SEU_ID_AQUI', // ✏️ ex: "mkogddzo"
}

// -------------------------------------------------------
// FOOTER
// -------------------------------------------------------
export const FOOTER = {
  // redes repetidas para facilitar o acesso no rodapé
  linkedin: 'https://linkedin.com/in/usuario',
  github:   'https://github.com/usuario',
  email:    'voce@email.com',
}
