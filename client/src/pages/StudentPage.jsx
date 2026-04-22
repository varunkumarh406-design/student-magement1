import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import GlassCard from '../components/ui/GlassCard';
import NeoButton from '../components/ui/NeoButton';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  User, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Mail,
  Book
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  const { students, loading, deleteStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Student Registry</h1>
          <p className="text-slate-500 font-medium">Manage and monitor student enrollments</p>
        </div>
        <Link to="/add">
          <NeoButton variant="primary" className="shadow-brand-500/30">
            <Plus className="w-5 h-5" /> Enroll New Student
          </NeoButton>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, course or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-premium pl-12 h-14"
          />
        </div>
        <NeoButton variant="secondary" className="h-14 px-5">
          <Filter className="w-5 h-5" />
        </NeoButton>
      </div>

      {/* Table Section */}
      <GlassCard className="p-0 border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Student</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Age</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Course</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Enrollment Date</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-red-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {currentStudents.map((student, index) => (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center border border-brand-200 dark:border-brand-800">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} 
                            alt="avatar" 
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">{student.name}</p>
                          <p className="text-xs font-medium text-slate-400">ID: sm-{student.id?.slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">{student.age} years</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-lg text-xs font-bold uppercase tracking-tight">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                       {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/edit/${student.id}`}>
                           <button className="p-2 rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/40 text-brand-600 transition-all"><Edit3 className="w-4 h-4" /></button>
                        </Link>
                        <button 
                          onClick={() => deleteStudent(student.id)}
                          className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="px-8 py-5 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30">
          <p className="text-sm font-medium text-slate-400">
            Showing <span className="text-slate-900 dark:text-white font-bold">{indexOfFirstStudent + 1}</span> to <span className="text-slate-900 dark:text-white font-bold">{Math.min(indexOfLastStudent, filteredStudents.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredStudents.length}</span> students
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 dark:text-white" />
            </button>
            <button 
              disabled={indexOfLastStudent >= filteredStudents.length}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-all"
            >
              <ChevronRight className="w-5 h-5 dark:text-white" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default StudentPage;
