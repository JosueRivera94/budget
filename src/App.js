//styled components
import {StyledContainer} from './components/Styles'
//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Account from './pages/ManageAccount'
import Expenses from './pages/ManageExpenses'
import Incomes from './pages/ManageIncomes'
import Transfers from './pages/ManageTransfers'
import History from './pages/ManageHistory'
import ExpenseHistory from './pages/ManageExpenHistory'
import AuthProvider from './context/AuthProvider';
import { CookiesProvider } from 'react-cookie';

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'


function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
      <Router>
      <StyledContainer>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/accounts' element={<Account/>}></Route>
        <Route path='/expenses' element={<Expenses/>}></Route>
        <Route path='/incomes' element={<Incomes/>}></Route>
        <Route path='/transfers' element={<Transfers/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path='/historyExpen' element={<ExpenseHistory/>}></Route>
        <Route path='/' element={<Home/>}></Route>
      </Routes>

    </StyledContainer>
    </Router>
    </CookiesProvider>
    </AuthProvider>
    
    

  );
}

export default App;
