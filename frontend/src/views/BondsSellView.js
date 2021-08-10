import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Badge, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getBondSellList } from '../actions/bondActions'


function BondsSellView({ history }){

    const dispatch = useDispatch()
    const bondSellList = useSelector(state => state.bondSellList)
    const { error, loading, bonds } = bondSellList

    const dollarValue = useSelector(state => state.bondDollarValue)
    const { dollar, loading: loadingDollarValue } = dollarValue

    const currency = useSelector(state => state.bondMoneyType)
    const { moneyType } = currency

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        //bond buy reset
        if(userInfo){
            dispatch(getBondSellList)
        } else {
            history.push('/login')
        }
        dispatch(getBondSellList())
    }, [dispatch, history, userInfo])

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
                    <h1>My Bonds</h1>
                </Col>
                <Col className='text-end'>
                    <Link
                        className='btn btn-sm btn-primary'
                        to='/bonds/add/'
                        role='button'
                    >
                        <i className='fas fa-plus'></i>
                        Create Bond
                    </Link>
                </Col>
            </Row>

            {loading || loadingDollarValue
                ? ( <Loader/> )
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
                                        <th>STATUS</th>
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
                                            {bond.buyer ? (
                                                <td className='text-center'>
                                                    <Badge bg='dark'>Bought</Badge>
                                                </td>
                                            ): (
                                                <td className='text-center'>
                                                    <Badge bg='info'>Available</Badge>
                                                </td>
                                            )}
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

export default BondsSellView