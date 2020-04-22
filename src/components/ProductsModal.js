import React from 'react';
import './ProductsModal.css'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'


function ProductsModal(props) {
    return (

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
                />
            </InputGroup>

            <InputGroup className="mb-3 mt-3">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-default">Product Image URL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value='rat'
                />
            </InputGroup>



            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Product Des</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <p >Choose a Category:</p>

                    <select style={{ width: '100%', height: '5vh' }} >
                        {props.prodCategory.map(cat =>
                            <option value="grapefruit">{cat}</option>
                        )}


                    </select>
                </div>
            </div>



            <div className='row mt-3'>
                <div className='col-md-3'>
                    <Button variant="success" block>Success</Button>
                </div>
                <div className='col-md-3'>
                    <Button variant="danger" block>Cancel</Button>
                </div>
            </div>






        </div>

    )
}

const mapStateToProps = state => {
    console.log(state.prodCategory)
    return ({
        prodCategory: state.prodCategory
    })
}

export default connect(mapStateToProps)(ProductsModal);