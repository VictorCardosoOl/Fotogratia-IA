import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    mode: 'onChange' 
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form Data:', data);
    alert('Thank you! Your message has been sent.');
    reset();
  };

  const getInputClass = (hasError: boolean) => 
    `w-full px-4 py-3 bg-surface border outline-none transition-all duration-300 placeholder-secondary/40 text-primary rounded-sm ${
      hasError 
        ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-100' 
        : 'border-accent focus:border-primary focus:ring-1 focus:ring-slate-100'
    }`;

  return (
    <Layout>
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 bg-background text-primary relative">
        <div className="container text-center relative z-10">
          <h1 className="text-fluid-h2 font-serif mb-6">Get in Touch</h1>
          <p className="text-secondary max-w-xl mx-auto font-light text-base md:text-lg">
            We are currently accepting bookings for the 2024-2025 season.
          </p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-10 order-2 lg:order-1">
            <div>
                <h3 className="text-2xl font-serif mb-4 text-primary">Studio</h3>
                <p className="text-secondary leading-relaxed font-light text-sm">
                We reply to all inquiries within 24 hours.
                </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-8 mt-1">
                    <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-1">Location</h5>
                  <p className="text-secondary text-sm font-light">{CONTACT_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 mt-1">
                    <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-1">Email</h5>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-secondary text-sm font-light hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-white p-6 md:p-14 border border-accent order-1 lg:order-2 rounded-sm shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Full Name</label>
                  <input 
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className={getInputClass(!!errors.name)}
                    placeholder="Jane Doe"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center mt-2 text-red-600"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        <span className="text-[10px] uppercase tracking-wide font-medium">{errors.name.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Email Address</label>
                  <input 
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={getInputClass(!!errors.email)}
                    placeholder="jane@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center mt-2 text-red-600"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        <span className="text-[10px] uppercase tracking-wide font-medium">{errors.email.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Phone</label>
                  <input 
                    type="tel"
                    {...register('phone')}
                    className={getInputClass(false)} // Phone is optional in this schema
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Service</label>
                  <div className="relative">
                    <select 
                      {...register('type')}
                      className="w-full px-4 py-3 bg-surface border border-accent focus:border-primary focus:ring-1 focus:ring-slate-100 outline-none transition-colors text-primary appearance-none rounded-sm"
                    >
                      <option value="wedding">Wedding / Elopement</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="commercial">Commercial / Brand</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Your Vision</label>
                <textarea 
                  {...register('message', { 
                    required: 'Please tell us a bit about your project',
                    minLength: { value: 10, message: 'Message is too short' }
                  })}
                  rows={4}
                  className={`${getInputClass(!!errors.message)} resize-none`}
                  placeholder="Tell us about your plans..."
                />
                 <AnimatePresence>
                    {errors.message && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center mt-2 text-red-600"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        <span className="text-[10px] uppercase tracking-wide font-medium">{errors.message.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} className="mt-4">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;