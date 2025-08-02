import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import JobList from './features/jobs/JobList.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Import Login page
import SignUpPage from './pages/SignUpPage.jsx'; // Import SignUp page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add Login route */}
                <Route path="/signup" element={<SignUpPage />} /> {/* Add SignUp route */}
            </Routes>
        </Router>
    );
}

export default App;