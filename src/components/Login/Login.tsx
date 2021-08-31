import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../endpoints';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { push } = useHistory()

    const inputOnChangeHandler = ({ target }: any) => {
        setLoginForm((state) => ({
            ...state,
            [target.name]: target.value
        }));
    }

    const methods = {
        push,
        setIsSubmitting
    }
    const loginHandler = async () => {
        setIsSubmitting(true);
        loginUser(loginForm, methods);
    }
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" onChange={inputOnChangeHandler} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={inputOnChangeHandler} />
            </Form.Group>
            <Button variant="primary" onClick={loginHandler}>
                {isSubmitting
                    ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )
                    : 'Submit'}
            </Button>
        </Form>
    );
}

export default Login;
