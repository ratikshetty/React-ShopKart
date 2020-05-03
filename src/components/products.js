import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import image from './undraw_mobile_prle.svg';
import './products.css'
import { } from 'redux'
import { connect } from 'react-redux';
import SideBar from './sideBar'
import ProductsModal from './ProductsModal';
import ProductDetails from './ProductDetails'

class products extends Component {

    constructor(props) {
        super(props)


        this.prodComp = null
        this.prodDetails = null

    }

    fetchAllProducts() {

        Axios.get('http://localhost:3003/products')
            .then(res => {
                // this.setState({
                //     productsAvailable: res.data

                // })
                this.props.fetchProd(res.data)
                console.log(res.data)


            })

    }

    componentDidMount() {
        console.log("called didmount")

        this.fetchAllProducts()

        Axios.get('http://localhost:3003/type')
            .then(res => {
                // this.setState({
                //     // prodCategory: res.data.map(ele => ele.typeName)
                // })
                this.props.fetchCategory(res.data.map(ele => ele.typeName))
            })


    }

    myProducts(userId) {

        let prods = this.props.productsAvailable.filter(cur => cur.userIdOfProductAddeBy === userId)
        this.props.fetchProd(prods)

    }

    addPrdBtnHandler() {

        this.prodComp = (
            <ProductsModal
                    option="Add"
                     addBtn={this.addProductModalBtnHandler.bind(this)}></ProductsModal> 
        )

        if (!this.props.userLoggedIn) {
            this.props.toggleProductModal()
            this.props.toggleLogin()
        }
        else {
            this.props.toggleProductModal()
        }
    }

    addProductModalBtnHandler() {

        this.fetchAllProducts()
        this.myProducts()
    }

    updateProduct(e, prod){

        e.stopPropagation()
        // alert(prod.productName)
        
    this.prodComp = (<ProductsModal
        prodName={prod.productName}
        prodDesc={prod.productDesc}
        prodUrl='test'
        prodType={this.props.prodCategory[prod.productTypeId - 1]}
        prodCloseModal={this.closeUpdateProdModal}
        option="Update"
        prodId={prod.productId}
        addBtn={this.addProductModalBtnHandler.bind(this)}>
    </ProductsModal>)

        this.props.toggleProductModal()
    }

    closeUpdateProdModal(){
        this.setState({
            updateProdComp: false
        })
    }

    toggleSidebar() {

        if (this.props.showSidebar) {
            document.getElementById('temp').className = 'sidebar closeSidebar'
            this.props.togglebar()
           
        }
        else {
            document.getElementById('temp').className = 'sidebar openSidebar'
            this.props.togglebar()
        }
    }

    productClickHandler(prod){
        console.log(prod)

        this.prodDetails = (
            <ProductDetails
                prodName = {prod.productName}
                by={prod.userIdOfProductAddeBy}
                desc={prod.productDesc}
                postedDate={prod.createdDate}
                lastUpdated={prod.modifiedDate}
                prodId={prod.productId}
                 ></ProductDetails>
        )
        
        this.props.showProductDetailsModal()
    }



    render() {

        return (
            <React.Fragment>
                {this.props.showProductModal ?
                    this.prodComp
                
                        : null}

            
                <SideBar
                    allProducts={this.fetchAllProducts.bind(this)}
                    myProducts={this.myProducts.bind(this)}
                    refreshAfterLoggedOut={this.fetchAllProducts.bind(this)}></SideBar>

                <div className='row headerBar'>
                    <div className='col-md-12' onClick={() => this.toggleSidebar()}>
                   
                    </div>
                </div>

                {!this.props.showProductDetails?
                <React.Fragment>
                <Button variant='success' style={{marginTop:'5%'}} onClick={this.addPrdBtnHandler.bind(this)} >Add Product</Button>
                <div className='row productRow'>

                    {
                        this.props.productsAvailable.map(prod =>

                            <div className='col-md-6 prodCardRow'>
                                <div className='productCard' onClick={() => this.productClickHandler(prod)}>
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
                                        <div className='col-md-6' style={{ padding: '0 40px' }}>
                                            <div className='row'>
                                            {this.props.user && this.props.user.userId !== prod.userIdOfProductAddeBy? 
                                                <div className='col-md-12'>
                                                    <Button className='bidButton' variant="primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            alert('bid' + prod.productId)
                                                        }} block>Bid</Button>
                                                </div>: null}
                                                {this.props.user && this.props.user.userId === prod.userIdOfProductAddeBy? 
                                                <div className='col-md-12 mt-1'>
                                                    <Button block onClick={ (e) => this.updateProduct(e, prod)}>
                                                        Update
                                            </Button>
                                                </div>: null}
                                            </div>



                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
</React.Fragment>
               
                        : this.prodDetails}
                {/* Product Details section end */}

            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    // console.log(state.productsAvailable)
    return {
        productsAvailable: state.productsAvailable,
        prodCategory: state.prodCategory,
        user: state.user,
        userLoggedIn: state.userLoggedIn,
        showProductModal: state.showProductModal,
        showSidebar: state.showSideBar,
        showProductDetails: state.showProductDetails
    }
}

const mapDispatchToProps = Dispatch => {
    return {
        fetchProd: (data) => Dispatch({ type: "fetchProducts", data: data }),
        fetchCategory: (data) => Dispatch({ type: "fetchCategory", data: data }),
        toggleLogin: () => Dispatch({ type: "toggleLogin" }),
        toggleProductModal: () => Dispatch({ type: "toggleProdModal" }),
        togglebar: () => Dispatch({type: "toggleSideBar"}),
        showProductDetailsModal: () => Dispatch({type: "showProductDetailsModal"}),
        hideProductDetailsModal: () => Dispatch({type: "hideProductDetailsModal"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(products);