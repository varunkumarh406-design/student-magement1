import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Sparkles,
  BarChart3,
  Users2,
  Lock
} from 'lucide-react';
import NeoButton from '../components/ui/NeoButton';
import GlassCard from '../components/ui/GlassCard';

const Landing = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen pt-20 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-xs border border-brand-500/10 shadow-sm">
            <Sparkles className="w-4 h-4" /> The future of campus management
          </motion.div>
          
          <motion.h1 variants={item} className="text-6xl sm:text-8xl font-display font-extrabold tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.9]">
            Education <br />
            <span className="text-gradient drop-shadow-sm">Synchronized.</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Streamline your institutional workflow with the world's most advanced, 
            lightning-fast educational ecosystem. Built for modern campuses, by modern educators.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link to="/dashboard">
              <NeoButton variant="primary" className="px-12 py-5 text-xl shadow-brand-500/40">
                Enter Workspace <ArrowRight className="w-6 h-6 ml-2" />
              </NeoButton>
            </Link>
            <Link to="/signup">
              <NeoButton variant="secondary" className="px-12 py-5 text-xl">
                Free Enrollment
              </NeoButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Proof / Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-5xl mx-auto mt-40 grid grid-cols-2 md:grid-cols-4 gap-8 px-4"
      >
        {[
          { label: 'Happy Campuses', val: '500+' },
          { label: 'Active Students', val: '1.2M' },
          { label: 'Daily Reports', val: '85k' },
          { label: 'System Uptime', val: '99.9%' }
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl font-display font-extrabold text-slate-900 dark:text-white">{s.val}</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto mt-40 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Everything you need to <span className="text-brand-600">scale.</span></h2>
          <p className="text-slate-500 mt-4 font-medium">Professional tools integrated into a single, unified interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: 'Advanced Analytics', desc: 'Predictive modeling for student success and attendance trends.', color: 'brand' },
            { icon: Users2, title: 'Registry Sync', desc: 'Manage thousands of student records with real-time distributed updates.', color: 'emerald' },
            { icon: Lock, title: 'Secure Vault', desc: 'End-to-end encryption for sensitive academic and personal data.', color: 'rose' },
            { icon: Globe, title: 'Global Access', desc: 'Your institution lives on the cloud, accessible from any world continent.', color: 'amber' },
            { icon: Zap, title: 'Speed of Light', desc: 'Built on high-performance frameworks for zero-latency management.', color: 'cyan' },
            { icon: ShieldCheck, title: 'Compliance Ready', desc: 'Fully compliant with international academic data privacy standards.', color: 'purple' }
          ].map((f, i) => (
            <GlassCard key={i} className="group p-10 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500">
               <div className={`w-14 h-14 rounded-2xl bg-${f.color}-100 dark:bg-${f.color}-900/30 text-${f.color}-600 dark:text-${f.color}-400 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <f.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{f.title}</h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                 {f.desc}
               </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Floating Blobs (specific for Landing) */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" 
      />
    </div>
  );
};

export default Landing;
