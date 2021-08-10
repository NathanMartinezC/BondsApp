import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { getBondDollarValue } from '../actions/bondActions'
import { BOND_MONEY_TYPE_SET } from '../constants/bondConstants'

function MoneyConverter(){

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dollarValue = useSelector(state => state.bondDollarValue)
    const { dollar } = dollarValue

    const [moneyType, setMoneyType] = useState('MXN')

    useEffect(()=>{
        dispatch({
            type: BOND_MONEY_TYPE_SET,
            payload: moneyType
        })
        if(userInfo && moneyType === 'USD' && dollar.value === 0){
            dispatch(getBondDollarValue())
        }
    },[dispatch, moneyType, userInfo ])

    return (
        <Form.Select onChange={(e)=>{setMoneyType(e.target.value)}} value={moneyType}>
            <option value='MXN'>MXN</option>
            <option value='USD'>USD</option>
        </Form.Select>
    )
}

export default MoneyConverter