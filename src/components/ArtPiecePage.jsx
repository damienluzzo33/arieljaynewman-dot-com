import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { data } from '../data/art.json';
import { mediums } from '../data/mediums.json';

export default function ArtPiecePage(props) {

    const { addBagItem, removeBagItem, updateBagItems, hasBagItem } = props;

    const { artPiece: artPieceKey } = useParams();
    const specificArt = [...data].filter((piece) => piece.key === artPieceKey)[0];
    const allMediums = [...mediums];

    const [addCount, setAddCount] = useState(1);
    const [chosenMedium, setChosenMedium] = useState({});
    const [chosenSize, setChosenSize] = useState('');
    const [chosenStyle, setChosenStyle] = useState('regular');
    const [optionNavSelection, setOptionNavSelection] = useState('medium');
    const [sizeOptions, setSizeOptions] = useState([]);
    const [carouselImg, setCarouselImg] = useState("carouselImgOne");

    const handleCarouselChange = (e) => {
        const newImage = e.target.getAttribute("data-id");
        setCarouselImg(newImage);
    }

    const handleNavSelection = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        setOptionNavSelection(id);
        const allOptions = document.querySelectorAll('.specific-selection-div');
        allOptions.forEach(
            (option) => (option.style.border = '2px solid transparent')
        );
        let temp;

        if (id === "medium") {
            temp = chosenMedium.key;
        } else if (id === "size") {
            console.log(chosenSize.name);
            temp = chosenSize.name;
        }
        console.log(temp)
        setTimeout(() => {
            document.getElementById(temp).style.border = '2px solid #7aced9';
        }, 60);
    }

    const handleMediumSelection = (e) => {
        e.preventDefault();
        let mediumKey;
        let realTarget;
        if (e.target.classList.contains('specific-selection-div')) {
            realTarget = e.target;
            mediumKey = realTarget.getAttribute('data-id');
        } else {
            realTarget = e.target.parentNode;
            mediumKey = realTarget.getAttribute('data-id');
        }

        let mediumArr = allMediums.filter((medium) => medium.key === mediumKey);
        let mediumSelection = mediumArr[0];
        setChosenMedium(mediumSelection);
        const allOptions = document.querySelectorAll('.specific-selection-div');
        allOptions.forEach(
            (option) => (option.style.border = '2px solid transparent')
        );
        realTarget.style.border = '2px solid #7aced9';
        setChosenSize('');
        setChosenStyle('');
        setSizeOptions(chosenMedium.options);
        setTimeout(() => {
            setOptionNavSelection('size');
        }, 1000);
    };

    const handleSizeSelection = (e) => {
        e.preventDefault();
        let sizeKey;
        let realTarget;
        if (e.target.classList.contains('specific-selection-div')) {
            realTarget = e.target;
            sizeKey = realTarget.getAttribute('data-id');
        } else {
            realTarget = e.target.parentNode;
            sizeKey = realTarget.getAttribute('data-id');
        }

        let sizeArray = chosenMedium.options.filter((size) => size.name === sizeKey);
        let sizeSelection = sizeArray[0];
        setChosenSize(sizeSelection);
        const allOptions = document.querySelectorAll('.specific-selection-div');
        allOptions.forEach(
            (option) => (option.style.border = '2px solid transparent')
        );
        realTarget.style.border = '2px solid #7aced9';
        setTimeout(() => {
            setOptionNavSelection('style');
        }, 1000);
    };

    const handleMath = (e) => {
        e.preventDefault();
        const operation = e.target.getAttribute('data-id');
        if (operation === "minus") {
            const newMath = addCount - 1;
            setAddCount(newMath);
        } else if (operation === "plus") {
            const newMath = addCount + 1;
            setAddCount(newMath);
        }
    }

    let navigate = useNavigate();

    const addToBag = (e) => {
        e.preventDefault();
        const hasItem = hasBagItem(specificArt);
        console.log(specificArt)
        if (hasItem) {
            updateBagItems(specificArt, "add", addCount);
        } else {
            addBagItem(specificArt, addCount, chosenSize.price, chosenSize.name, chosenMedium.name, "original-art");
        }
        navigate("/bag");
    }

    return (
        <div className="art-piece-container">
            <div className="display-and-share-div">
                <div className="art-piece-carousel">
                    <div style={{backgroundImage: `url(${specificArt.imageUrl})`}} className={`${carouselImg} art-piece-carousel-img`}></div>
                    <input 
                        type="radio" 
                        name="img-radio" 
                        defaultChecked
                        data-id="carouselImgOne"
                        onClick={handleCarouselChange}
                    />
                    <input 
                        type="radio" 
                        name="img-radio" 
                        data-id="carouselImgTwo"
                        onClick={handleCarouselChange}
                    />
                    <input 
                        type="radio" 
                        name="img-radio" 
                        data-id="carouselImgThree"
                        onClick={handleCarouselChange}
                    />
                </div>
                <div className="art-piece-actions">
                    <img
                        src="../images/ARVR.png"
                        alt="augmented reality view"
                    />
                    <div className="share-on-socials">
                        <div className="social-icons-row">
                            <img
                                src="../images/twitter.png"
                                alt="twitter icon"
                            />
                            <img
                                src="../images/facebook.png"
                                alt="facebook icon"
                            />
                            <img
                                src="../images/pinterest.png"
                                alt="pinterest icon"
                            />
                        </div>
                        <div className="social-share-msg">SHARE</div>
                    </div>
                    <div className="like-with-heart">&#x2764;</div>
                </div>
            </div>
            <div className="art-piece-main">
                <div className="art-piece-nav">
                    <div className="art-nav-buttons">ORIGINAL ART</div>
                    <div className="art-nav-buttons">PRINT-ON-DEMAND</div>
                    <div className="art-nav-buttons">LIMITED PRINT</div>
                </div>
                <div className="art-piece-options">
                    <h2>TITLE</h2>
                    <div className="art-sub-nav">
                        <div 
                            id="art-medium"
                            onClick={handleNavSelection}
                            data-id="medium"
                        >
                            MEDIUM
                        </div>
                        <div 
                            id="art-size"
                            onClick={handleNavSelection}
                            data-id="size"
                        >
                            SIZE
                        </div>
                        <div 
                            id="art-style"
                            onClick={handleNavSelection}
                            data-id="style"
                        >
                            STYLE
                        </div>
                    </div>
                </div>
                <div className="art-piece-sections">
                    <div className="art-piece-selection-window">
                        {optionNavSelection === 'medium' &&
                            allMediums.map((selection) => (
                                <div
                                    className="specific-selection-div"
                                    key={selection.key}
                                    onClick={handleMediumSelection}
                                    data-id={selection.key}
                                    id={selection.key}
                                >
                                    <div
                                        className="specific-selection-img"
                                        style={{
                                            backgroundImage: `url(${selection.image})`,
                                        }}
                                    />
                                    <p>{selection.name}</p>
                                </div>
                            ))}
                        {optionNavSelection === 'size' &&
                            chosenMedium.options.map((option) => (
                                <div className="specific-selection-div size-selection" 
                                id={option.name}
                                key={option.name}
                                onClick={handleSizeSelection}
                                data-id={option.name}
                                >
                                    <div
                                        className="specific-selection-img"
                                        style={{
                                            backgroundImage: `url(${option.image})`
                                        }}
                                        id={`${option.name.toLowerCase()}`}
                                    />
                                    <div className='option-name-size'>{option.name}</div>
                                </div>
                            ))}
                        {optionNavSelection === 'style' && (
                            <div 
                            className="specific-selection-div"
                            data-id="regular"
                            key={chosenStyle}
                            style={{
                                border: '2px solid #7aced9'
                            }}
                            >
                                <div
                                        className="specific-selection-img"
                                        style={{
                                            backgroundImage: 'url(../images/thumbsup.png)'
                                        }}
                                    />
                                <div>Regular</div>
                            </div>
                        )}
                    </div>
                    <div className="art-piece-bag-bar">
                        <div className="art-quantity-counter">
                            <img
                                src="../images/Subtract.png"
                                alt="minus sign"
                                onClick={handleMath}
                                data-id="minus"
                                style={{cursor: 'pointer'}}
                            />
                            <h3>{addCount}</h3>
                            <img 
                                src="../images/PlusMath.png" 
                                alt="plus sign" 
                                onClick={handleMath}
                                data-id="plus"
                                style={{cursor: 'pointer'}}
                            />
                        </div>
                        <div className="add-piece-to-bag-btn" 
                        style={{cursor: 'pointer'}}
                        onClick={addToBag}
                        >
                            {chosenMedium && chosenSize ? (
                                // <Link to="/bag">
                                    <span>{chosenSize.price * addCount} - ADD TO BAG</span>
                                // </Link>
                                
                            ) : (
                                <span>CHOOSE YOUR OPTIONS</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="art-piece-about-section">
                    <h2>ABOUT THIS PAINTING</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat iusto
                        fuga praesentium optio, eaque rerum! Provident similique
                        accusantium nemo autem. Veritatis obcaecati tenetur iure
                        eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit
                        sunt quaerat, odit, tenetur error, harum nesciunt ipsum
                        debitis quas aliquid. Reprehenderit, quia. Quo neque
                        error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt excepturi expedita sint?
                        Sed quibusdam recusandae alias error harum maxime
                        adipisci amet laborum. Perspiciatis minima nesciunt
                        dolorem! Officiis iure rerum voluptates a cumque velit
                        quibusdam sed amet tempora. Sit laborum ab, eius fugit
                        doloribus tenetur fugiat, temporibus enim commodi iusto
                        libero magni deleniti quod quam consequuntur! Commodi
                        minima excepturi repudiandae velit hic maxime
                        doloremque. Quaerat provident commodi consectetur veniam
                        similique ad earum omnis ipsum saepe, voluptas, hic
                        voluptates pariatur est explicabo fugiat, dolorum
                        eligendi quam cupiditate excepturi mollitia maiores
                        labore suscipit quas? Nulla, placeat. Voluptatem quaerat
                        non architecto ab laudantium modi minima sunt esse
                        temporibus sint culpa, recusandae aliquam numquam totam
                        ratione voluptas quod exercitationem fuga. Possimus quis
                        earum veniam quasi aliquam eligendi, placeat qui
                        corporis!
                    </p>
                </div>
                <div className="art-comment-container">
                    <div className="art-comment-intro">
                        <h2>READ COMMENTS AND LOG IN TO ADD YOURS</h2>
                        <p>
                            I’d love to learn about how this piece affected you!
                        </p>
                    </div>
                    <div className="login-art-comment">
                        <button>LOGIN</button>
                        <img src="../images/right_arrow_oj.png" alt="" />
                    </div>
                    <form className="art-comment-form">
                        <textarea name="comment" id="comment"></textarea>
                        <input
                            className="input-text-comment"
                            type="text"
                            placeholder="FIRST NAME"
                            name="firstName"
                        />
                        <input
                            className="input-text-comment"
                            type="text"
                            placeholder="LAST NAME"
                            name="lastName"
                        />
                        <input
                            className="input-text-comment"
                            type="text"
                            placeholder="EMAIL"
                            name="email"
                        />
                        <button type="submit">SUBMIT</button>
                        <div className="agreement-div">
                            <input
                                type="radio"
                                name="agreement"
                                id="agreement"
                            />
                            <label htmlFor="agreement">
                                I agree with the privacy policy terms of service
                            </label>
                        </div>
                    </form>
                    <div className="art-comments-display">
                        <div className="art-comment">
                            <p>
                                “Lorem ipsum dolor sit amet, consectetuer adipi
                                scing elit, sed nonummy nibh euismod tincidunt
                                ut laoreet dolore magna.”
                            </p>
                            <div>
                                <p>Name</p>
                                <p>Date</p>
                            </div>
                            <div className="br-el" />
                        </div>
                        <div className="art-comment">
                            <p>
                                “Lorem ipsum dolor sit amet, consectetuer adipi
                                scing elit, sed nonummy nibh euismod tincidunt
                                ut laoreet dolore magna.”
                            </p>
                            <div>
                                <p>Name</p>
                                <p>Date</p>
                            </div>
                            <div className="br-el" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
