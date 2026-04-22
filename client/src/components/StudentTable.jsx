import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

// Reusable Table component focusing on semantic HTML representation of tabular data
const StudentTable = ({ students, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-500">
        No students available. Please add some.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Age</th>
              <th className="px-6 py-4 font-medium">Course</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {student.age}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/edit/${student.id}`}>
                      <Button variant="secondary" className="px-3 py-1.5 text-xs">
                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      className="px-3 py-1.5 text-xs"
                      onClick={() => onDelete(student.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
