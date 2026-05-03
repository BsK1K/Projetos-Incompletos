import React from "react";
import { Project } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface ProjectCarouselProps {
  title: string;
  description?: string;
  projects: Project[];
}

export function ProjectCarousel({ title, description, projects }: ProjectCarouselProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="py-12 w-full">
      <div className="mb-8 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3"
        >
          <span className="text-primary font-mono text-xl">{`//`}</span>
          {title}
        </motion.h3>
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            {description}
          </motion.p>
        )}
      </div>

      <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {projects.map((project, index) => (
              <CarouselItem key={project.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-[-3rem] border-primary/20 hover:bg-primary hover:text-primary-foreground text-primary bg-background/50 backdrop-blur-sm" />
            <CarouselNext className="right-[-3rem] border-primary/20 hover:bg-primary hover:text-primary-foreground text-primary bg-background/50 backdrop-blur-sm" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
