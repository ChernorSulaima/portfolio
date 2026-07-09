import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    setIsSubmitting(true);
    const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/23274512941?text=${text}`, '_blank');
      setIsSubmitting(false);
    }, 300);
  };

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email',
      content: 'Chernorsulaimanjalloh2025@gmail.com',
      href: 'mailto:Chernorsulaimanjalloh2025@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+232 74 512 941',
      href: 'tel:+23274512941',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Freetown, Sierra Leone',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground font-heading tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Have a project in mind or want to discuss modern web solutions? I'm available for freelance work.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Form Container */}
          <motion.div
            className="w-full max-w-2xl bg-card border border-border rounded-xl p-5 sm:p-8 md:p-10 shadow-sm mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2 relative">
                  <label
                    className={`text-xs font-bold font-mono uppercase tracking-wider transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-background border rounded-lg outline-none transition-all duration-300 font-sans ${
                      focusedField === 'name'
                        ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                        : 'border-border'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label
                    className={`text-xs font-bold font-mono uppercase tracking-wider transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-background border rounded-lg outline-none transition-all duration-300 font-sans ${
                      focusedField === 'email'
                        ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                        : 'border-border'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <label
                  className={`text-xs font-bold font-mono uppercase tracking-wider transition-colors duration-300 ${
                    focusedField === 'message' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full px-4 py-3 bg-background border rounded-lg outline-none transition-all duration-300 resize-none font-sans ${
                    focusedField === 'message'
                      ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                      : 'border-border'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                ref={buttonRef}
                onClick={handleWhatsApp}
                className="relative w-full py-3.5 sm:py-4 bg-foreground text-background font-bold rounded-lg overflow-hidden flex items-center justify-center gap-2 uppercase tracking-wide text-sm transition-colors"
                whileHover={{ scale: 1.01, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {isSubmitting ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                className="flex flex-col items-center gap-3 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="p-3 rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <detail.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-mono text-xs sm:text-sm uppercase tracking-wider mb-1">{detail.title}</h3>
                  {detail.href ? (
                    <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors font-medium text-xs sm:text-sm break-all">
                      {detail.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                      {detail.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
