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
                <h2 className="contact-title">Contact</h2>
            </div>
            <form id="contactForm" onSubmit={handleFormSubmit}>
                <div>
                    <input
                        value={firstName}
                        name="firstName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" First Name"
                        onBlur={onBlurFunction}
                    />
                    <input
                        value={lastName}
                        name="lastName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" Last Name"
                        onBlur={onBlurFunction}
                    />
                    <input
                        value={userEmail}
                        name="userEmail"
                        onChange={handleInputChange}
                        type="email"
                        placeholder=" Email"
                        onBlur={onBlurFunction}
                    />
                </div>
                <div>
                    <input
                        value={subject}
                        name="subject"
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" Subject Line"
                        onBlur={onBlurFunction}
                    />
                </div>
                <div>
                    <textarea
                        value={message}
                        name="message"
                        onChange={handleInputChange}
                        onBlur={onBlurFunction}
                        placeholder=" Message"
                    />
                </div>
                <button id="contactSubmit" type="submit">
                    Submit
                </button>
            </form>
            {errorMessage && (
                <div>
                    <p className="errorText">{errorMessage}</p>
                </div>
            )}
        </section>
    );
}
