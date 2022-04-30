// Package imports
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Alert } from 'react-bootstrap';

// Package imports
import { useAuth } from '../../context/AuthContext';
import { postUser } from '../../services';

export default function Signup () {
  // Refs, states, navigation, and authentication
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const aboutRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Submit function
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match.");
    }

    try {
      setError('');
      setLoading(true);
      const auth = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await postUser({
        name: nameRef.current.value,
        events: [],
        allergens: [],
        uid: auth.user.uid,
        about: aboutRef.current.value
          || `Hi, my name is ${nameRef.current.value}`,
        img: ''
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Failed to create an account.');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>
            Sign Up
          </h2>
          {error && <Alert variant='danger'>
            {error}
          </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='name'>
              <Form.Label
                htmlFor="name-input"
              >
                Name
              </Form.Label>
              <Form.Control
                type='text'
                ref={nameRef}
                id="name-input"
                required
              />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label
              htmlFor="email-input">
                E-mail
              </Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                id="email-input"
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label
              htmlFor="password-input">
                Password
              </Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                id="password-input"
                required
              />
            </Form.Group>
            <Form.Group id='passwordconfirm'>
              <Form.Label
                htmlFor="passwordconfirm-input"
              >
                Confirm password
              </Form.Label>
              <Form.Control
                type='password'
                id="passwordconfirm-input"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Form.Group id='about'>
              <Form.Label
              htmlFor="about-input">
                Tell us something about yourself
              </Form.Label>
              <Form.Control
                type='text'
                ref={aboutRef}
                id="about-input"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100'
              type='submit'
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>
          Sign in
        </Link>
      </div>
    </>
  );
}
