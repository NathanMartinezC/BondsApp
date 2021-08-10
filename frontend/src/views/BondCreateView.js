import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap' 
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { bondSellCreate } from '../actions/bondActions'
import { BOND_CREATE_RESET } from '../constants/bondConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'


function BondCreateView({ history }){
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [number, setNumber] = useState(1)
    const [price, setPrice] = useState(0)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const bondCreate = useSelector(state => state.bondCreate)
    const { success, error, loading } = bondCreate

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else{
            if(success){
                history.push('/sell')
                dispatch({ type: BOND_CREATE_RESET })
            }
        }
    }, [dispatch,success, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(bondSellCreate({name, price, number}))
    }

    return (
        <div>
            <Link
                to='/sell'
                role='button'
                className='btn btn-info'
                size='sm'
            >Go Back</Link>
            <FormContainer>
                <h1>Create Bond</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader/>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name' className='pt-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='3 to 40 characters'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='number' className='pt-3'>
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                    required
                                    type='number'
                                    value={number <= 0 ? number === 1 : number}
                                    onChange={(e) => setNumber(e.target.value)}
                                ></Form.Control>
                                <Form.Text className="text-muted">
                                    A numeric value in the range of 1 to 10,000.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='price' className='pt-3 pb-4'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type='number'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                                <Form.Text className="text-muted">
                                    A numeric value in the range of 0 to 100,000,000
                                </Form.Text>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Submit
                            </Button>

                        </Form>
                    )
                }
            </FormContainer>
        </div>
    )

}

export default BondCreateView