export class JobSearchRequest {
  constructor({
    search = "",
    location = "",
    tags = [],
    company = "",
    jobType = "",
    minSalary = "",
    maxSalary = ""
  } = {}) {
    this.search = search;
    this.location = location;
    this.tags = tags;
    this.company = company;
    this.jobType = jobType;
    this.minSalary = minSalary;
    this.maxSalary = maxSalary;
  }

  
  toQueryParams() {
    const params = new URLSearchParams();
    if (this.search) params.append("search", this.search);
    if (this.location) params.append("location", this.location);
    if (this.company) params.append("company", this.company);
    if (this.jobType) params.append("jobType", this.jobType);
    if (this.minSalary) params.append("minSalary", this.minSalary);
    if (this.maxSalary) params.append("maxSalary", this.maxSalary);
    if (this.tags && this.tags.length > 0) {
      this.tags.forEach(tag => params.append("tags", tag));
    }
    return params.toString();
  }

  // Optional: You could add validation or normalization here!
  isValid() {
    // e.g., only allow numbers for salary
    if (this.minSalary && isNaN(Number(this.minSalary))) return false;
    if (this.maxSalary && isNaN(Number(this.maxSalary))) return false;
    return true;
  }
}
