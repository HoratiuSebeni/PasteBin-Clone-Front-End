import React, { Component, useEffect, useState } from 'react';
import serverUrl from '../index';
import Modal from 'react-bootstrap/Modal';

const Register = ({close}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(0);
    const [info, setInfo] = useState(0);

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

    function handleSubmit(e) {

        e.preventDefault();

        console.log(JSON.stringify(email));

        fetch(serverUrl + "/users/register", {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password
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
            setInfo(data);
            setError(null);
            close();
        })
        .catch(err => {
          setError(err.message);
          setInfo(null);
        })
    };

    return <>
    <Modal.Header closeButton onClick={close} className='text-white' style={styles.modalHeader}>
      <Modal.Title className="fs-3">
        Register new user
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="fs-15">
      <form method="post" onSubmit={handleSubmit}>
        <ul>
            <li className="fw-bold" style={styles.themeColor}>
                Email: 
            </li>
            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </ul>
        <ul>
            <li className="fw-bold" style={styles.themeColor}>
                Name: 
            </li>
            <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
        </ul>
        <ul>
            <li className="fw-bold" style={styles.themeColor}>
                Password: <p>(min 6 characters)</p>
            </li>
            <input type="password" id="password" name="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)}/>
        </ul>
        <div className="d-grid d-md-flex justify-content-md-end mx-auto">
            <button type="submit" className="btn btn-sm text-white" style={styles.mainButtons}>
                Register
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

export default Register;