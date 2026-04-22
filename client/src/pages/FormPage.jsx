import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { studentServices } from '../utils/studentService';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import NeoButton from '../components/ui/NeoButton';

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEditMode); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const data = await studentServices.getById(id);
          if (data) {
            setInitialData(data);
          } else {
            setError("Student record not found in the global registry.");
          }
        } catch (err) {
          setError("Synchronization failed. Please check your network connection.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <div className="relative">
           <Loader2 className="w-16 h-16 animate-spin text-brand-600 mb-6" />
           <div className="absolute inset-0 w-16 h-16 border-4 border-brand-200 rounded-full opacity-20"></div>
        </div>
        <p className="font-display font-bold text-lg uppercase tracking-widest text-brand-900/40 dark:text-brand-100/40">Synchronizing Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-20">
        <GlassCard className="flex flex-col items-center justify-center p-12 text-center bg-rose-50/50 dark:bg-rose-950/10 border-rose-200/50">
          <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-3xl mb-6 text-rose-600">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase mb-2">Registry Error</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">{error}</p>
          <NeoButton variant="secondary" onClick={() => navigate('/students')} className="px-8 border-none">
             <ArrowLeft className="w-4 h-4" /> Back to Registry
          </NeoButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="w-full relative z-10">
      <StudentForm initialData={initialData} isEditMode={isEditMode} />
    </div>
  );
};

export default FormPage;
