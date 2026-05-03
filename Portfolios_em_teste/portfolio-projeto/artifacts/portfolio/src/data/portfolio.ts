// ============================================================
// AQUI VOCE EDITA SEUS DADOS PESSOAIS
// Substitua pelos seus dados reais
// ============================================================
export const personalInfo = {
  // Seu nome completo (aparece no topo da pagina)
  name: "NOME DO DESENVOLVEDOR",
  // Sua profissão ou foco de estudo
  role: "Estudante de Ciência da Computação",
  // Uma frase de impacto logo abaixo do seu nome
  tagline: "Construindo o futuro, um commit de cada vez.",
  // Seu resumo profissional (bio)
  bio: "Sou um desenvolvedor em formação, apaixonado por resolver problemas complexos e aprender novas tecnologias. Adoro explorar o mundo do desenvolvimento de software, desde a criação de interfaces modernas até a arquitetura de sistemas no back-end. Sempre aberto a novos desafios e colaborações.",
};

// ============================================================
// AQUI VOCE EDITA SEUS CONTATOS E REDES SOCIAIS
// Deixe em branco se não quiser exibir
// ============================================================
export const contacts = {
  email: "seu.email@exemplo.com",
  github: "https://github.com/seuusuarionogithub",
  linkedin: "https://linkedin.com/in/seuperfilnolinkedin",
};

// ============================================================
// AQUI VOCE EDITA SUAS HABILIDADES (SKILLS)
// Adicione ou remova tecnologias que você conhece
// ============================================================
export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "C++",
  "Git",
  "SQL",
  "Tailwind CSS",
  "Linux"
];

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  progress?: string;
};

// ============================================================
// PROJETOS DA FACULDADE
// Trabalhos acadêmicos e projetos de disciplinas
// ============================================================
export const facultyProjects: Project[] = [
  {
    id: "fac-1",
    title: "NOME DO PROJETO 1",
    description: "Descrição do projeto da faculdade. Explique o que foi feito, qual o objetivo da disciplina e qual foi o seu papel.",
    techStack: ["C", "Estruturas de Dados"],
    githubUrl: "#",
  },
  {
    id: "fac-2",
    title: "NOME DO PROJETO 2",
    description: "Outro projeto acadêmico interessante. Fale sobre os desafios superados e o que aprendeu.",
    techStack: ["Python", "Machine Learning"],
    githubUrl: "#",
  },
  {
    id: "fac-3",
    title: "NOME DO PROJETO 3",
    description: "Um projeto em equipe onde desenvolvemos um sistema completo para a matéria de Engenharia de Software.",
    techStack: ["Java", "Spring Boot", "MySQL"],
    githubUrl: "#",
  }
];

// ============================================================
// PROJETOS PESSOAIS FINALIZADOS
// Projetos que você começou e terminou por conta própria
// ============================================================
export const finishedPersonalProjects: Project[] = [
  {
    id: "fin-1",
    title: "NOME DO PROJETO PESSOAL 1",
    description: "Um aplicativo incrível que resolve um problema real. Descreva as principais funcionalidades.",
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "fin-2",
    title: "NOME DO PROJETO PESSOAL 2",
    description: "Uma ferramenta útil que desenvolvi no meu tempo livre para automatizar uma tarefa chata.",
    techStack: ["TypeScript", "Next.js"],
    githubUrl: "#",
  },
  {
    id: "fin-3",
    title: "NOME DO PROJETO PESSOAL 3",
    description: "Um jogo simples ou experimento visual focado em aprender novas bibliotecas.",
    techStack: ["JavaScript", "HTML5 Canvas"],
    githubUrl: "#",
    liveUrl: "#",
  }
];

// ============================================================
// PROJETOS PESSOAIS EM DESENVOLVIMENTO
// Aqueles projetos que você está construindo aos poucos. Orgulhe-se deles!
// ============================================================
export const inProgressProjects: Project[] = [
  {
    id: "prog-1",
    title: "IDEIA GENIAL 1",
    description: "Ainda estou construindo a base desse projeto. A ideia é criar uma plataforma completa para gerenciar tarefas.",
    techStack: ["React", "Tailwind", "Firebase"],
    githubUrl: "#",
    progress: "40%",
  },
  {
    id: "prog-2",
    title: "IDEIA GENIAL 2",
    description: "Pesquisando e testando a arquitetura para um novo bot do Discord voltado para estudantes.",
    techStack: ["Node.js", "Discord.js"],
    githubUrl: "#",
    progress: "15%",
  },
  {
    id: "prog-3",
    title: "IDEIA GENIAL 3",
    description: "Reescrevendo meu antigo portfólio usando tecnologias mais modernas. Quase pronto!",
    techStack: ["React", "Vite", "Framer Motion"],
    githubUrl: "#",
    progress: "80%",
  },
  {
    id: "prog-4",
    title: "IDEIA GENIAL 4",
    description: "Um app mobile para ajudar a controlar as finanças pessoais.",
    techStack: ["React Native", "Expo"],
    githubUrl: "#",
    progress: "5%",
  }
];
