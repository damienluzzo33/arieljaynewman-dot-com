import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import GivingBack from './pages/GivingBack';
import About from './pages/About';
import Bag from './pages/Bag';
import Shop from './pages/Shop';
import CustomProject from './pages/CustomProject';

export default function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/givingback" element={<GivingBack />}></Route>
                    <Route path="/shop/:path" element={<Shop />}></Route>
                    <Route path="/bag" element={<Bag />}></Route>
                    <Route path="/customproject" element={<CustomProject />}></Route>
                </Routes>
            </div>
        </Router>
    );
}
