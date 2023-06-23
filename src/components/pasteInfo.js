import React, { useEffect, useState } from 'react';
import serverUrl from '../index';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

const PasteInfo = ({ id, close }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paste, setPaste] = useState([])

  const fetchPasteInfo = () => {
    fetch(serverUrl + "/paste/info/" + id, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
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
      setPaste(data);
      setError(null);
    })
    .catch(err => {
      setError(err.message);
      setPaste(null);
    })
    .finally(() => {
      setLoading(false);
    })
  };

  useEffect(() => {
    fetchPasteInfo()
  }, []);

  const styles = {
    modalHeader: {
      background: "linear-gradient(45deg, #000000, #FFD700)", 
      boxShadow: "0 5px 10px rgba(0,0,0,.2)"
    },
    themeColor: {
      color: "#BDB76B"
    }
  };

  return <>
    <Modal.Header closeButton onClick={close} className='text-white' style={styles.modalHeader}>
      <Modal.Title className="fs-3">
      {loading && <div>Loading...</div>}
      {error && (
        <div>{`There is a problem fetching the data - ${error}`}</div>
      )}
      {paste.title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="fs-15">
      <div name="content">
        <ul>
          <li className="fw-bold" style={styles.themeColor}>
            Content
          </li>
        </ul>
        <div>
        {paste.content}
        </div>
      </div>
      <br></br>
      <div name="author">
        <ul>
          <li className="fw-bold" style={styles.themeColor}>
            Author
          </li>
        </ul>
        <ListGroup as="ol" numbered variant="flush">
          {loading && <div>Loading...</div>}
          {error && (
            <div>{`There is a problem fetching the data - ${error}`}</div>
          )}
          {paste.author?.map((author, i) => <ListGroup.Item as="li" key={i}>
            {author.name}
            <div>{author.email}</div>
          </ListGroup.Item>)}
        </ListGroup>
      </div>
    </Modal.Body>
  </>;
}

export default PasteInfo;