import React, { useEffect, useState } from 'react';
import PasteInfo from './pasteInfo';
import LogIn from './logIn';
import { token } from './logIn';
import Register from './register';
import NewPaste from './newPaste';
import serverUrl from '../index';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';

function Home() {
  const [pasteInfoModal, setPasteInfoModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pastes, setPastes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [logInModal, setLogInModal] = useState(null);
  const [registerModal, setRegisterModal] = useState(null);
  const [newPasteModal, setNewPasteModal] = useState(null);

  const fetchPastes = () => {
    fetch(serverUrl + "/paste", {
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
      setPastes(data);
      setError(null);
      if (token != '') {
        console.log(token);
        logInUser();
      }
    })
    .catch(err => {
      setError(err.message);
      setPastes(null);
    })
    .finally(() => {
      setLoading(false);
    })
  };

  useEffect(() => {
    fetchPastes()
  }, []);

  function logOutUser() {
    fetch(serverUrl + "/users/invalidateToken", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then (data => {
      setIsLoggedIn(false);
      setError(null);
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function getDate(date) {
    const formatDate = new Date(date);
    const day = formatDate.getDate();
    const month = formatDate.getMonth();
    const year = formatDate.getFullYear();
    return day + '/' + month + '/' + year;
  }

  //Create objects whit styling information
  const styles = {
    cardTableHeader: {
      background: "linear-gradient(45deg, #000000, #FFD700)", 
      boxShadow: "0 5px 10px rgba(0,0,0,.2)", 
      border: "0", 
      position: "absolute", 
      paddingTop: "0.75%", 
      paddingBottom: "0.75%", 
      fontSize: "150%", 
      width: "92%", 
      marginLeft: "4%", 
      marginRight: "4%", 
      zIndex: "1"
    },
    cardTableBody: {
      boxShadow: "0 5px 10px rgba(0,0,0,.2)", 
      position: "absolute", 
      width: "100%", 
      paddingTop: "2%", 
      marginTop: "2%"
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

  let tablePasteRows = 0;

  return (<>
    <Container className="d-grid d-md-flex justify-content-md-end mx-auto" style={{marginTop: "1%", marginBottom: "1%"}}>
      {isLoggedIn 
      ? <div>
        Hello
        <button className="btn btn-primary btn-sm me-md-2" onClick={() => logOutUser()}>Log out</button>
        <button className="btn btn-sm text-white" style={styles.mainButtons} onClick={() => setNewPasteModal(true)}>New Paste</button>
      </div>
      : <div>
        <button className="btn btn-primary btn-sm me-md-2" onClick={() => setLogInModal(true)}>Log In</button>
        <button className="btn btn-warning btn-sm" onClick={() => setRegisterModal(true)}>Register</button>
      </div>
      }
    </Container>
    <Container className="d-grid col d-flex justify-content-center mx-auto" style={{position: "relative"}}>
      <Card center="true" className="fw-bold text-center text-white col d-flex justify-content-center" style={styles.cardTableHeader}>
        PasteBin App
      </Card>
      <Card style={styles.cardTableBody}>
        <Card.Body>
          <Table responsive="sm" hover striped>
            <caption>
              PasteBin App
            </caption>
            <thead style={styles.themeColor}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Released</th>
                <th scope="col">Author Name</th>
              </tr>
            </thead>
            <tbody>
              {loading && <div>Loading...</div>}
              {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
              )}
              {pastes && 
                pastes.map(paste => (
                  <tr key={paste.id}>
                    <th scope="row" style={styles.themeColor}>{++tablePasteRows}</th>
                    <td onClick={() => setPasteInfoModal(paste.id)} className='fw-semibold'>{paste.title}</td>
                    <td>{getDate(paste.date)}</td>
                    <td>{paste.author.map((author, i) => <div key={i}>{author.name}</div>)}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
      
    {pasteInfoModal && <Modal show="true" backdrop="static">
      <PasteInfo id={pasteInfoModal} close={() => setPasteInfoModal(null)}/>
    </Modal>}

    {logInModal && <Modal show="true" backdrop="static">
      <LogIn close={() => setLogInModal(!logInModal)} logInTrue={() => setIsLoggedIn(!isLoggedIn)}/>
      </Modal>}

    {registerModal && <Modal show="true" backdrop="static">
      <Register close={() => setRegisterModal(!registerModal)}/>
      </Modal>}

    {newPasteModal && <Modal show="true" backdrop="static">
      <NewPaste close={() => setNewPasteModal(null)}/>
      </Modal>}
  </>);
}

export default Home;