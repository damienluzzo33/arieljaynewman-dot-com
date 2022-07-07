import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Link } from "react-router-dom";

let shopItems = [
    {
        title: "Take My Hand",
        imageUrl: "https://images.unsplash.com/photo-1645680827507-9f392edae51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
        type: "digital art",
        pod: true,
        original: false,
        leprints: true,
        price: {
            limitededition: 110,
            pod: 50
        },     
        key: "takemyhand",
        choice: ""
    },
    {
        title: "Pot Of Flowers",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=745&q=80",
        type: "original art",
        pod: true,
        original: true,
        leprints: true,
        price: {
            original: 250,
            limitededition: 100,
            pod: 50
        },     
        key: "potofflowers",
        choice: ""
    },
    {
        title: "Random Swipes",
        imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=866&q=80",
        type: "original art",
        pod: true,
        original: true,
        leprints: true,
        price: {
            original: 250,
            limitededition: 100,
            pod: 50
        },     
        key: "randomswipes",
        choice: ""
    },
    {
        title: "High School Geometry",
        imageUrl: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        type: "original art",
        pod: true,
        original: false,
        leprints: true,
        price: {
            original: 300,
            limitededition: 120,
            pod: 60
        },        
        key: "hsgeometry",
        choice: ""
    }
]

export default function ShopArt() {

    const defaultRadio = {
        bestsellers: false,
        newest: false,
    }

    const defaultSlider = [0, 1500];

    const [sliderValue, setSliderValue] = React.useState(defaultSlider);
    const [radioFilters, setRadioFilters] = useState(defaultRadio);
    const [cartItems, setCartItems] = useState(shopItems);

    const sliderAria = () => {
        return `${sliderValue[0]} to ${sliderValue[1]}`;
    }

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const handleRadioChange = (event) => {
        const radioBtn = event.target.id;
        const newFilters = {
            ...defaultRadio,
            [radioBtn]: true
        }
        setRadioFilters(newFilters);
    }

    const handleSorting = (slider, radio) => {
        let filteredAndSorted = shopItems.filter((item) => {
            if (item.price.original <= slider[1] && item.price.original >= slider[0]) {
                return item;
            }
        })

        if (radio.bestsellers) filteredAndSorted.sort((a,b) => a.popularity - b.popularity);
        else if (radio.newest) filteredAndSorted.sort((a,b) => a.dateAdded - b.dateAdded);

        setCartItems(filteredAndSorted);
    }

    const handleResetFilters = (event) => {
        event.preventDefault();
        setRadioFilters(defaultRadio);
        setSliderValue(defaultSlider);
        setCartItems(shopItems);
    }

    useEffect(() => {
        handleSorting(sliderValue, radioFilters);
    }, [radioFilters, sliderValue])

    return (
        <div className="shop-art">
            <div className="filters">
                <div className="toggle-filter-div">
                    <h2>filters</h2>
                    <img src="../images/right_arrow.png" alt="right arrow" />
                </div>
                
                <div className="sort-by-filter">
                    <h2>sort by</h2>
                    <div className="radiobtn">
                        <input onClick={handleRadioChange} type="radio" name="radioFilter" id="bestsellers"/>
                        <label htmlFor="bestsellers">Best Sellers</label>
                    </div>
                    <div className="radiobtn">
                        <input onClick={handleRadioChange} type="radio" name="radioFilter" id="newest" />
                        <label htmlFor="newest">Newest</label>
                    </div>
                    <div className="priceslider">
                        <label htmlFor="pricelider">Price</label>
                        <Box sx={{ width: 300 }}>
                            <Slider
                                getAriaLabel={() => 'Price Range'}
                                value={sliderValue}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={sliderAria}
                                min={0}
                                max={1500}
                                step={10}
                            />
                        </Box>
                    </div>
                    <button onClick={handleResetFilters}>RESET FILTERS</button>
                </div>
            </div>
            <div className="shop-art-main">
                <div className="shop-art-intro">
                    <h2>SHOP ART</h2>
                    <p>Here you will find original paintings and drawings, print-on-demand items and limited edition prints.</p>
                </div>
                <div className="shop-art-items">
                    {cartItems.map((item) => (
                        item.type === "original art" &&
                        <div className="shop-art-item" key={item.key}>
                            <div className="shop-item-title">
                                <h3>{item.title}</h3>
                                <Link to={`/${item.key}`}>
                                    <img className="right-arrow-icon" src="../images/right_arrow_oj.png" alt="right arrow" />
                                </Link>
                            </div>
                            
                            <div className="shop-item-img" style={{backgroundImage: `url(${item.imageUrl})`}}></div>
                            <div className="shop-art-save">&#x2764;</div>
                            {item.original && (
                                <div className="btn-holders">
                                    <button className="shop-art-button orig-art-button">ORIGINAL ART</button>
                                    <button className="shop-add add-orig">{item.price.original} - ADD TO BAG</button>
                                </div>
                            )}
                            {item.pod && (
                                <div className="btn-holders">
                                    <button className="shop-art-button pod-art-button">PRINT-ON-DEMAND</button>
                                    <button className="shop-add add-pod">DISCOVER</button>
                                </div>
                                
                            )}
                            {item.leprints && (
                                <div className="btn-holders">
                                    <button className="le-art-button shop-art-button">LIMITED EDITION PRINTS</button>
                                    <button className="shop-add add-le">{item.price.limitededition}</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}