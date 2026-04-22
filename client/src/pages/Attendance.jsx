import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import NeoButton from '../components/ui/NeoButton';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X, AlertCircle } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock attendance data
  const [attendance, setAttendance] = useState({
    '2026-04-01': 'present',
    '2026-04-02': 'present',
    '2026-04-03': 'absent',
    '2026-04-05': 'late',
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Attendance Tracker</h1>
          <p className="text-slate-500 mt-1">Manage and track your daily presence</p>
        </div>
        <div className="flex items-center gap-4 glass p-1.5 rounded-2xl">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"><ChevronLeft className="w-5 h-5"/></button>
          <span className="font-bold min-w-[120px] text-center dark:text-white uppercase tracking-widest">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"><ChevronRight className="w-5 h-5"/></button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, index) => (
          <div key={index} className="text-center font-bold text-xs uppercase text-slate-400 tracking-widest">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        const status = attendance[formattedDate];

        days.push(
          <motion.div
            key={cloneDay.toString()}
            whileHover={{ scale: 1.05 }}
            className={cn(
              "relative h-24 sm:h-32 border border-slate-100 dark:border-slate-800 p-2 cursor-pointer transition-all rounded-xl",
              !isSameMonth(day, monthStart) ? "opacity-20 pointer-events-none" : "hover:shadow-lg",
              isSameDay(day, new Date()) ? "bg-brand-50/50 dark:bg-brand-900/10 ring-2 ring-brand-500 ring-inset" : "",
              status === 'present' ? "bg-green-50/30" : status === 'absent' ? "bg-red-50/30" : status === 'late' ? "bg-orange-50/30" : ""
            )}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className={cn(
              "text-sm font-bold",
              isSameDay(day, new Date()) ? "text-brand-600" : "text-slate-400"
            )}>{format(day, 'd')}</span>
            
            <div className="mt-2">
              {status === 'present' && <div className="w-2 h-2 rounded-full bg-green-500 mx-auto"></div>}
              {status === 'absent' && <div className="w-2 h-2 rounded-full bg-red-500 mx-auto"></div>}
              {status === 'late' && <div className="w-2 h-2 rounded-full bg-orange-500 mx-auto"></div>}
            </div>
          </motion.div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2 mb-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <GlassCard className="p-4 sm:p-8">
            {renderDays()}
            {renderCells()}
          </GlassCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-display font-bold text-lg mb-4 dark:text-white uppercase tracking-tight">Status Legend</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500"><Check className="w-5 h-5"/></div>
                <div className="text-sm">
                  <p className="font-bold dark:text-white">Present</p>
                  <p className="text-slate-400">On time attendance</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500"><X className="w-5 h-5"/></div>
                <div className="text-sm">
                  <p className="font-bold dark:text-white">Absent</p>
                  <p className="text-slate-400">Missed session</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500"><AlertCircle className="w-5 h-5"/></div>
                <div className="text-sm">
                  <p className="font-bold dark:text-white">Late</p>
                  <p className="text-slate-400">Arrived after delay</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-brand-600 text-white border-none shadow-brand-500/30">
            <h3 className="font-display font-bold text-lg mb-2 uppercase tracking-tight">Quick Action</h3>
            <p className="text-brand-100 text-xs mb-6">Mark presence for today's morning chemistry lab session</p>
            <NeoButton variant="secondary" className="w-full text-brand-600 font-bold border-none shadow-none">
              Mark Present
            </NeoButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// Internal utility for class merging
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default Attendance;
