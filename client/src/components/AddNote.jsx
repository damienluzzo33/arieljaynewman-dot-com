import React, { useEffect } from 'react';

export default function AddNote(props) {

    const { handleToggleModal, handleGiftNoteUpdate, handleGiftNoteSubmit, handleSetGiftNote, giftNote } = props;

    useEffect(() => {
        let existingNote = JSON.parse(localStorage.getItem('current-note'));

        if (existingNote) {
            handleSetGiftNote(existingNote);
        } else {
            existingNote = "";
            handleSetGiftNote('');
        }
    }, [])

    return (
        <div id="modal-container" className="modal-container">
            <img className='exit-modal-btn' src="./images/other-exit.svg" alt="exit" onClick={handleToggleModal}/>
            <div className="add-note-container">
                <h2>GIFTING THIS ORDER?</h2>
                <div className='add-note-box'>
                    <textarea id="gift-message" placeholder="Write a gift message here (500 character limit)" maxLength={500} onChange={handleGiftNoteUpdate} value={giftNote}/>
                </div>
                <div className='add-note-sidenote'>
                    <p>No prices will be included on the receipt</p>
                </div>
                <div className='save-note-box'>
                    <button onClick={handleGiftNoteSubmit}>SAVE NOTE</button>
                </div>
            </div>
        </div>
        
    )
}