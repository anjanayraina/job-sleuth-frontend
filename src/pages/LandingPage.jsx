import React from "react";

const features = [
  {
    title: "100+ Channels Aggregated",
    description: "Get jobs from top Telegram and Discord servers in one place—no need to join endless groups.",
    icon: "📡"
  },
  {
    title: "Real-Time Search & Alerts",
    description: "Be first! Set up keyword alerts and get instant notifications for your dream roles.",
    icon: "⚡"
  },
  {
    title: "Smart Filtering",
    description: "Filter by tags, platform, channel, or posting time. Never scroll through spam again.",
    icon: "🎯"
  },
  {
    title: "Direct to Source",
    description: "Apply directly on Telegram or Discord with just one click.",
    icon: "🔗"
  }
];

const sampleJobs = [
  {
    title: "Solidity Developer",
    company: "Uniswap",
    platform: "Telegram",
    channel: "@uniswap_jobs",
    tags: ["Solidity", "Remote", "DeFi"],
    time: "2 hours ago"
  },
  {
    title: "UI/UX Designer",
    company: "Meta DAO",
    platform: "Discord",
    channel: "#meta-jobs",
    tags: ["Design", "Remote", "Web3"],
    time: "4 hours ago"
  },
  {
    title: "Fullstack Engineer",
    company: "NFT Market",
    platform: "Telegram",
    channel: "@nftmarket_jobs",
    tags: ["Node.js", "Frontend", "Remote"],
    time: "6 hours ago"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto py-16 px-4 flex flex-col items-center text-center">
        <span className="inline-block mb-4 text-blue-700 font-semibold tracking-wide bg-blue-100 rounded-full px-4 py-1 text-xs uppercase">Now in Beta!</span>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Find Hidden Jobs from Telegram & Discord—Fast.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
          Tired of missing out on exclusive jobs posted in fast-moving chat groups? <span className="font-semibold text-blue-700">JobSleuth</span> brings you every opportunity from hundreds of communities—search, filter, and apply in seconds.
        </p>
        <a
          href="#job-preview"
          className="mt-8 px-8 py-4 rounded-2xl bg-blue-700 text-white font-bold shadow-lg text-lg hover:bg-purple-700 transition"
        >
          Try the Live Job Feed ↓
        </a>
      </header>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-md p-6 flex items-start gap-4 border border-blue-100 hover:scale-[1.025] transition"
          >
            <span className="text-3xl">{f.icon}</span>
            <div>
              <div className="text-xl font-bold text-blue-700">{f.title}</div>
              <div className="text-gray-600 mt-2">{f.description}</div>
            </div>
          </div>
        ))}
      </section>

      {/* "How It Works" Section */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">How It Works</h2>
        <ol className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
          <li className="flex-1 text-center px-2">
            <div className="mx-auto mb-2 text-3xl w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full font-bold">1</div>
            <div className="font-semibold">We scan 100s of job channels & servers 24/7.</div>
          </li>
          <li className="flex-1 text-center px-2">
            <div className="mx-auto mb-2 text-3xl w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full font-bold">2</div>
            <div className="font-semibold">You search and filter for exactly what you want.</div>
          </li>
          <li className="flex-1 text-center px-2">
            <div className="mx-auto mb-2 text-3xl w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full font-bold">3</div>
            <div className="font-semibold">Apply directly via Telegram or Discord. No friction!</div>
          </li>
        </ol>
      </section>

      {/* Sample Job Feed Preview */}
      <section id="job-preview" className="max-w-4xl mx-auto px-4 py-8">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Live Job Feed Preview</h3>
        <div className="grid gap-4">
          {sampleJobs.map((job, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-blue-100 shadow p-5 flex flex-col md:flex-row md:justify-between items-start md:items-center"
            >
              <div>
                <div className="text-lg font-bold">{job.title}</div>
                <div className="text-gray-600">{job.company} · <span className="text-blue-600">{job.channel}</span></div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end mt-3 md:mt-0 md:items-center">
                <span className="text-xs text-gray-500 mb-2">{job.time} · {job.platform}</span>
                <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-purple-700 transition text-sm font-semibold shadow-sm">
                  View on {job.platform}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-6 py-3 bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition">
            Browse All Jobs
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} JobSleuth · Made with ❤️ for job hunters
      </footer>
    </div>
  );
}
