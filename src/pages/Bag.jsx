import React, { useEffect, useState } from 'react';

let bagData = [
    {
        title: "Take My Hand",
        imageUrl: "https://images.unsplash.com/photo-1645680827507-9f392edae51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
        type: "original art",
        price: 150,
        key: "takemyhand",
        quantity: 1
    },
    {
        title: "Pot Of Flowers",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=745&q=80",
        type: "original art",
        price: 250,
        key: "potofflowers",
        quantity: 1
    }
]

let otherOptions = [
    {
        title: "Random Swipes",
        imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=866&q=80",
        type: "original art",
        price: 200,
        key: "randomswipes"
    },
    {
        title: "High School Geometry",
        imageUrl: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        type: "original art",
        price: 200,
        key: "hsgeometry"
    }
]

export default function Bag() {

    const [cost, setCost] = useState(0);
    const [data, setData] = useState(JSON.parse(window.localStorage.getItem("localCart")) || bagData);

    const calculateTotal = (arr) => {
        let currentCost = 0;
        for (let el of arr) {
            currentCost += (el.price * el.quantity);
        }
        setCost(currentCost);
    }

    useEffect(() => {
        calculateTotal(data);
    }, [data]);

    useEffect(() => {
        handleSlider(cost);
    }, [cost])

    const setLocalStorage = (data, key) => {
        window.localStorage.setItem(key, JSON.stringify(data))
    }


    const handleSlider = (cost) => {
        const sliderDiv = document.querySelector(".bag-main-slider");
        const ratio = cost / 600;
        const result = Math.round(ratio * 100);
        console.log(result)
        let css = result > 100 ? "100%" : `${result}%`;
        sliderDiv.style.width = css;
    }

    const incrementQuantity = function(event) {
        let objKey = event.target.parentNode.parentNode.id;
        console.log(objKey)
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === objKey) {
                let currentData = data;
                currentData[i].quantity += 1;
                currentData.splice(i, 1, {
                    ...currentData[i]
                })
                console.log(currentData)
                setData([...currentData]);
            }
        }
        setLocalStorage(data, "localCart");
    }

    const decrementQuantity = (event) => {
        let objKey = event.target.parentNode.parentNode.id;
        console.log(objKey)
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === objKey) {
                let currentData = data;
                currentData[i].quantity -= 1;
                currentData.splice(i, 1, {
                    ...currentData[i]
                })
                console.log(currentData)
                setData([...currentData]);
            }
        }
        setLocalStorage(data, "localCart");
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
                        <button>{data.length}</button>
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
                    data.map((obj) => (
                        <div key={obj.key} className='bag-item-div'>
                            <div className='bag-item-left'>
                                <div className="bag-img-div">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} >
                                    </div>
                                </div>
                                <div id={obj.key} className="bag-item-info">
                                    <h2>{obj.title}</h2>
                                    <button>{obj.type}</button>
                                    <div className="bag-quantity-div">
                                        <img onClick={decrementQuantity} src="./images/Subtract.png" alt="lessen quantity"/>
                                        <h3>{obj.quantity}</h3>
                                        <img onClick={incrementQuantity} src="./images/PlusMath.png" alt="increase quantity"/>
                                    </div>
                                </div>
                            </div>
                            <div className='bag-item-right'>
                                <div className="bag-item-cost">
                                    {obj.price} <span>USD</span>
                                </div>
                                <div className="bag-item-remove">
                                    <button>
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
                    {otherOptions.map((option) => (
                        <div key={option.key} className='option-div'>
                            <div style={{backgroundImage: `url(${option.imageUrl})`}}></div>
                            <button>SHOP NOW</button>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
