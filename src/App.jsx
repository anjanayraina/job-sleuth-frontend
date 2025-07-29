import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import JobList from './features/jobs/JobList.jsx';
import AboutPage from './pages/AboutPage.jsx'; // Import the new page
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/about" element={<AboutPage />} /> {/* Add the new route */}
            </Routes>
        </Router>
    );
}

export default App;