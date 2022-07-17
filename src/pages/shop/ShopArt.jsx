import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Link } from "react-router-dom";
import { data } from "../../data/art.json"

export default function ShopArt(props) {

    const {shopArtProp} = props;

    const defaultRadio = {
        bestsellers: false,
        newest: false,
    }

    const defaultSlider = [0, 1500];

    const [sliderValue, setSliderValue] = React.useState(defaultSlider);
    const [radioFilters, setRadioFilters] = useState(defaultRadio);
    const [cartItems, setCartItems] = useState(data);

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

        console.log(data);
        console.log(slider);
        console.log(radio);

        let filteredAndSorted = data.filter((item) => {
            if (item.price.original <= slider[1] && item.price.original >= slider[0]) {
                return item;
            }
        })

        console.log(filteredAndSorted);

        filteredAndSorted.sort((a, b) => {
            if (radio.bestsellers) {
                return b.totalSales - a.totalSales;
            } else if (radio.newest) {
                let arrA = a.dateAdded.split("/");
                let arrB = b.dateAdded.split("/");
                if (parseInt(arrB[2]) > parseInt(arrA[2])) {
                    return 1;
                } else if (parseInt(arrB[2]) < parseInt(arrA[2])) {
                    return -1;
                } else if (parseInt(arrB[0]) > parseInt(arrA[0])) {
                    return 1;
                } else if (parseInt(arrB[0]) < parseInt(arrA[0])) {
                    return -1;
                } else if (parseInt(arrB[1]) > parseInt(arrA[1])) {
                    return 1;
                } else if (parseInt(arrB[1]) < parseInt(arrA[1])) {
                    return -1;
                } else return 0;
            } else {
                return 0;
            }
        })

        console.log(filteredAndSorted);

        setCartItems(filteredAndSorted);
    }

    const handleResetFilters = (event) => {
        event.preventDefault();
        setRadioFilters(defaultRadio);
        setSliderValue(defaultSlider);
        setCartItems(data);
        let radio1 = document.getElementById('bestsellers');
        let radio2 = document.getElementById('newest');
        radio1.checked = false;
        radio2.checked = false;
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
                                <Link to={`/art/${item.key}`}>
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