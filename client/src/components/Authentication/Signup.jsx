import React, { useState, useRef } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { postUser } from '../service';

export default function Signup () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const aboutMeRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords dont match');
    }

    try {
      setError('');
      setLoading(true);
      const auth = await signup(emailRef.current.value, passwordRef.current.value);
      await postUser({ name: nameRef.current.value, events: [], allergens: [], uid: auth.user.uid, aboutMe: aboutMeRef.current.value, img: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError('failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='name'>
              <Form.Label >Name</Form.Label>
              <Form.Control type='text' ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label >E-mail</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label >password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='passwordconfirm'>
              <Form.Label >Confirm password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='aboutme'>
              <Form.Label >Tell us something about you:</Form.Label>
              <Form.Control type='text' ref={aboutMeRef} ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </div>
    </>
  );
}
