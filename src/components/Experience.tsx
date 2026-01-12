import React from 'react';
import { bioInfo } from '../data/personalData';
import { Calendar, ArrowRight } from 'lucide-react';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-12 bg-background">
            <div className="container px-4 mx-auto max-w-4xl">

                {/* Minimal Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                        Work Experience
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                {/* Structural Step Layout */}
                <div className="relative space-y-12">

                    {/* Continuous Vertical Line */}
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-border md:left-[140px]" />

                    {bioInfo.experience.map((job, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-12 group">

                            {/* Date Column (Sticky-ish on desktop) */}
                            <div className="flex-shrink-0 md:w-[140px] md:text-right pt-1 relative z-10">
                                <span className="inline-block px-3 py-1 text-sm font-semibold tracking-wide text-muted-foreground bg-background border border-border rounded-full group-hover:border-primary/50 group-hover:text-primary transition-colors">
                                    {job.period}
                                </span>

                                {/* Dot on the line */}
                                <div className="absolute top-4 -right-[6.5px] w-3 h-3 bg-background border-2 border-muted-foreground rounded-full hidden md:block group-hover:border-primary group-hover:scale-110 transition-all" />
                            </div>

                            {/* Content Column */}
                            <div className="flex-grow pt-0.5 pb-8 relative">

                                {/* Mobile Dot (Left aligned) */}
                                <div className="absolute left-[-5px] top-[9px] w-2.5 h-2.5 bg-border rounded-full md:hidden" />

                                <div className="group-hover:translate-x-1 transition-transform duration-300">
                                    <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                        {job.role}
                                        {job.type === 'internship' && (
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-600 tracking-wider">
                                                Offer Extended
                                            </span>
                                        )}
                                    </h3>

                                    <div className="text-lg text-primary font-medium mb-4">
                                        {job.company}
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-[15px]">
                                        {job.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {job.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                                <ArrowRight className="w-4 h-4 text-primary/50 mt-0.5 flex-shrink-0" />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
