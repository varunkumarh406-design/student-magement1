import { useState, useEffect, useCallback } from 'react';
import { studentServices } from '../utils/studentService';
import { toast } from 'react-toastify';
import { useSocket } from './useSocket';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const socket = useSocket();

  // Data Fetching Simulation
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentServices.getAll();
      // Ensure data is array; studentServices.getAll() returns {students: [...], totalPages, etc.} based on pagination.
      // Wait, let's verify what studentServices.getAll() returns. 
      // Usually it's either an array or an object with paginated data.
      setStudents(data.students || data || []);
    } catch (err) {
      const msg = err.message || 'Failed to fetch students';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Real-time Socket.IO Listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('studentCreated', (newStudent) => {
      setStudents(current => {
        // Prevent duplicate if already added by local state update
        if (current.find(s => s._id === newStudent._id || s.id === newStudent.id)) return current;
        return [newStudent, ...current];
      });
      toast.info('New student added');
    });

    socket.on('studentUpdated', (updatedStudent) => {
      setStudents(current => 
        current.map(s => (s._id === updatedStudent._id || s.id === updatedStudent.id) ? updatedStudent : s)
      );
      toast.info('Student updated');
    });

    socket.on('studentDeleted', (deletedId) => {
      setStudents(current => 
        current.filter(s => s._id !== deletedId && s.id !== deletedId)
      );
    });

    return () => {
      socket.off('studentCreated');
      socket.off('studentUpdated');
      socket.off('studentDeleted');
    };
  }, [socket]);

  // Handle deletions locally and then simulate server deletion
  const deleteStudent = async (id) => {
    // Keep a copy in case we need to revert
    const previousStudents = [...students];
    try {
      // Optimistic upate: Remove from UI immediately for snappier feel
      // (This uses closure inside the setStudents callback to access latest state safely)
      setStudents(current => current.filter(student => student.id !== id));
      
      // Real API call to delete
      await studentServices.delete(id);
      toast.success("Student deleted successfully");
    } catch (err) {
      toast.error('Failed to delete student');
      // If failed, revert the optimistic update
      setStudents(previousStudents);
    }
  };

  return {
    students,
    loading,
    error,
    refreshStudents: fetchStudents,
    deleteStudent
  };
};
