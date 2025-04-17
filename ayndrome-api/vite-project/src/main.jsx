import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from '../public/components/appleclone'
import DroneApp from '../public/components/droneapp'
import ScrollToTop from '../public/components/classicScrollIssue';

// Leaflet CSS imports
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const App = () => (
  <Router>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/app/*" element={<DroneApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);