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
    BOND_CREATE_RESET,

    BOND_BUY_UPDATE_REQUEST,
    BOND_BUY_UPDATE_SUCCESS,
    BOND_BUY_UPDATE_FAIL,
    BOND_BUY_UPDATE_RESET,

    BOND_MONEY_TYPE_SET,

    BOND_DOLLAR_VALUE_REQUEST,
    BOND_DOLLAR_VALUE_SUCCESS,
    BOND_DOLLAR_VALUE_FAIL,

} from '../constants/bondConstants'


export const bondBuyListReducer = (state={ bonds: [] }, action) => {
    switch(action.type){
        case BOND_BUY_LIST_REQUEST:
            return { loading: true, bonds: [] }
        case BOND_BUY_LIST_SUCCESS:
            return { loading: false, bonds: action.payload }
        case BOND_BUY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const bondSellListReducer = (state={ bonds: [] }, action) => {
    switch(action.type){
        case BOND_SELL_LIST_REQUEST:
            return { loading: true, bonds: [] }
        case BOND_SELL_LIST_SUCCESS:
            return { loading: false, bonds: action.payload }
        case BOND_SELL_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const bondCreateReducer = (state={}, action) => {
    switch(action.type){
        case BOND_CREATE_REQUEST:
            return { loading: true }
        case BOND_CREATE_SUCCESS:
            return { loading: false, success: true, bond: action.payload }
        case BOND_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BOND_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const bondBuyUpdateReducer = (state={}, action) => {
    switch(action.type){
        case BOND_BUY_UPDATE_REQUEST:
            return { loading: true }
        case BOND_BUY_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case BOND_BUY_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case BOND_BUY_UPDATE_RESET:
            return {}
        default:
            return state

    }
}


export const bondDollarValueReducer = (state={dollar: {}}, action) => {
    switch(action.type){
        case BOND_DOLLAR_VALUE_REQUEST:
            return { loading: true }
        case BOND_DOLLAR_VALUE_SUCCESS:
            return { loading: false, dollar: action.payload }
        case BOND_DOLLAR_VALUE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const bondMoneyTypeReducer = (state = {}, action) => {
    switch(action.type){
        case BOND_MONEY_TYPE_SET:
            return {
                ...state.bondMoneyType,
                moneyType: action.payload
            }
        default:
            return state
    }
}