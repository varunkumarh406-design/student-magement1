import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Calendar, Award, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', score: 85 },
  { name: 'Week 2', score: 78 },
  { name: 'Week 3', score: 92 },
  { name: 'Week 4', score: 88 },
  { name: 'Week 5', score: 95 },
];

const StudentProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1 flex flex-col items-center text-center py-10">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-3xl bg-brand-100 dark:bg-brand-900/30 p-1 border-2 border-brand-500/20 shadow-xl overflow-hidden">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'student'}`} 
                 alt="Avatar" 
                 className="w-full h-full object-cover rounded-2xl"
               />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
          </div>
          
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            {user?.name || 'Full Name'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Student ID: #SM-2024-001</p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 w-full px-4">
            <div className="neo-pressed p-3 rounded-2xl text-center">
              <p className="text-sm text-slate-500">Attendance</p>
              <p className="text-lg font-bold text-brand-600 dark:text-brand-400">92%</p>
            </div>
            <div className="neo-pressed p-3 rounded-2xl text-center">
              <p className="text-sm text-slate-500">GPA</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">3.85</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Academic Performance</h2>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' 
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600"><GraduationCap className="w-5 h-5"/></div>
             <h3 className="font-bold dark:text-white">Course Info</h3>
          </div>
          <p className="text-sm text-slate-500 flex justify-between"><span>Major:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">Computer Science</span></p>
          <p className="text-sm text-slate-500 flex justify-between"><span>Semester:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">Year 3, Fall</span></p>
          <p className="text-sm text-slate-500 flex justify-between"><span>Advisor:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">Dr. Sarah Miller</span></p>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Calendar className="w-5 h-5"/></div>
             <h3 className="font-bold dark:text-white">Schedule</h3>
          </div>
          <p className="text-sm text-slate-500 flex justify-between"><span>Mon - Wed:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">09:00 AM - 01:00 PM</span></p>
          <p className="text-sm text-slate-500 flex justify-between"><span>Thu - Fri:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">11:00 AM - 03:00 PM</span></p>
          <p className="text-sm text-slate-500 flex justify-between"><span>Lab:</span> <span className="font-semibold text-slate-900 dark:text-slate-200">Saturdays (Optional)</span></p>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600"><Award className="w-5 h-5"/></div>
             <h3 className="font-bold dark:text-white">Badges</h3>
          </div>
          <div className="flex gap-3">
             <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full" title="Top Performer">🏆</div>
             <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full" title="Perfect Attendance">✅</div>
             <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full" title="Community Helper">🤝</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default StudentProfile;
