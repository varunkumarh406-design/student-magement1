import React from 'react';
import { useStudents } from '../hooks/useStudents';
import GlassCard from '../components/ui/GlassCard';
import NeoButton from '../components/ui/NeoButton';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  MoreHorizontal,
  Plus,
  Search,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const data = [
  { name: 'Jan', students: 40 },
  { name: 'Feb', students: 52 },
  { name: 'Mar', students: 48 },
  { name: 'Apr', students: 61 },
  { name: 'May', students: 55 },
  { name: 'Jun', students: 67 },
];

const genderData = [
  { name: 'Male', value: 45 },
  { name: 'Female', value: 55 },
];

const Dashboard = () => {
  const { students, loading } = useStudents();

  const stats = [
    { name: 'Total Students', value: students.length, icon: Users, color: 'brand', trend: '+12%' },
    { name: 'Average Attendance', value: '94%', icon: Calendar, color: 'emerald', trend: '+2%' },
    { name: 'Active Courses', value: '18', icon: BookOpen, color: 'amber', trend: '0%' },
    { name: 'Pending Fees', value: '$2.4k', icon: PieChartIcon, color: 'rose', trend: '-5%' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <GlassCard className="relative overflow-hidden bg-brand-600 border-none p-8 text-white shadow-brand-500/30">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-display font-bold mb-4 tracking-tight uppercase">Welcome back, Admin!</h1>
          <p className="text-brand-100 text-lg mb-8 leading-relaxed">
            Everything looks good today. You have <span className="font-bold text-white uppercase underline decoration-2 underline-offset-4">3 new students</span> waiting for enrollment approval and 2 upcoming faculty meetings.
          </p>
          <div className="flex gap-4">
            <Link to="/add">
              <NeoButton variant="secondary" className="px-8 border-none text-brand-600 font-bold">
                <Plus className="w-5 h-5" /> Enroll Student
              </NeoButton>
            </Link>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="group hover:bg-white dark:hover:bg-slate-900 transition-colors duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trend.startsWith('+') ? "bg-emerald-100 text-emerald-600" : stat.trend.startsWith('-') ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"
              )}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : null}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{stat.name}</p>
            <p className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-xl dark:text-white uppercase tracking-tight">Enrollment Growth</h3>
            <select className="bg-transparent border-none text-sm font-bold text-slate-400 outline-none cursor-pointer">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' }}
                />
                <Bar dataKey="students" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
           <h3 className="font-display font-bold text-xl mb-8 dark:text-white uppercase tracking-tight">Student Demographics</h3>
           <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold dark:text-white">100%</span>
                <span className="text-xs text-slate-400 uppercase">Total</span>
              </div>
           </div>
           <div className="mt-4 flex flex-col gap-2">
              {genderData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-slate-500">{d.name}</span>
                  </div>
                  <span className="font-bold dark:text-white">{d.value}%</span>
                </div>
              ))}
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

// Internal utility for class merging
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default Dashboard;
