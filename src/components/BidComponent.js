import React from 'react'
import { Button } from 'react-bootstrap';
import './BidComponent.css'
import {connect} from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BidComponent(props){

    toast.configure()

    function sellBtnClickHandler(bidId){

        axios.put(`http://localhost:3003/bid/${bidId}`,
        {
            bidId: bidId,
            userIdOfProductSoldTo:props.bidUserId,
            productId:props.prodId,
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            toast.success("Product Sold!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
            props.hideProductDetailsModal()
        })
        .catch(err => {
            alert(err)
            toast.warn("Something went wrong!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
        })
        

    }

 

    return(
        <div className='row bidRow '>
            <div className='col-md-6'>
            <div>{props.bidAmount}</div>
            </div>
            {props.user && props.user.userId === props.by?
            <div  className='col-md-6'>
                <Button onClick={() => sellBtnClickHandler(props.bidId)} block>Sell</Button>
            </div>: null}
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = Dispatch => {
    return {
        hideProductDetailsModal: ()=> Dispatch({type: "hideProductDetailsModal"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BidComponent);