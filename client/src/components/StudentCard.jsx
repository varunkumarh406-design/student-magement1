import React from 'react';
import { Pencil, Trash2, UserCircle2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

// Reusable component for displaying student information in a card layout
// Demonstrates component composition and props usage
const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="glass-card p-6 flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
          <UserCircle2 className="w-8 h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {student.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">Age: {student.age}</p>
        </div>
      </div>

      {/* Course Details */}
      <div className="bg-slate-50 rounded-xl p-3 mb-6 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-sm font-medium text-slate-700 truncate">
          {student.course}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
        <Link to={`/edit/${student.id}`} className="w-full">
          <Button variant="secondary" className="w-full text-sm py-2">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </Button>
        </Link>
        <Button 
          variant="danger" 
          className="w-full text-sm py-2"
          onClick={() => onDelete(student.id)}
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
