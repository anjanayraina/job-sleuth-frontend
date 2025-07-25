// src/features/jobs/JobList.jsx
import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/jobApi";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchJobs({ search })
      .then(data => setJobs(data.jobs || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <input
        className="border px-4 py-2 w-full rounded mb-4"
        placeholder="Search jobs..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-4">
        {jobs.length === 0 && !loading && <div>No jobs found.</div>}
        {jobs.map(job => (
          <div key={job.id} className="p-4 border rounded shadow bg-white">
            <div className="font-bold text-lg">{job.title}</div>
            <div className="text-gray-600">{job.company} · {job.location}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tags?.map(tag => (
                <span key={tag} className="bg-blue-100 px-2 py-1 rounded text-xs">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
