import React, { useEffect, useState } from 'react';
import serverUrl from '../index';
import Modal from 'react-bootstrap/Modal';

export let token = '';

const LogIn = ({close, logInTrue}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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

        fetch(serverUrl + "/users/login", {
            mode: 'cors',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
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
            token = data;
            setError(null);
            logInTrue();
            close()
        })
        .catch(err => {
          setError(err.message);
        })
    };

    return <>
    <Modal.Header id="logInModal" closeButton onClick={close} className='text-white' style={styles.modalHeader}>
      <Modal.Title className="fs-3">
        Log In
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
                Password: <p>(min 6 characters)</p>
            </li>
            <input type="password" id="password" name="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)}/>
        </ul>
        <div className="d-grid d-md-flex justify-content-md-end mx-auto">
            <button type="submit" className="btn btn-sm text-white" style={styles.mainButtons}>
                Log In
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

export default LogIn;