// Package imports
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Alert } from 'react-bootstrap';

// Local imports
import { useAuth } from '../../context/AuthContext';

export default function Login () {
  // Refs, states, and navigation
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Submit function
  async function handleSubmit (e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Failed to sign in.');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>
            Log in
          </h2>
          {error && <Alert variant='danger'>
            {error}
          </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>
                E-mail
              </Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4'
              type='submit'
            >
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>
          Sign up
        </Link>
      </div>
    </>
  );
}
