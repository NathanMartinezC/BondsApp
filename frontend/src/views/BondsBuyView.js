import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getBondBuyList, bondBuyUpdate } from '../actions/bondActions'


function BondsBuyView({ history }){

    const dispatch = useDispatch()

    const bondBuyList = useSelector(state => state.bondBuyList)
    const { error, loading, bonds } = bondBuyList

    const bondUpdate = useSelector(state => state.bondUpdate)

    const { error: errorUpdate, 
        loading: loadingUpdate, 
        success: successBondUpdate } = bondUpdate

    const dollarValue = useSelector(state => state.bondDollarValue)
    const { dollar, loading: loadingDollarValue } = dollarValue

    const currency = useSelector(state => state.bondMoneyType)
    const { moneyType } = currency

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        //bond buy reset
        if(userInfo){
            dispatch(getBondBuyList)
        } else {
            history.push('/login')
        }
        dispatch(getBondBuyList())
    }, [dispatch, history, userInfo, successBondUpdate])

    const buyHandler = (id) => {
        dispatch(bondBuyUpdate(id))
    }

    const setBondPrice = (price, moneyType, value) => {
        if(moneyType==='USD'){
            return (price/value).toFixed(4)
        } else {
            return price
        }
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Buy Bonds</h1>
                </Col>
            </Row>

            {loading || loadingDollarValue || loadingUpdate
                ? ( <Loader/> )
                : errorUpdate
                    ? (<Message variant='danger'>{errorUpdate}</Message>)
                : error
                    ? ( <Message variant='danger'>{error}</Message> )
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm mt-3'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CURRENCY</th>
                                        <th>NUMBER</th>
                                        <th>SELLER</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bonds.map(bond => (
                                        <tr key={bond.id}>
                                            <td>{bond.id}</td>
                                            <td>{bond.name}</td>
                                            <td>${setBondPrice(bond.price, moneyType, dollar.value)}</td>
                                            <td>{moneyType}</td>
                                            <td>{bond.number}</td>
                                            <td>{bond.seller ? bond.seller.name : ' '}</td>
                                            <td className='text-center'>
                                                <Button variant='success' className='btn-sm' onClick={() => buyHandler(bond.id)}>
                                                    Buy
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )
            }
        </div>
    )
}

export default BondsBuyView