import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [dropdown, setDropdown] = React.useState(false);

    const openMenu = (event) => {
        console.log('Opened!');
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.left = '0px';
    };

    const closeMenu = (event) => {
        console.log('Closed!');
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.left = '-100%';
    };

    const openDropdown = (event) => {
        console.log('Opened!');
        const sidebar = document.querySelectorAll('.hide');
        sidebar.forEach((element) => {
            element.classList.remove('hide');
            element.classList.add('show');
        });
        setDropdown(true);
    };

    const closeDropdown = (event) => {
        console.log('Opened!');
        const sidebar = document.querySelectorAll('.show');
        sidebar.forEach((element) => {
            element.classList.remove('show');
            element.classList.add('hide');
        });
        setDropdown(false);
    };

    const flipArrow = (event) => {
        const arrow = document.getElementById('arrowIcon');
        if (
            arrow.style.transform !== 'rotate(0deg)' &&
            arrow.style.transform !== 'rotate(180deg)'
        ) {
            arrow.style.transform = 'rotate(180deg)';
        }
        if (arrow.style.transform === 'rotate(180deg)') {
            arrow.style.transform = 'rotate(0deg)';
        } else {
            arrow.style.transform = 'rotate(180deg)';
        }
    };

    const artOptions = ["original", "ondemand", "limitededition"]

    return (
        <React.Fragment>
            <header className="navbar">
                <nav>
                    <Link to="/">
                        <div className="nav-logo">
                            <h2>ARIEL JAY</h2>
                            <h2>NEWMAN</h2>
                        </div>
                    </Link>
                    <div className="nav-menu">
                        <img
                            className="cart-nav"
                            src="../images/Bag.png"
                            alt="cart icon"
                        />
                        <img
                            onClick={openMenu}
                            src="../images/Menu Rounded.png"
                            alt="menu icon"
                        />
                    </div>
                </nav>
            </header>
            <aside className="sidebar">
                <div className="exit-container">
                    <img
                        className="exit-btn"
                        src="../images/exit-icon.png"
                        alt="exit"
                        onClick={closeMenu}
                    />
                </div>
                <ul className="sidebar-options">
                    <li>
                        <Link to={`/about`} onClick={closeMenu}>
                            about
                        </Link>
                    </li>
                    <li
                        className="dropdown-tab"
                        onClick={dropdown ? closeDropdown : openDropdown}
                    >
                        shop
                        {
                            <img
                                id="arrowIcon"
                                src="../images/sort-up-blue.png"
                                alt="toggle dropdown"
                                onClick={flipArrow}
                            />
                        }
                    </li>
                    <li className="hide no-hover">
                        <ul className="hide shop-options">
                            {artOptions.map((option) => (
                                <li className="hide" key={option}>
                                    <Link
                                        to={`/shop/shopart`}
                                        onClick={closeMenu}
                                        state={{artTypeProp: option}}
                                    >
                                        {option} artwork
                                    </Link>
                                </li>
                            ))}
                            <li className="hide">
                                <Link to={`/shop/shopdigital`} onClick={closeMenu}>
                                    nfts / tattoos / graphics
                                </Link>
                            </li>
                            <li className="hide">
                                <Link to={`/shop/more`} onClick={closeMenu}>
                                    see more options
                                </Link>
                            </li>
                            <li className="hide">
                                <Link to={`/shop/sale`} onClick={closeMenu}>
                                    on sale now
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={`/contact`} onClick={closeMenu}>
                            contact
                        </Link>
                    </li>

                    <li>
                        <Link to={`/givingback`} onClick={closeMenu}>
                            giving back
                        </Link>
                    </li>
                    <li>account</li>
                    <li className="shop-item">
                        <Link to={`/bag`} onClick={closeMenu}>
                            <img
                                className="cart-side"
                                src="../images/Bag.png"
                                alt="cart icon"
                            />
                        </Link>
                    </li>
                </ul>
                <br />
                <Link to={`/customproject`} onClick={closeMenu}>
                    <h2>Start a custom project</h2>
                </Link>

                <footer className="sidebar-footer">
                    <Link to={`/`} onClick={closeMenu}>
                        <div className="nav-logo">
                            <h2>ARIEL JAY</h2>
                            <h2>NEWMAN</h2>
                        </div>
                    </Link>
                </footer>
            </aside>
        </React.Fragment>
    );
}
