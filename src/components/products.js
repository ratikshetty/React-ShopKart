import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import image from './undraw_mobile_prle.svg';
import './products.css'
import {} from 'redux'
import { connect } from 'react-redux';

class products extends Component {

    constructor(props) {
        super(props)

        // this.state = {
        //     prodCategory: []
        // }


    }

    componentDidMount() {

        Axios.get('http://localhost:3003/products')
            .then(res => {
                // this.setState({
                //     productsAvailable: res.data

                // })
                this.props.fetchProd(res.data)
            })

        Axios.get('http://localhost:3003/type')
        .then(res => {
                // this.setState({
                //     // prodCategory: res.data.map(ele => ele.typeName)
                // })
                this.props.fetchCategory(res.data.map(ele => ele.typeName))
        })
    }



    render() {

        return (
            <React.Fragment>
                <div className='row productRow'>
                    {
                        this.props.productsAvailable.map(prod =>

                            <div className='col-md-6 prodCardRow'>
                                <div className='productCard' onClick={() => alert(prod.productId)}>
                                    <div className='row' >
                                        <div className='col-md-6 productImage' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)` }}>

                                        </div>
                                        <div className='col-md-6 productContent'>
                                            <h3> {prod.productName}</h3>
                                            <hr className='prodHR'></hr>
                                            <p className='prodPara'>{prod.productDesc}</p>
                        <p className='prodPara' ><strong><em>by</em></strong> {prod.userIdOfProductAddeBy}</p>
                        <p className='prodPara'><strong>Category:</strong> {this.props.prodCategory[prod.productTypeId - 1]}</p>
                                            


                                        </div>
                                        <div className='col-md-6'></div>
                                        <div className='col-md-6' style={{padding:'0 40px'}}>
                                            <Button className='bidButton' variant="primary" 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    alert('bid'+ prod.productId)
                                                }} block>Bid</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    console.log(state.productsAvailable)
    return {
        productsAvailable: state.productsAvailable,
        prodCategory: state.prodCategory
    }
}

const mapDispatchToProps = Dispatch => {
    return {
        fetchProd: (data) => Dispatch({type: "fetchProducts", data: data}),
        fetchCategory: (data) => Dispatch({type: "fetchCategory", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(products);