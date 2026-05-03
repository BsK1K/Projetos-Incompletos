import React from "react";
import { Project } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <CardHeader className="flex-none">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Code2 size={24} />
          </div>
          {project.progress && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono text-xs">
              Em progresso: {project.progress}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex-none pt-4 border-t border-border/50 gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Github size={16} />
            <span>Código</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <ExternalLink size={16} />
            <span>Ver projeto</span>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
