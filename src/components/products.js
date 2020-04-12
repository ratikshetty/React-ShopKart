import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

class products extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productsAvailable: []
        }


    }

    componentDidMount(){

        Axios.get('http://localhost:3003/products')
        .then(res => {
            this.setState({
                productsAvailable: res.data
            })
        })
    }



    render() {

        return (
            <React.Fragment>
                {
                    this.state.productsAvailable.map(prod =>
                        <div>
                            <p>{prod.productName}</p>
                            <p>{prod.amount}</p>
                        </div>
                    )
                }
            </React.Fragment>

        )
    }
}

export default products;