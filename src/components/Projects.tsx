import React from 'react';
import { bioInfo } from '../data/personalData';
import { ArrowRight, Lock, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-12 bg-background border-t border-border">
            <div className="container px-4 mx-auto max-w-6xl">

                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 font-heading">
                        SELECTED WORKS
                    </h2>
                    <p className="text-xl text-muted-foreground font-sans leading-relaxed max-w-2xl">
                        A showcase of production-ready applications delivering real business value.
                    </p>
                </div>

                {/* Main Projects Grid - Two Columns */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {bioInfo.projects?.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>

                {/* NDA Disclosure - Distinct Section */}
                <div className="rounded-lg border border-border bg-secondary/30 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="p-4 bg-background border border-border rounded-full text-foreground shrink-0">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold font-mono text-foreground uppercase tracking-wide">
                            Confidential Enterprise Projects
                        </h3>
                        <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                            Beyond this portfolio, I have architected <strong>7+ high-impact applications</strong>, ranging from SaaS platforms to secure internal dashboards. Due to strict Non-Disclosure Agreements (NDAs), these cannot be publicly showcased.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
        >
            <div className="h-full flex flex-col border border-border bg-card rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-500">

                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border">
                    <div className="absolute inset-0 bg-foreground/5 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-2 bg-background/90 backdrop-blur rounded-full text-foreground shadow-sm">
                            <ExternalLink className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="mb-4">
                        <p className="text-xs font-bold font-mono text-primary uppercase tracking-wider mb-2">
                            {project.category}
                        </p>
                        <h3 className="text-2xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground font-sans text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold font-mono uppercase tracking-tight">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Projects;
