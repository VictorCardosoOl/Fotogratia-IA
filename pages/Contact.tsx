import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

// Opções do Select
const PROJECT_TYPES = [
  { value: 'wedding', label: 'Casamento / Elopement' },
  { value: 'portrait', label: 'Sessão de Retrato' },
  { value: 'commercial', label: 'Comercial / Marca' },
  { value: 'editorial', label: 'Editorial / Moda' }
];

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { type: PROJECT_TYPES[0].value }
  });

  const selectedType = watch('type');
  const selectedLabel = PROJECT_TYPES.find(p => p.value === selectedType)?.label || "Selecione";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  // Cleaner input class without heavy borders initially
  const getInputClass = (hasError: boolean) => 
    `w-full py-4 bg-transparent border-b border-secondary/20 outline-none transition-all duration-300 placeholder-transparent text-primary text-lg font-light rounded-none focus:ring-0 ${
      hasError 
        ? 'border-red-500 focus:border-red-600' 
        : 'focus:border-primary'
    }`;

  const labelClass = "absolute left-0 top-4 text-secondary/60 text-sm transition-all duration-300 pointer-events-none origin-left peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-widest peer-focus:uppercase peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase";

  return (
    <Layout>
      <div className="pt-32 md:pt-40 pb-section-sm bg-background text-primary relative">
        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-display font-serif mb-6 italic">Entre em Contato</h1>
            <p className="text-secondary max-w-xl mx-auto font-light text-body-lg">
              Estamos aceitando agendamentos limitados para a temporada 2024-2025.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container pb-section relative z-20">
        <div className="flex flex-col lg:flex-row gap-fluid-lg max-w-7xl mx-auto">
          
          {/* Contact Info Side */}
          <div className="lg:w-1/3 space-y-fluid-md order-2 lg:order-1 lg:pt-8">
            <div className="hidden lg:block h-px w-20 bg-primary mb-12" />
            
            <div>
                <h3 className="text-h2 font-serif mb-6 text-primary italic">Estúdio</h3>
                <p className="text-secondary leading-relaxed font-light text-body">
                   Interessado em colaborar ou reservar uma data? Preencha o formulário e entraremos em contato em breve.
                </p>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <h5 className="font-bold text-primary text-micro uppercase tracking-widest mb-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-accent" /> Localização
                </h5>
                <p className="text-secondary text-small font-light pl-5 border-l border-transparent group-hover:border-accent transition-all duration-300">
                    {CONTACT_INFO.location}
                </p>
              </div>

              <div className="group">
                <h5 className="font-bold text-primary text-micro uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Mail className="w-3 h-3 text-accent" /> Email
                </h5>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-secondary text-small font-light hover:text-primary transition-colors block pl-5 border-l border-transparent group-hover:border-accent transition-all duration-300">
                    {CONTACT_INFO.email}
                </a>
              </div>
              
              <div className="group">
                <h5 className="font-bold text-primary text-micro uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Phone className="w-3 h-3 text-accent" /> Telefone
                </h5>
                 <p className="text-secondary text-small font-light pl-5 border-l border-transparent group-hover:border-accent transition-all duration-300">
                    {CONTACT_INFO.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Form Side - Minimalist */}
          <div className="lg:w-2/3 order-1 lg:order-2 relative">
             <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-30 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 rounded-lg"
                  >
                    <CheckCircle className="w-12 h-12 mb-4 text-accent" />
                    <h3 className="text-h2 font-serif italic text-primary mb-2">Mensagem Recebida</h3>
                    <p className="text-secondary text-body font-light">Entraremos em contato em até 24 horas.</p>
                  </motion.div>
                )}
             </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-section-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-md">
                <div className="relative group">
                  <input 
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className={`${getInputClass(!!errors.name)} peer`}
                    placeholder=" "
                  />
                  <label htmlFor="name" className={labelClass}>Nome Completo</label>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-red-500 text-[10px] uppercase tracking-wider flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative group">
                  <input 
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                    className={`${getInputClass(!!errors.email)} peer`}
                    placeholder=" "
                  />
                   <label htmlFor="email" className={labelClass}>Email</label>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-red-500 text-[10px] uppercase tracking-wider flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.email.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-md">
                 <div className="relative group">
                  <input 
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`${getInputClass(false)} peer`}
                    placeholder=" "
                  />
                   <label htmlFor="phone" className={labelClass}>Telefone</label>
                </div>
                
                {/* Custom Select */}
                <div className="relative" ref={selectRef}>
                   <label className="block text-xs font-bold uppercase tracking-widest text-secondary/60 mb-2">Interesse</label>
                   <div 
                      className="w-full py-2 border-b border-secondary/20 cursor-pointer flex justify-between items-center group hover:border-primary transition-colors"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                   >
                      <span className="text-primary text-lg font-light">{selectedLabel}</span>
                      <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                   </div>
                   
                   <AnimatePresence>
                      {isSelectOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 bg-white shadow-xl z-50 border border-muted mt-2 max-h-60 overflow-y-auto"
                        >
                            {PROJECT_TYPES.map((type) => (
                                <div
                                  key={type.value}
                                  className={`px-4 py-3 cursor-pointer hover:bg-surface transition-colors text-sm ${selectedType === type.value ? 'text-primary font-bold bg-surface' : 'text-secondary'}`}
                                  onClick={() => {
                                      setValue('type', type.value);
                                      setIsSelectOpen(false);
                                  }}
                                >
                                    {type.label}
                                </div>
                            ))}
                        </motion.div>
                      )}
                   </AnimatePresence>
                   <input type="hidden" {...register('type')} />
                </div>
              </div>
              
              <div className="relative group">
                <textarea 
                  id="message"
                  {...register('message', { required: 'Mensagem é obrigatória' })}
                  rows={1}
                  className={`${getInputClass(!!errors.message)} peer resize-none min-h-[3rem]`}
                  placeholder=" "
                  style={{ overflow: 'hidden' }}
                  onInput={(e) => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                  }}
                />
                 <label htmlFor="message" className={labelClass}>Conte sobre sua visão...</label>
                 <AnimatePresence>
                    {errors.message && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 text-red-500 text-[10px] uppercase tracking-wider flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.message.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              <div className="pt-8 flex justify-end">
                  <Button type="submit" disabled={isSubmitting} fullWidth={false} className="w-full md:w-auto px-12">
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;