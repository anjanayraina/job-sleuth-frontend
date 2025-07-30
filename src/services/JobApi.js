// src/services/JobApi.js
import { JobSearchRequest } from "./JobSearchRequest";

export async function fetchJobs(jobSearchRequest = new JobSearchRequest()) {
  const params = new URLSearchParams();
  if (jobSearchRequest.search) params.append("search", jobSearchRequest.search);
  if (jobSearchRequest.location) params.append("location", jobSearchRequest.location);
  if (jobSearchRequest.company) params.append("company", jobSearchRequest.company);
  if (jobSearchRequest.jobType) params.append("jobType", jobSearchRequest.jobType);
  if (jobSearchRequest.minSalary) params.append("minSalary", jobSearchRequest.minSalary);
  if (jobSearchRequest.maxSalary) params.append("maxSalary", jobSearchRequest.maxSalary);
  if (jobSearchRequest.tags && jobSearchRequest.tags.length > 0) {
    jobSearchRequest.tags.forEach(tag => params.append("tags", tag));
  }

  const res = await fetch(`/api/jobs?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
}
export async function fetchJobById(id) {
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job details");
  return await res.json();
}
