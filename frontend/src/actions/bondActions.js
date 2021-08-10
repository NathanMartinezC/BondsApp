import axios from 'axios'
import {
    BOND_BUY_LIST_REQUEST,
    BOND_BUY_LIST_SUCCESS,
    BOND_BUY_LIST_FAIL,

    BOND_SELL_LIST_REQUEST,
    BOND_SELL_LIST_SUCCESS,
    BOND_SELL_LIST_FAIL,

    BOND_CREATE_REQUEST,
    BOND_CREATE_SUCCESS,
    BOND_CREATE_FAIL,

    BOND_BUY_UPDATE_REQUEST,
    BOND_BUY_UPDATE_SUCCESS,
    BOND_BUY_UPDATE_FAIL,
    
    BOND_DOLLAR_VALUE_REQUEST,
    BOND_DOLLAR_VALUE_SUCCESS,
    BOND_DOLLAR_VALUE_FAIL,

    BOND_MONEY_TYPE_SET,
} from '../constants/bondConstants'


export const getBondBuyList = () => async (dispatch, getState) => {
    try{
        dispatch({ 
            type: BOND_BUY_LIST_REQUEST 
        })
        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/bonds/buy/`,
            config
        )
        dispatch({
            type: BOND_BUY_LIST_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: BOND_BUY_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}


export const getBondSellList = () => async (dispatch, getState) => {
    try{
        dispatch({ 
            type: BOND_SELL_LIST_REQUEST 
        })
        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/bonds/sell/`,
            config
        )
        dispatch({
            type: BOND_SELL_LIST_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: BOND_SELL_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}


export const bondSellCreate = (bond) => async (dispatch, getState) => {
    try{
        dispatch({
            type: BOND_CREATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/bonds/create/`,
            bond,
            config
        )
        dispatch({
            type: BOND_CREATE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: BOND_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const bondBuyUpdate = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOND_BUY_UPDATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/bonds/buy/${id}/`,
            {},
            config
        )

        dispatch({
            type: BOND_BUY_UPDATE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: BOND_BUY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getBondDollarValue = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: BOND_DOLLAR_VALUE_REQUEST
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
              }
        }

        const { data } = await axios.get(
            'api/bonds/dollar/',
            config
        )
        
        dispatch({
            type: BOND_DOLLAR_VALUE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: BOND_DOLLAR_VALUE_FAIL,
            payload: error.message
        })
    }
}

export const setBondMoneyType = (moneyId, dispatch) => {
    dispatch({
        type: BOND_MONEY_TYPE_SET,
        payload: moneyId
    })
}
