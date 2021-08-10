import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import BondsBuyView from "./views/BondsBuyView";
import BondsSellView from "./views/BondsSellView"
import BondCreateView from "./views/BondCreateView"

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Route exact path='/'><Redirect to='/login'/></Route>
            <Route path='/login' component={LoginView} />
            <Route path='/register' component={RegisterView} />
            <Route path='/buy' component={BondsBuyView} />
            <Route path='/sell' component={BondsSellView} />
            <Route path='/bonds/add' component={BondCreateView} />
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
