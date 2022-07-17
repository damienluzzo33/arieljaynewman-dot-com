import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data/art.json';

export default function Bag(props) {

    const { bagItems, removeBagItem, updateBagItems } = props;

    let filteredData = data;
    for (let bagItem of bagItems) {
        filteredData = filteredData.filter((item) => item.key !== bagItem.key)
    }
    filteredData = filteredData.slice(0,2);

    const [cost, setCost] = useState(0);

    const handleRemoveItem = (e) => {
        e.preventDefault();
        let key = e.target.id;
        let value = bagItems.filter((item) => item.key === key)[0];
        removeBagItem(value);
    }

    const calculateTotal = (arr) => {
        let currentCost = 0;
        for (let el of arr) {
            currentCost += (el.price * el.quantity);
        }
        setCost(currentCost);
    }

    useEffect(() => {
        calculateTotal(bagItems);
    }, [bagItems]);

    useEffect(() => {
        handleSlider(cost);
    }, [cost])

    const handleSlider = (cost) => {
        const sliderDiv = document.querySelector(".bag-main-slider");
        const ratio = cost / 600;
        const result = Math.round(ratio * 100);
        console.log(result)
        let css = result > 100 ? "100%" : `${result}%`;
        sliderDiv.style.width = css;
    }

    const incrementQuantity = (event) => {
        let objKey = event.target.parentNode.parentNode.id;
        console.log(objKey)
        let specificArt = bagItems.filter((obj) => {
            console.log(obj)
            return obj.key === objKey
        })[0];
        updateBagItems(specificArt, "add", 1);
    }

    const decrementQuantity = (event) => {
        let objKey = event.target.parentNode.parentNode.id;
        let specificArt = bagItems.filter((obj) => obj.key === objKey)[0];
        updateBagItems(specificArt, "minus", 1);
    }

    return (
        <div className='bag-container'>
            <div className='bag-nav'>
                <div className='bag-nav-top'>
                    <div className='bag-nav-top-left'>
                        <div className='bag-nav-img'>
                            <img className="exit-icon" src="./images/other-exit.svg" alt="exit icon"/>
                        </div>
                        <div className='bag-nav-title' >
                            <h2>YOUR BAG</h2>
                        </div>
                    </div>
                    <div className='bag-nav-top-right'>
                        <button>{bagItems.length}</button>
                    </div>
                </div>
                <div className='bag-nav-bottom'>
                    {cost > 600 ? (
                        <p>YOU QUALIFY FOR FREE STANDARD SHIPPING ON THIS ORDER!</p>
                    ) : (
                        <p>YOU ARE {600 - cost} DOLLARS AWAY FROM FREE STANDARD SHIPPING!</p>
                    )}
                    
                    <div className='bag-slider-container'>
                        <div className='bag-slider-bar'>
                            <div className='bag-main-slider'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='bag-cart-container'>
                {
                    bagItems.map((obj) => (
                        <div key={obj.key} className='bag-item-div'>
                            <div className='bag-item-left'>
                                <div className="bag-img-div">
                                    <div style={{backgroundImage: `url(${obj.item.imageUrl})`}} >
                                    </div>
                                </div>
                                <div id={obj.key} className="bag-item-info">
                                    <h2>{obj.item.title}</h2>
                                    <button>{obj.item.type}</button>
                                    <div className="bag-quantity-div">
                                        <img onClick={decrementQuantity} src="./images/Subtract.png" alt="lessen quantity"/>
                                        <h3>{obj.quantity}</h3>
                                        <img onClick={incrementQuantity} src="./images/PlusMath.png" alt="increase quantity"/>
                                    </div>
                                </div>
                            </div>
                            <div className='bag-item-right'>
                                <div className="bag-item-cost">
                                    {obj.price * obj.quantity} <span>USD</span>
                                </div>
                                <div className="bag-item-remove">
                                    <button id={obj.key} onClick={handleRemoveItem}>
                                        <span>
                                            X
                                        </span>
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='gift-options'>
                <p>GIFTING THIS ORDER?</p>
                <button>ADD A NOTE</button>
            </div>
            <div className='review-checkout'>
                <h3>{cost} - REVIEW & CHECKOUT</h3>
            </div>
            <div className='more-considerations'>
                <div className='more-msg'>
                    <p>More I think you'll love</p>
                </div>
                <div className='more-options'>
                    {filteredData.map((option) => (
                        <div key={option.key} className='option-div'>
                            <div style={{backgroundImage: `url(${option.imageUrl})`}}></div>
                            <button>
                                <Link to={`/art/${option.key}`}>
                                SHOP NOW
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
