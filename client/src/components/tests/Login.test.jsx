// Package imports
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Local imports
import Login from '../Authentication/Login';

const mockLogin = {
  email: "n@1.com",
  password: '123456'
};

jest.mock('../../context/AuthContext.js', () => ({
  useAuth: () => {
    return {
      login: (mockLogin) => {
        // console.log(mockLogin);
      }
    }
  } 
}));

describe('Login component', () => {

  test('should match the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render the login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    screen.getByText('E-mail');
    screen.getByText('Password');
  });


});
