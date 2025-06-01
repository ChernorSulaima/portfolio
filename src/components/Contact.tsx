import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactInfoItem: React.FC<ContactInfo> = ({ icon, label, value }) => (
  <div className="group flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-700/50">
    <div className="w-12 h-12 bg-yellow-100/80 dark:bg-yellow-100/10 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
    </div>
  </div>
);

const InputField: React.FC<{
  label: string;
  type: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}> = ({ label, type, name, value, onChange, required = true, rows }) => {
  const Component = rows ? 'textarea' : 'input';
  
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <Component
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500"
        required={required}
      />
    </div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "Chernorsulaimanjalloh2025@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+232 74 512 941"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Freetown, Sierra Leone"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = '23274512941';
    const message = `Name: ${formData.user_name}
Email: ${formData.user_email}
Subject: ${formData.subject}
Message: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
            <div className="space-y-2">
              {contactInfo.map((info, index) => (
                <ContactInfoItem key={index} {...info} />
              ))}
            </div>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Your Name"
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Your Email"
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                />
              </div>

              <InputField
                label="Subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />

              <InputField
                label="Your Message"
                type="text"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
              />

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25"
              >
                Send via WhatsApp
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;