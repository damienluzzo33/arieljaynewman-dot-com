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
import ArtPiecePage from './components/ArtPiecePage';
import { useState, useEffect } from 'react';

export default function App() {
    let localStore = localStorage.getItem('ajn-user-store');
    let userStore = localStore ? JSON.parse(localStore) : [];

    const [userBagItems, setUserBagItems] = useState(userStore);

    const hasBagItem = (item) => {
        console.log(userBagItems);
        if (userBagItems.length !== 0) {
            for (let i = 0; i < userBagItems.length; i++) {
                if (
                    userBagItems[i] &&
                    userBagItems[i].item &&
                    userBagItems[i].item.key === item.key
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
        const bagItems = [...userBagItems];
        bagItems.push(itemToAdd);
        setUserBagItems(bagItems);
    };

    const removeBagItem = (item) => {
        console.log(item.key)
        console.log(userBagItems)
        const bagItems = [...userBagItems].filter(
            (bagItem) => bagItem.item.key !== item.key
        );
        setUserBagItems(bagItems);
    };

    const updateBagItems = (item, action, value = 0) => {
        const bagItems = [...userBagItems].filter(
            (bagItem) => bagItem.item.key === item.key
        );
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

        if (foundItem.quantity === 0) {
            removeBagItem(foundItem);
        }

        const theRest = userBagItems.filter(bagItem => bagItem.item.key !== item.key);

        const newArr = [...theRest, ...bagItems];

        newArr.sort((a,b) => a.key.charCodeAt(0) - b.key.charCodeAt(0) )

        setUserBagItems(newArr);
    };

    useEffect(() => {
        localStorage.setItem('ajn-user-store', JSON.stringify(userBagItems));
    }, [userBagItems]);

    return (
        <Router>
            <div className="App">
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
                                addBagItem={addBagItem}
                                removeBagItem={removeBagItem}
                                updateBagItems={updateBagItems}
                                hasBagItem={hasBagItem}
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
