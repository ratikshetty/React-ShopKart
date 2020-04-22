import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { Form, Button } from 'react-bootstrap'
import LoginImage from '../../assets/undraw_authentication_fsn5.svg'
import Backdrop from '../backdrop'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(props) {

    toast.configure()
   

    
    let [stateUserName, setUserName ] = useState("")
    let [statePass, setPass ] = useState("")

    function loginBtnHandler (){

        
        
        axios.get("http://localhost:3003/user",
        {headers:{
            "username": stateUserName,
            "password": statePass
        }})
        .then(res => {
            console.log(res)
            toast.success("Successfully Logged In!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })

            localStorage.setItem('token', res.data.token)
            console.log(localStorage.getItem('token'))

            props.toggleLogin()
            props.loggedIn(stateUserName)
            })
        .catch(err => {
            toast.warn("Invalid Credentials!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
        })


    }

    return (

        props.showLogin ? 
        <React.Fragment>
            <Backdrop
                onClick={props.toggleLogin}></Backdrop>
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
                                    <Form.Control type="email" placeholder="Enter email" value={stateUserName} onChange={(e) => setUserName(e.target.value)}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={statePass} onChange={(e) => setPass(e.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" className='mt-4' onClick={loginBtnHandler} block>
                                    Login
  </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

        : null
    )
}

const mapStateToProps = (state) => {
    return ({
        showLogin: state.showLogin
    }
    )
}

const mapDispatchToProps = Dispatch => {
    return ({
        toggleLogin: () => Dispatch({ type: "toggleLogin" }),
        loggedIn: (userName) => Dispatch({type: "loggedIn", userName: userName}),
        loggedOut: () => Dispatch({type: "loggedOut"})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);