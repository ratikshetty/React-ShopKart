import React, {useState} from 'react';
import './ProductsModal.css'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Backdrop from './backdrop'


function ProductsModal(props) {

    toast.configure()

    let [prodName, setProdName] = useState('')
    let [prodDesc, setProdDesc] = useState('')
    let [prodUrl, setProdUrl] = useState('')
    let [prodCat, setProdCat] = useState('')

    function addProductBtnHandler(){

        if(prodDesc.trim().length && prodName.trim().length && prodUrl.trim().length && prodCat.trim().length){

            let cat = props.prodCategory.indexOf(prodCat)
            // alert(cat)
            // return
            
            axios.post('http://localhost:3003/products',
            {
                productName: prodName,
                productTypeId: cat+1,
                productDesc: prodDesc
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => alert('res'))

        }
        else{
            toast.error("Please fill all the data!!!", {
                hideProgressBar: true,
                dispArticles: 'none'
            })
        }
    }
 

    return (

        <React.Fragment>
            <Backdrop
            onClick={props.toggleProductModal}></Backdrop>
        

        <div className='modalInner'>

            

            <h1 className='modalTitle'>Product Details</h1>
            <hr></hr>

            <InputGroup className="mb-3 mt-4">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Product Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value = {prodName}
                    onChange = {(e) => setProdName(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3 mt-3">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-default">Product Image URL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={prodUrl}
                    onChange={(e) => setProdUrl(e.target.value)}
                />
            </InputGroup>



            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Product Des</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" 
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}/>
            </InputGroup>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <p >Choose a Category:</p>

                    <select style={{ width: '100%', height: '5vh' }} onChange={(e) => setProdCat(e.target.value)}>
                        <option value=''>Select Option</option>
                        {props.prodCategory.map(cat =>
                            <option value={cat}>{cat}</option>
                        )}


                    </select>
                </div>
            </div>



            <div className='row mt-3'>
                <div className='col-md-3'>
                    <Button variant="success" 
                        onClick={addProductBtnHandler} block>Add</Button>
                </div>
                <div className='col-md-3'>
                    <Button variant="danger" onClick={props.toggleProductModal} block>Cancel</Button>
                </div>
            </div>






        </div>
        </React.Fragment>

    )
}

const mapStateToProps = state => {
    console.log(state.prodCategory)
    return ({
        prodCategory: state.prodCategory
    })
}

const mapDispatchToProps = Dispatch => {
    return({
        toggleProductModal: () => Dispatch({type: "toggleProdModal"})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal);