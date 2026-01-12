import React, { useState } from 'react';
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
    <section id="contact" className="py-24 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-5xl">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground font-heading tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Have a project in mind or want to discuss modern web solutions? I'm available for freelance work.
          </p>
        </div>

        <div className="flex flex-col items-center">

          {/* Form Container */}
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl p-8 md:p-10 shadow-sm mb-16">
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all font-sans"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all font-sans"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all resize-none font-sans"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full py-4 bg-foreground text-background font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
              >
                Send Message <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>

          {/* Contact Details - Horizontal Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-secondary text-foreground">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Email</h3>
                <a href="mailto:Chernorsulaimanjalloh2025@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Chernorsulaimanjalloh2025@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-secondary text-foreground">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Phone</h3>
                <a href="tel:+23274512941" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  +232 74 512 941
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-secondary text-foreground">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider mb-1">Location</h3>
                <p className="text-muted-foreground font-medium">
                  Freetown, Sierra Leone
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;