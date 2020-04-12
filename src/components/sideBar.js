import React, { Component } from 'react';
import './sideBar.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Backdrop from "./backdrop"

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

                    <ul>
                        <li onClick={() => alert('prod')}> All Products</li>
                        <li><a>My Products</a></li>
                        <li><a>My Account</a></li>
                        <li>Login</li>
                    </ul>
                </div>

            </React.Fragment>

        )
    }

}

export default sideBar;