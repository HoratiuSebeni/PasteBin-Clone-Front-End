import React, { Component, useEffect, useState } from 'react';
import { token } from './logIn';
import serverUrl from '../index';
import Modal from 'react-bootstrap/Modal';

const NewPaste = ({close, addedSuccess}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    function handleSubmit(e) {

        e.preventDefault();

        fetch(serverUrl + "/paste/create", {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            setError(null);
            addedSuccess();
            close();
        })
        .catch(err => {
          setError(err.message);
          setData(null);
        })
    };

    const styles = {
        modalHeader: {
            background: "linear-gradient(45deg, #000000, #FFD700)", 
            boxShadow: "0 5px 10px rgba(0,0,0,.2)"
        },
        themeColor: {
            color: "#BDB76B"
        },
        mainButtons: {
            background: "linear-gradient(45deg, #000000, #FFD700)", 
            boxShadow: "0 5px 10px rgba(0,0,0,.2)", 
            border: "0", 
        }
    };

    return <>
    <Modal.Header closeButton onClick={close} className='text-white' style={styles.modalHeader}>
      <Modal.Title className="fs-3">
        Create new paste
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="fs-15">
      <form method="post" onSubmit={handleSubmit}>
        <ul>
            <li className="fw-bold" style={styles.themeColor}>
                Title: 
            </li>
            <input type="text" id="tile" name="tile" value={title} onChange={e => setTitle(e.target.value)}/>
        </ul>
        <ul>
            <li className="fw-bold" style={styles.themeColor}>
                Content: 
            </li>
            <input type="text" id="content" name="content" value={content} onChange={e => setContent(e.target.value)}/>
        </ul>
        <div className="d-grid d-md-flex justify-content-md-end mx-auto">
            <button type="submit" className="btn btn-sm text-white" style={styles.mainButtons}>
                Sumbit
            </button>
        </div>
        {error
        ?<div>
            <h3>
                {error}
            </h3>
        </div>
        : <div></div>
        }
      </form>
    </Modal.Body>
  </>;
}

export default NewPaste;