// The base URL for the API backend. Provided by Vite's environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to get Authorization header
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Helper to fetch with a simple retry mechanism.
 */
const fetchWithRetry = async (url, options = {}, retries = 2) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status >= 500 && retries > 0) {
      console.warn(`Retrying... (${retries} retries left)`);
      return await fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (err) {
    if (retries > 0) {
      console.warn(`Network error. Retrying... (${retries} retries left)`);
      return await fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  }
};

/**
 * Standard helper to process the response from fetch calls.
 */
const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.statusText || 'Unable to complete request';
    throw new Error(error);
  }

  return data;
};

/**
 * Helper to map MongoDB _id to standard 'id' for React UI components.
 */
const formatStudentData = (student) => {
  if (!student) return student;
  // If the backend sends _id, map it to id and remove _id to keep frontend clean.
  const { _id, ...rest } = student;
  return {
    ...rest,
    id: _id || student.id,
  };
};

export const studentServices = {
  // GET all students
  getAll: async () => {
    // We add limit=1000 to bypass potential pagination limits temporarily,
    // ensuring we fetch all current records for the UI list.
    const response = await fetchWithRetry(`${API_BASE_URL}/students?limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    const body = await handleResponse(response);
    
    // The backend returns { total, page, data: [...] }. 
    // We map over the `data` array to normalize _id to id.
    const studentsArray = Array.isArray(body?.data) ? body.data : [];
    return studentsArray.map(formatStudentData);
  },

  // GET a single student by ID
  getById: async (id) => {
    const response = await fetchWithRetry(`${API_BASE_URL}/students/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    const student = await handleResponse(response);
    return formatStudentData(student);
  },

  // POST new student
  create: async (studentData) => {
    const response = await fetchWithRetry(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        ...studentData,
        age: Number(studentData.age)
      }),
    });

    const newStudent = await handleResponse(response);
    return formatStudentData(newStudent);
  },

  // PUT/UPDATE student
  update: async (id, updatedData) => {
    const response = await fetchWithRetry(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      // Ensure we don't accidentally send the 'id' field to Mongo if it dislikes it.
      // Send only valid schema fields.
      body: JSON.stringify({
        name: updatedData.name,
        age: Number(updatedData.age),
        course: updatedData.course
      }),
    });

    const updatedStudent = await handleResponse(response);
    return formatStudentData(updatedStudent);
  },

  // DELETE student
  delete: async (id) => {
    const response = await fetchWithRetry(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    });
    
    return await handleResponse(response);
  }
};
