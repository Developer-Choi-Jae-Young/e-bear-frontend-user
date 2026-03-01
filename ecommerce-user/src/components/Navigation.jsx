import React, { useState } from 'react';
import './Navigation.css';
import { MenuIcon } from '../components/CustomTag';
import SideMenu from './SideMenu';

function Navigation({ navigationMenu }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev); // 현재 상태의 반대 값으로 토글합니다.
    };

    return (
        <nav className="navigation">
            <div className="main-nav-content">
                <div className="menu-button" onClick={handleMenuToggle}>
                    <MenuIcon className="menu-icon" />
                </div>
                <div className="nav-links">
                    {
                        navigationMenu.map((item, index) => (
                            index === 0 ? (
                                <span className="nav-link active" key={index}>
                                    {item.title}</span>
                            ) : (
                                <span className="nav-link" key={index}>
                                    {item.title}</span>
                            )))
                    }
                </div>
            </div>
            {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
        </nav>
    )
}

export default Navigation;