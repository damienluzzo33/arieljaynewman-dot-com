import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { sortBagItems } from './helpers/helpers';

import Contact from './pages/Contact';
import GivingBack from './pages/GivingBack';
import About from './pages/About';
import Bag from './pages/Bag';
import Shop from './pages/Shop';
import CustomProject from './pages/CustomProject';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import ArtPiecePage from './components/ArtPiecePage';

import './App.css';
import ScrollToTop from './components/ScrollFix';

export default function App() {
    let localStore = localStorage.getItem('ajn-user-store');
    let userStore = localStore ? JSON.parse(localStore) : [];

    const [userBagItems, setUserBagItems] = useState(userStore);

    const hasBagItem = (item, medium, size) => {
        if (userBagItems.length !== 0) {
            for (let i = 0; i < userBagItems.length; i++) {
                if (
                    userBagItems[i] &&
                    userBagItems[i].item &&
                    userBagItems[i].item.key === item.key && userBagItems[i].medium === medium && userBagItems[i].size === size
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const addBagItem = (item, quantity, price, size, medium, artType) => {
        const itemToAdd = {
            item: item,
            quantity: quantity,
            price: price,
            size: size,
            medium: medium,
            artType: artType,
            key: item.key,
        };
        let bagItems = [...userBagItems];
        bagItems.push(itemToAdd);

        bagItems = sortBagItems(bagItems);
        setUserBagItems(bagItems);
    };

    const removeBagItem = (item) => {
        const bagItems = userBagItems.filter(
            (bagItem) => {
                if (!(bagItem.key === item.key && bagItem.medium === item.medium && bagItem.size === item.size)) {
                    return bagItem
                }
            });
        setUserBagItems(bagItems);
    };

    const updateBagItems = (item, action, value = 0) => {
        const bagItems = userBagItems.filter((bagItem) => {
            if (bagItem.item.key === item.key && bagItem.medium === item.medium && bagItem.size === item.size) {
                return bagItem
            }
        });
        let foundItem = bagItems[0];

        if (action === 'add') {
            foundItem.quantity += value;
        } else if (action === 'minus') {
            foundItem.quantity -= 1;
        } else if (action === 'artType') {
            foundItem.artType = value;
        } else if (action === 'size') {
            foundItem.size = value;
        } else if (action === 'medium') {
            foundItem.medium = value;
        }

        const theRest = userBagItems.filter(bagItem => {
            if (!(bagItem.item.key === item.key && bagItem.medium === item.medium && bagItem.size === item.size)) {
                return bagItem
            }
        });
        let newArr = [...theRest, foundItem];
        newArr = sortBagItems(newArr);
        setUserBagItems(newArr);
    };

    useEffect(() => {
        let current = sortBagItems(userBagItems);
        localStorage.setItem('ajn-user-store', JSON.stringify(current));
    }, [userBagItems]);

    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                <Navbar />
                <Routes>    
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/givingback" element={<GivingBack />}></Route>
                    <Route
                        path="/shop/:path"
                        element={
                            <Shop
                                addBagItem={addBagItem}
                                removeBagItem={removeBagItem}
                                updateBagItems={updateBagItems}
                                hasBagItem={hasBagItem}
                            />
                        }
                    ></Route>
                    <Route
                        path="/bag"
                        element={
                            <Bag
                                bagItems={userBagItems}
                                removeBagItem={removeBagItem}
                                updateBagItems={updateBagItems}
                            />
                        }
                    ></Route>
                    <Route
                        path="/customproject"
                        element={<CustomProject />}
                    ></Route>
                    <Route
                        path="/art/:artPiece"
                        element={
                            <ArtPiecePage
                                addBagItem={addBagItem}
                                removeBagItem={removeBagItem}
                                updateBagItems={updateBagItems}
                                hasBagItem={hasBagItem}
                            />
                        }
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
}
