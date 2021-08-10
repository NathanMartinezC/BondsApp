import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { 
    bondBuyListReducer, 
    bondSellListReducer, 
    bondCreateReducer,
    bondBuyUpdateReducer, 
    bondMoneyTypeReducer, 
    bondDollarValueReducer 
} from './reducers/bondReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

    bondBuyList: bondBuyListReducer,
    bondSellList: bondSellListReducer,
    bondCreate: bondCreateReducer,
    bondUpdate: bondBuyUpdateReducer,
    bondMoneyType: bondMoneyTypeReducer,
    bondDollarValue: bondDollarValueReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    bondMoneyType: { moneyType: 'MXN' },
    bondDollarValue: { dollar: { value: 0, date: '' } }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store