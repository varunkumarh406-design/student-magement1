import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentServices } from '../utils/studentService';
import { toast } from 'react-toastify';
import GlassCard from './ui/GlassCard';
import NeoButton from './ui/NeoButton';
import { motion } from 'framer-motion';
import { User, Book, Hash, Save, X, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const StudentForm = ({ initialData, isEditMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    age: initialData?.age || '',
    course: initialData?.course || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await studentServices.update(initialData.id, formData);
        toast.success('Registry updated successfully');
      } else {
        await studentServices.create(formData);
        toast.success('New student enrolled successfully');
      }
      navigate('/students');
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : parseInt(value)) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-brand-600 font-bold transition-colors uppercase tracking-widest text-xs"
        >
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm group-hover:bg-brand-50 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Registry
        </button>
        
        <div className="flex items-center gap-2 px-4 py-1.5 glass rounded-full text-brand-600 dark:text-brand-400 font-bold text-[10px] uppercase tracking-[0.2em] border border-brand-500/10">
          <Sparkles className="w-3 h-3" /> {isEditMode ? 'Editing Profile' : 'New Enrollment'}
        </div>
      </motion.div>

      <GlassCard className="p-10 border-none shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-10 text-center">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white uppercase tracking-tighter">
              {isEditMode ? 'Update Student Record' : 'Enrollment Application'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Please provide accurate institutional data below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 pl-1">Full Legal Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Varun Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-premium pl-12 h-14"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 pl-1">Student Age</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Hash className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    required
                    min="5"
                    max="100"
                    placeholder="e.g. 21"
                    value={formData.age}
                    onChange={handleChange}
                    className="input-premium pl-12 h-14"
                  />
                </div>
              </div>

              {/* Course Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 pl-1">Assigned Course</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Book className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="course"
                    required
                    placeholder="e.g. Computer Science"
                    value={formData.course}
                    onChange={handleChange}
                    className="input-premium pl-12 h-14"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <NeoButton 
              type="submit" 
              variant="primary" 
              className="flex-1 py-4 text-lg shadow-brand-500/30"
              isLoading={loading}
            >
              {isEditMode ? <><Save className="w-5 h-5" /> Save Changes</> : <><CheckCircle2 className="w-5 h-5" /> Complete Enrollment</>}
            </NeoButton>
            
            <NeoButton 
              type="button" 
              variant="secondary" 
              className="py-4 px-8 border-none"
              onClick={() => navigate('/students')}
            >
              Cancel
            </NeoButton>
          </div>
        </form>
      </GlassCard>
      
      <div className="mt-8 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
         <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Registry Transaction Enabled
      </div>
    </div>
  );
};

// Internal icon for consistency
const ShieldCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default StudentForm;
