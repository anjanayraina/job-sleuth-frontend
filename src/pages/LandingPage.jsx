import React from "react";
import "../style.css";

const jobs = [
  {
    title: "Senior Solidity Engineer",
    company: "BlockChain Co.",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?blockchain",
  },
  {
    title: "Frontend Developer",
    company: "WebCrafters Inc.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?frontend",
  },
  {
    title: "Product Manager",
    company: "Innovate Solutions",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?product",
  },
  {
    title: "Data Scientist",
    company: "Data Insights Corp.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?data",
  },
  {
    title: "UX Designer",
    company: "User Experience Studio",
    platform: "Telegram",
    image: "https://source.unsplash.com/random/300x300?ux",
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps Ltd.",
    platform: "Discord",
    image: "https://source.unsplash.com/random/300x300?devops",
  },
];

const LandingPage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">JobSleuth</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
        <button className="browse-btn">Browse Jobs</button>
      </header>

      <section className="hero">
        <h1>Find Hidden Jobs from Telegram & Discord</h1>
        <p>The fastest way to discover exclusive jobs shared in fast-moving chat groups.</p>
        <button className="cta-btn">Browse Live Jobs</button>
      </section>

      <section className="latest-jobs">
        <h2>Latest Jobs</h2>
        <div className="jobs-grid">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-card">
              <img src={job.image} alt={job.title} />
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <span className={`platform ${job.platform.toLowerCase()}`}>{job.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2024 JobSleuth. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
