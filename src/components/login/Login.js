import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { Form, Button } from 'react-bootstrap'
import LoginImage from '../../assets/undraw_authentication_fsn5.svg'
import Backdrop from '../backdrop'


function Login(props) {

    return (

        <React.Fragment>
            <Backdrop
            onClick={()=> alert('back drop clicked!!!')}></Backdrop>
            <div className='main'>
                <div className='inner'>
                    <div className='row'>
                        <div className='col-md-12 pb-4 text-center loginTitle'>
                            <h1 className=''><em>Login...</em></h1>
                        </div>
                        <div className='col-md-6 innerImage'>
                            <img src={LoginImage} className='img'></img>
                        </div>
                        <div className='col-md-6'>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" className='mt-4' onClick={() => alert('clicked')} block>
                                    Login
  </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Login;