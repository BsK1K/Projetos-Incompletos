import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, ChevronDown } from "lucide-react";
import { 
  personalInfo, 
  contacts, 
  skills, 
  facultyProjects, 
  finishedPersonalProjects, 
  inProgressProjects 
} from "@/data/portfolio";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  // Set dark mode forcibly
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
      {/* Decorative Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px] mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden z-10">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
            <div className="p-4 rounded-2xl bg-card border border-primary/20 shadow-[0_0_30px_rgba(0,255,255,0.1)] inline-flex">
              <Terminal size={48} className="text-primary" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white"
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary font-mono mb-8"
          >
            {`> ${personalInfo.role}_`}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={32} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 relative z-10 bg-card/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-primary font-mono">{`01.`}</span>
              Sobre Mim
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-12">
              {personalInfo.bio}
            </p>

            <h3 className="text-xl font-bold mb-6 text-foreground/90">Stack & Tecnologias</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Badge variant="outline" className="px-4 py-2 text-sm font-mono border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors cursor-default">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold flex items-center gap-3"
          >
            <span className="text-primary font-mono">{`02.`}</span>
            Meu Trabalho
          </motion.h2>
        </div>

        <ProjectCarousel 
          title="Projetos Pessoais em Desenvolvimento" 
          description="Ideias ganhando forma. Esses são os projetos nos quais estou focando atualmente."
          projects={inProgressProjects} 
        />
        
        <ProjectCarousel 
          title="Projetos Pessoais Finalizados" 
          projects={finishedPersonalProjects} 
        />
        
        <ProjectCarousel 
          title="Projetos da Faculdade" 
          projects={facultyProjects} 
        />
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 relative z-10 bg-card/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary font-mono text-2xl mr-3">{`03.`}</span>
              Vamos Conversar?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Estou sempre aberto a novas oportunidades, colaborações em projetos interessantes e networking. Mande um alô!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {contacts.email && (
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold" asChild>
                  <a href={`mailto:${contacts.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar Email
                  </a>
                </Button>
              )}
              {contacts.github && (
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary" asChild>
                  <a href={contacts.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              )}
              {contacts.linkedin && (
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary" asChild>
                  <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground font-mono border-t border-white/5 relative z-10">
        <p>Desenvolvido com <span className="text-primary">React</span> e muito café.</p>
        <p className="mt-1 opacity-50">© {new Date().getFullYear()} {personalInfo.name}</p>
      </footer>
    </div>
  );
}
