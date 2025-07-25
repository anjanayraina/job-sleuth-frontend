// src/services/jobApi.js
export async function fetchJobs({ search = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  // NOTE: For development, you might need to change the API base URL.
  // If your backend runs at http://localhost:8000, update the fetch URL.
  const res = await fetch(`/api/jobs?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
}
