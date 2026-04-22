import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import NeoButton from '../components/ui/NeoButton';
import GlassCard from '../components/ui/GlassCard';
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      await signup(formData);
      toast.success('Account Created! Welcome to the premium community.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* Right Column (Swapped for Signup): Premium Brand/Illustration */}
      <div className="hidden lg:flex relative bg-brand-600 items-center justify-center overflow-hidden order-last">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-400/30 rounded-full blur-3xl opacity-50" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-50" 
        />
        
        <div className="relative z-10 p-12 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 text-brand-100 text-sm font-bold uppercase tracking-widest border border-white/10">
              <Sparkles className="w-4 h-4" /> Start your journey
            </div>
            <h1 className="text-6xl font-display font-extrabold mb-6 leading-tight uppercase tracking-tighter">
              A <span className="text-brand-300 underline decoration-brand-200">smarter</span> way to manage campus.
            </h1>
            <p className="text-xl text-brand-100 mb-12 font-medium">
              Create your educator or administrator profile and get instant access to powerful analytics and student management tools.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: ShieldCheck, title: 'Identity Verified', desc: 'Secure profile creation with multi-factor authentication support.' },
              { icon: Zap, title: 'Global Sync', desc: 'Your workspace is available on any device, anywhere.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-brand-200 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Column: Register Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center p-4 bg-brand-100 dark:bg-brand-900/30 rounded-3xl mb-6 shadow-xl shadow-brand-500/10">
              <UserPlus className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Join Community</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Join 500+ campuses already using EduSync</p>
          </motion.div>

          <GlassCard className="p-8 border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1">
                  Full Legal Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-500 text-slate-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    name="name"
                    required
                    className="input-premium pl-12"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1">
                   Institutional Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-500 text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="input-premium pl-12"
                    placeholder="name@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1">
                     Password
                   </label>
                   <input
                    name="password"
                    type="password"
                    required
                    className="input-premium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1">
                     Confirm
                   </label>
                   <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="input-premium"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <NeoButton type="submit" variant="primary" className="w-full py-4 text-lg" isLoading={loading}>
                Create Hub Access <ArrowRight className="w-5 h-5 ml-2" />
              </NeoButton>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Already registered?{' '}
                <Link to="/login" className="text-brand-600 dark:text-brand-400 font-extrabold hover:underline underline-offset-4 inline-flex items-center gap-1 uppercase tracking-tighter">
                  Sign In <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Signup;
