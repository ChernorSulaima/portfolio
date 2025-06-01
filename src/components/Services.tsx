import React from 'react';
import { Code, Layout, Smartphone, FileText } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

const ServiceCard: React.FC<Service> = ({ icon, title, description, skills }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="space-y-4">
      {/* Icon */}
      <div className="w-12 h-12 bg-yellow-100/80 dark:bg-yellow-100/10 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400">
        {icon}
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      {/* Skills */}
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="w-1.5 h-1.5 bg-yellow-400 dark:bg-yellow-500 rounded-full"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      description: "Building modern, responsive websites and web applications",
      skills: [
        "Frontend Development",
        "Responsive Design",
        "Web Applications"
      ]
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces and experiences",
      skills: [
        "Mobile App Design",
        "Website Design",
        "Prototyping"
      ]
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications",
      skills: [
        "React Native",
        "iOS & Android",
        "App Maintenance"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Creation",
      description: "Creating engaging digital content for your brand",
      skills: [
        "Technical Writing",
        "Documentation",
        "Blog Posts"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I offer a range of services to help businesses and individuals create exceptional digital experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;