import React, { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/23274512941?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground font-heading tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Have a project in mind or want to discuss modern web solutions? I'm available for freelance work.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Form Container */}
          <motion.div
            className="w-full max-w-2xl bg-card border border-border rounded-xl p-8 md:p-10 shadow-sm mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none font-sans"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full py-4 bg-foreground text-background font-bold rounded-lg hover:opacity-90 hover:translate-y-[-1px] hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
              >
                Send Message <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Email</h3>
                <a href="mailto:Chernorsulaimanjalloh2025@gmail.com" className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">
                  Chernorsulaimanjalloh2025@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Phone</h3>
                <a href="tel:+23274512941" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  +232 74 512 941
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Location</h3>
                <p className="text-muted-foreground font-medium">
                  Freetown, Sierra Leone
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
