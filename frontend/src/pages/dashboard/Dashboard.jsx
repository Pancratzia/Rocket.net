import React from 'react';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
        <video className="video-dashboard" autoPlay loop muted>
            <source src="./vdashboard.mp4" type="video/mp4"/>
            <source src="./estrellas.webm" type="video/webm"/>
        </video>
        </div>
    );
}

export default Dashboard;