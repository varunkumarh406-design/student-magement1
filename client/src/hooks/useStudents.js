import { useState, useEffect, useCallback } from 'react';
import { studentServices } from '../utils/studentService';
import { toast } from 'react-toastify';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data Fetching Simulation
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentServices.getAll();
      setStudents(data);
    } catch (err) {
      const msg = err.message || 'Failed to fetch students';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial data (simulate componentDidMount)
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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
