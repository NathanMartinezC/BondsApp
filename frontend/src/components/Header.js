import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import MoneyConverter from './MoneyConverter'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand>BondsApp</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse>
                        <Nav className='ml-auto'>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ): (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && (
                                <div className='inline-block'>
                                    <NavDropdown title='Actions' id='actions'>

                                        <LinkContainer to='/sell'>
                                            <NavDropdown.Item>My Bonds</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/buy'>
                                            <NavDropdown.Item>Buy Bonds</NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>
                                </div> 
                            )}

                            {userInfo && (
                                <div className='text-right'>
                                    <MoneyConverter/>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header