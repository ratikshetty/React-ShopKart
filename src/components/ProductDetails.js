import React, { useState, useEffect } from 'react';
import './ProductDetails.css'
import { Accordion, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BidComponent from './BidComponent'


function ProductDetails(props) {

    toast.configure()

    let [bidAmount, setBidAmount] = useState('')
    let [allBids, setAllBids] = useState([])
    let [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        fetchAllBids()
        filerByCategory(props.prodTypeId, props.prodId)
    }, [])

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

    function fetchAllBids() {
        axios.get(`http://localhost:3003/bid/${props.prodId}`)
            .then(res => {
                // this.setState({
                //     productsAvailable: res.data

                // })

                setAllBids(res.data)


            })
            .catch(err => console.log(err))
    }

    function deleteBidHandler(bidId){
        axios.delete(`http://localhost:3003/bid/${bidId}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            toast.success("Bid Deleted Successfull!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
       
            fetchAllBids()
        })
        .catch(err => {
            toast.warn("Something went wrong!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
        })

    }

    async function fetchAllProducts() {

        await axios.get('http://localhost:3003/products')
            .then(res => {
                // this.setState({
                //     productsAvailable: res.data

                // })
                props.fetchProd(res.data)
                console.log(res.data)


            })


    }

    async function filerByCategory(typeId, prodId) {

        // console.log("prods",props.productsAvailable)
        await fetchAllProducts()



        if (typeId !== '') {
            let prods = props.productsAvailable.filter(cur => cur.productTypeId === typeId && cur.productId !== prodId)

            props.fetchProd(prods)

            setSimilarProducts(prods)
            // alert('here')
        }



    }

    async function serach(name) {


        await fetchAllProducts()

        if (name !== '') {
            let prods = props.productsAvailable.filter(cur => cur.productName.toLowerCase().includes(name.toLocaleLowerCase()))
            props.fetchProd(prods)
            props.hideProductDetailsModal()
        }


    }




    return (
        <React.Fragment>
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

                    {props.history? 
                    <div className='row mt-3'>
                        <div className='col-md-3'>
                            <em>Amount:</em>
                        </div>
                        <div className='col-md-8'>
                            {props.bidAmount}
                        </div>
                    </div>: null}

                    {props.user && props.user.userName !== props.by ?
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
                                        onChange={(e) => setBidAmount(e.target.value.replace(/\D/, ''))}
                                    />
                                    <Button variant='outline-success' className='ml-2' onClick={bidBtnClickHandler}>BID</Button>
                                </InputGroup>
                                
                            </div>
                        </div> : null}

                    <div className='row mt-3'>
                        <div className='col-md-11'>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className='accDiv'>
                                        All Bids
    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div className='row bidRow '>
                                                <div className='col-md-3'>
                                                    <div>Bid Amount</div>
                                                </div>
                                                <div className='col-md-3'>
                                                    <div>Bid By</div>
                                                </div>

                                                
                                                    <div className='col-md-6'>
                                                        <div>Action</div>
                                                    </div> 
                                            </div>
                                            {allBids.map(bid =>

                                                <BidComponent
                                                    bidAmount={bid.bidAmount}
                                                    by={props.by}
                                                    bidBy={bid.username}
                                                    bidId={bid.bidId}
                                                    bidUserId={bid.bidUserId}
                                                    prodId={props.prodId}
                                                    deleteBidHandler={deleteBidHandler}
                                                    loadProd={fetchAllProducts}></BidComponent>)}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>

                    <Button onClick={() => {
                        fetchAllProducts()
                        props.hideProductDetailsModal()
                    }}>close</Button>
                </div>
            </div>
            <div className='row pl-5 mb-4'>

                {similarProducts.length === 0 ? <div className='col-md-12'><h2>No Recomendations Available!</h2></div> :
                    <div className='col-md-12'>
                        <h1>Recomendations!!!</h1></div>}
                {similarProducts.map(prod =>

                    <div className='col-md-2 recCard' onClick={() => serach(prod.productName)}>
                        <div className='row'>
                            <div className='col-md-12'>
                                <img className='prodImage prodImageRec' src={prod.imageURL} ></img>
                            </div>
                            <div className='col-md-12'>
                                <h2 className='mt-2'>{prod.productName}</h2>
                                {/* <p><em>by</em> {prod.userNameOfProductAddedBy}</p> */}
                            </div>
                        </div>
                    </div>)}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        productsAvailable: state.productsAvailable,
        history: state.history
    }
}

const mapDispatchToProps = Dispatch => {
    return {
        hideProductDetailsModal: () => Dispatch({ type: "hideProductDetailsModal" }),
        fetchProd: (data) => Dispatch({ type: "fetchProducts", data: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);