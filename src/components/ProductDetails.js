import React, {useState, useEffect} from 'react';
import './ProductDetails.css'
import { Accordion, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BidComponent from './BidComponent'


function ProductDetails(props) {

    toast.configure()

    let [bidAmount, setBidAmount] = useState('')
    let [allBids, setAllBids] = useState([])

    useEffect(() => {
        fetchAllBids()
    },[])

    function bidBtnClickHandler() {
        // alert(bidAmount)

        axios.post(`http://localhost:3003/bid/${props.prodId}`,
        {
            bidAmount: bidAmount
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            toast.success("Bid Successfull!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
            setBidAmount('')
            fetchAllBids()
        })
        .catch(err => {
            toast.warn("Something went wrong!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
        })

        
    }

    function fetchAllBids(){
        axios.get(`http://localhost:3003/bid/${props.prodId}`)
            .then(res => {
                // this.setState({
                //     productsAvailable: res.data

                // })
                
                setAllBids(res.data)


            })
            .catch(err => console.log(err))
    }

    

    return (
        <div className='row productDetailsRow p-3'>
            <div className='col-md-5'>
                <img className='prodImage' src={props.prodImage}></img>
            </div>

            <div className='col-md-7 productDetailsContent'>
                <h2>{props.prodName}</h2>
                <p><em>by</em> <strong>{props.by}</strong></p>
                <hr></hr>

                <div className='row mt-3'>
                    <div className='col-md-3'>
                        <em>Description:</em>
                    </div>
                    <div className='col-md-8 prodDesc'>
                        {props.desc} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-md-3'>
                        <em>Posted On:</em>
                    </div>
                    <div className='col-md-8'>
                        {props.postedDate} 
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-3'>
                        <em>Last Updated:</em>
                    </div>
                    <div className='col-md-8'>
                        {props.lastUpdated} 
                    </div>
                </div>

                {props.user && props.user.userName !== props.by?
                <div className='row mt-3'>
                    <div className='col-md-11'>
                    <InputGroup className="mb-3 mt-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Amount</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value.replace(/\D/,''))}
                    />
                </InputGroup>
                <Button onClick={bidBtnClickHandler}>BID</Button>
                    </div>
                </div>:null}

                <div className='row mt-3'>
                    <div className='col-md-11'>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" className='accDiv'>
                                    All Bids
    </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {allBids.map(bid => 
                                            
                                            <BidComponent
                                                bidAmount={bid.bidAmount}
                                                by={props.by}
                                                bidId={bid.bidId}
                                                bidUserId={bid.bidUserId}
                                                prodId={props.prodId}></BidComponent>)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>

                <Button onClick={props.hideProductDetailsModal}>close</Button>
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);