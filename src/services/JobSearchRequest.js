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
}
