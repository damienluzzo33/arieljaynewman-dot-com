import React, { useState } from 'react';

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Contact() {
    // React.useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        if (inputType === 'userEmail') {
            setUserEmail(inputValue);
        } else if (inputType === 'firstName') {
            setFirstName(inputValue);
        } else if (inputType === 'lastName') {
            setLastName(inputValue);
        } else if (inputType === 'subject') {
            setSubject(inputValue);
        } else if (inputType === 'message') {
            setMessage(inputValue);
        }
    };

    const onBlurFunction = (event) => {
        event.preventDefault();

        if (!validateEmail(userEmail)) {
            setErrorMessage('Email is invalid');
            return;
        }

        if (!firstName || !lastName) {
            setErrorMessage(`You need to include your name!`);
            return;
        }

        if (!subject) {
            setErrorMessage("You can't leave your subject line blank!");
            return;
        }

        if (!message) {
            setErrorMessage("You can't leave your message blank!");
            return;
        }

        if (
            validateEmail(userEmail) &&
            firstName &&
            lastName &&
            subject &&
            message
        ) {
            setErrorMessage('');
            return;
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(userEmail)) {
            setErrorMessage('Email is invalid');
            return;
        }

        if (!firstName || !lastName) {
            setErrorMessage(`You need to include your name!`);
            return;
        }

        if (!subject) {
            setErrorMessage("You can't leave your subject line blank!");
            return;
        }

        if (!message) {
            setErrorMessage("You can't leave your message blank!");
            return;
        }

        setFirstName('');
        setLastName('');
        setUserEmail('');
        setSubject('');
        setMessage('');
        setErrorMessage('');
    };

    return (
        <section id="contact" className="contact">
            <div className="contactTitleDiv">
                <h2 className="contact-title">C O N T A C T</h2>
            </div>
            <form id="contactForm" onSubmit={handleFormSubmit}>
                <div className='contact-info'>
                    <input
                        className='input-underline'
                        value={firstName}
                        name="firstName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" FIRST NAME"
                        onBlur={onBlurFunction}
                    />
                    <input
                        className='input-underline'
                        value={lastName}
                        name="lastName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" LAST NAME"
                        onBlur={onBlurFunction}
                    />
                    <input
                        className='input-underline'
                        value={userEmail}
                        name="userEmail"
                        onChange={handleInputChange}
                        type="email"
                        placeholder=" YOUR EMAIL"
                        onBlur={onBlurFunction}
                    />
                </div>
                <div className='contact-message'>
                    <input
                        className='input-box'
                        value={subject}
                        name="subject"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" Subject Line"
                        onBlur={onBlurFunction}
                    />
                    <textarea
                        value={message}
                        name="message"
                        onChange={handleInputChange}
                        onBlur={onBlurFunction}
                        placeholder=" Message"
                    />
                </div>
                <button id="contactSubmit" type="submit">
                    SUBMIT
                </button>
                <div className='privacy-policy'>
                    <input type="radio" />
                    <p>I agree with the privacy policy and terms of service.</p>
                </div>
            </form>
            {errorMessage && (
                <div>
                    <p className="errorText">{errorMessage}</p>
                </div>
            )}
            <div className='contact-footer'>
                <img className="instagram-profile-icon" src="./images/insta-icon.svg" alt="instagram logo with profile pic" />
                <div className='contact-footer-text'>
                    <h2>@ARIJNEWMAN</h2>
                    <p>created with &#x2764; in austin,tx</p>
                </div>
            </div>
            <div className='signoff-contact'>
                @ Ariel Jay Newman 2022
            </div>
        </section>
    );
}
