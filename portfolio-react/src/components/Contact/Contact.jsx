import React, { useState } from 'react';
import { Send, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import './Contact.module.css';

/**
 * Contact Component
 * Formulario de contacto con información de contacto
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado! Te contactaré pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-slate-900/30 to-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-2/5 p-10 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-r border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Hablemos</h3>
              <p className="text-slate-400 text-sm mb-8">
                ¿Tienes un proyecto visionario? Estoy listo para construir el
                futuro contigo.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="text-cyan-400" size={20} />
                  <a
                    href="mailto:contacto@inmortal.dev"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    contacto@inmortal.dev
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Linkedin className="text-cyan-400" size={20} />
                  <span>in.linkedin.com/inmortal</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Github className="text-cyan-400" size={20} />
                  <a
                    href="https://github.com/1inmortal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    github.com/1inmortal
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                Redes Sociales
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/1inmortal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-3/5 p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm text-slate-400 block"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm text-slate-400 block"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm text-slate-400 block"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                  placeholder="Interesado en..."
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm text-slate-400 block"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
              >
                Enviar Mensaje
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
