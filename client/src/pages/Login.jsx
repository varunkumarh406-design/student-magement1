import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import NeoButton from '../components/ui/NeoButton';
import GlassCard from '../components/ui/GlassCard';
import { LogIn, Mail, Lock, UserPlus, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success('Access Granted. Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* Left Column: Premium Brand/Illustration */}
      <div className="hidden lg:flex relative bg-brand-600 items-center justify-center overflow-hidden">
        {/* Abstract shapes */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-400/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl opacity-50" 
        />
        
        <div className="relative z-10 p-12 max-w-lg text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-display font-extrabold mb-6 leading-tight uppercase tracking-tighter">
              Manage your <span className="text-brand-300">future</span> with precision.
            </h1>
            <p className="text-xl text-brand-100 mb-12 font-medium">
              Join the world's most advanced learning management platform designed for the next generation of academic excellence.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Bank-grade encryption for all your academic records.' },
              { icon: Zap, title: 'Real-time Insights', desc: 'Instantly track attendance, grades, and fee reports.' },
              { icon: Globe, title: 'Cloud-Scale Architecture', desc: 'Access your campus data from anywhere in the world.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
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

      {/* Right Column: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center p-4 bg-brand-100 dark:bg-brand-900/30 rounded-3xl mb-6 shadow-xl shadow-brand-500/10">
              <LogIn className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Sign In</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Secure access to your EduSync workspace</p>
          </motion.div>

          <GlassCard className="p-8 border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-500">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
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

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest pl-1" htmlFor="password">
                  Security Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-500">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input-premium pl-12"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <NeoButton type="submit" variant="primary" className="w-full py-4 text-lg" isLoading={loading}>
                Login to Workspace <ArrowRight className="w-5 h-5 ml-2" />
              </NeoButton>
            </form>

            <div className="mt-10 text-center pt-8 border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                New to the platform?{' '}
                <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-extrabold hover:underline underline-offset-4 inline-flex items-center gap-1 uppercase tracking-tighter">
                  Request Account <UserPlus className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </GlassCard>
          
          <p className="text-center mt-8 text-xs text-slate-400 dark:text-slate-600 font-medium uppercase tracking-widest">
            &copy; 2024 EduSync Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
