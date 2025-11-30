const API_BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  fetchFormSchema: async () => {
    const response = await fetch(`${API_BASE_URL}/form-schema`);
    if (!response.ok) throw new Error('Failed to fetch form schema');
    return response.json();
  },

  submitForm: async (data) => {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  },

  fetchSubmissions: async ({ page, limit, sortBy, sortOrder }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy: sortBy || 'createdAt',
      sortOrder: sortOrder || 'desc',
    });
    const response = await fetch(`${API_BASE_URL}/submissions?${params}`);
    if (!response.ok) throw new Error('Failed to fetch submissions');
    return response.json();
  }
};