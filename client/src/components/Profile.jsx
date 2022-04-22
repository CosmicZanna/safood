import React, {useEffect, useState, useRef} from 'react'
import { Card, Button, Alert, ListGroup, Form, CardGroup, Navbar, Container, Nav } from "react-bootstrap"
import {Link, useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {useProfile} from "../context/ProfileContext"
import { getUser, updateUserAllergens } from './service';

export default function Profile() {
  const {logout, profile, updateProfile} = useAuth();
  const [error, setError] = useState('')
  const navigate = useNavigate();
  //const [profile, setProfile] = useState(null);
  const allergenRef = useRef();

  useEffect(()=>{
 /*    fetchUser(); */
  },[])

  async function handleLogout( ){
    setError('');
    try {
      await logout();
      updateProfile(null);
      navigate('/login')
    } catch (error) {
      setError('failed to logout')
    }
  }


  async function handleSubmit (e) {
    e.preventDefault();
    try {
      if(allergenRef.current.value.length > 1){
      updateUserAllergens({uid: profile.uid, allergens: [...profile.allergens, allergenRef.current.value]})
      .then(response => response.json())
      .then(data => {
        updateProfile(data);});}
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
    <Navbar  fixed="top" expand="sm" bg='success' variant="dark" style={{height: '200px' }} >
      <Container>
        <Navbar.Brand href='/'>
        Safood
        </Navbar.Brand>
        <Nav>
          <Nav.Link href='/profile'> Profile </Nav.Link>
          <Nav.Link href='/'> Notifications </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Card  style={{marginTop: '150px'}}>
      <Card.Body>
      <h2 className='text-center mb-4'>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Title>
      {profile && profile.name}
      </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <CardGroup>
            {profile && profile.allergens.map(all => (<Card key={all}><Card.Body>{all}</Card.Body></Card>))}
            </CardGroup>
            <Form onSubmit={handleSubmit} >
            <Form.Control type='text' ref={allergenRef} required style={{maxWidth: 'fit-content'}} placeholder="new allergen"></Form.Control>
            <Button className='mt-2' type='submit'>Save</Button> 
            </Form>
            </ListGroup.Item>
          <ListGroup.Item>Upcoming events: {profile && profile.events}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant="link" onClick={handleLogout}> Log Out </Button>
    </div>
    </>
  )
}
