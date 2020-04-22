import React, { Component } from 'react';
import './sideBar.css'
import { Button,Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Backdrop from "./backdrop"
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class sideBar extends Component {

    state = {
        showSidebar: true
    }

    toggleSidebar() {

        if (this.state.showSidebar) {
            document.getElementById('temp').className = 'sidebar closeSidebar'
            this.setState({
                showSidebar: false
            })
        }
        else {
            document.getElementById('temp').className = 'sidebar openSidebar'
            this.setState({
                showSidebar: true
            })
        }
    }

    logoutHandler(){

        toast.configure()
        localStorage.removeItem('token')
        this.props.loggedOut()
        toast.warn("Successfully Logged Out!!!", {
            hideProgressBar: true,
            dispArticles: 'none'
        })
    }


    render() {

        return (
            <React.Fragment>

                {this.state.showSidebar ? <Backdrop onClick={this.toggleSidebar.bind(this)}></Backdrop> : null}
                <div className='sidebar' id='temp'>

                    <div className='row'>
                        <div className='col-md-10'>
                            <p className='title'>ShopKart</p>
                        </div>
                        <div className='col-md-2'>
                            <img src="https://img.icons8.com/color/48/000000/shopping-basket.png" onClick={this.toggleSidebar.bind(this)} />
                        </div>
                    </div>




                    <hr></hr>

                    {/* <ul>
                        <li onClick={() => alert('prod')}> All Products</li>
                        <li><a>My Products</a></li>
                        <li><a>My Account</a></li>
                        <li>Login</li>
                    </ul> */}

                    <Nav className="flex-column" fill>
                        <Nav.Item >
                            <Nav.Link className='navItem'>All Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='navItem'>My Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='navItem'>My Account</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            {!this.props.userLoggedIn ? 
                            <Nav.Link className='navItem' onClick={this.props.toggleLogin}>Login</Nav.Link> :
                            <Nav.Link className='navItem' onClick={this.logoutHandler.bind(this)}>{this.props.userName} (Logout)</Nav.Link>
    }
                        </Nav.Item>
                    </Nav>
                </div>

            </React.Fragment>

        )
    }

}

const mapStateToProps = state => {
    return({
        userLoggedIn: state.userLoggedIn,
        userName: state.userName,
    })
}

const mapDispatchToProps = Dispatch => {
    return({
        toggleLogin: () => Dispatch({type: "toggleLogin"}),
        loggedOut: () => Dispatch({type: "loggedOut"})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(sideBar);