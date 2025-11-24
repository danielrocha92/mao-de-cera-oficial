// Updated hamburger menu styling to match Fastshop design.

import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="hamburger">
                <div className="line" style={{margin: '0', padding: '0', height: '2px'}}></div>
                <div className="line" style={{margin: '0', padding: '0', height: '2px'}}></div>
                <div className="line" style={{margin: '0', padding: '0', height: '2px'}}></div>
            </div>
            <style>{`  
                .hamburger:hover {
                    background-color: #e0f7fa; // Soft blue background
                }
                .line {
                    background-color: gray; // Updated to gray when scrolled
                }
            `}</style>
        </div>
    );
};

export default Header;