import React from 'react';

interface PersonalDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ProgressBar {
  percentage: number;
}

const PersonalDetails: React.FC<{ details: PersonalDetail[] }> = ({ details }) => (
  <div className="space-y-4">
    {details.map((detail, index) => (
      <div key={index} className="flex items-center gap-2">
        <span className="px-3 py-1 bg-yellow-100/80 dark:bg-yellow-100/10 rounded-full text-sm font-medium">
          {detail.label}:
        </span>
        {detail.highlight ? (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{detail.value}</span>
        ) : (
          <span className="text-gray-700 dark:text-gray-300">{detail.value}</span>
        )}
      </div>
    ))}
  </div>
);

const ProgressBar: React.FC<ProgressBar> = ({ percentage }) => (
  <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
    <div 
      className="absolute inset-y-0 left-0 bg-primary dark:bg-primary-foreground transition-all duration-1000 ease-out rounded-full"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const About: React.FC = () => {
  const personalDetails: PersonalDetail[] = [
    { label: 'Age', value: '24' },
    { label: 'Residence', value: 'Sierra Leone' },
    { label: 'Freelance', value: 'Available', highlight: true },
    { label: 'Address', value: 'Freetown, Sierra Leone' }
  ];

  const progressBars = [100, 80, 60];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Personal Details */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Info</h2>
            <PersonalDetails details={personalDetails} />
          </div>

          {/* Right Column - Description and Progress */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate frontend developer with a keen eye for design and a commitment to creating intuitive,
                performant web experiences. With a strong foundation in modern JavaScript frameworks and responsive
                design, I enjoy turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring the latest web technologies, contributing to open-source
                projects, or sharing my knowledge through blog posts and community events.
              </p>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {progressBars.map((percentage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
                  </div>
                  <ProgressBar percentage={percentage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;