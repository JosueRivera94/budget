import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Navbar from '../Navbar'

import { StyledTextInput, StyledFormAreaAccounts, StyledFormButton, StyledTitle, StyledLabel, colors, ButtonGroup, StyledSelect, StyledTable, STHead, STHeadTR, STBody, STH, STBodyTR, STD, cardShadow,FromPickerStyled,ToPickerStyled } from '../Styles'


//Icons
import { FiEdit2, FiTrash2 } from 'react-icons/fi'


function ExpenseHistory() {
  const [cookies] = useCookies(['auth_token']);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [TotalExpen, setTotalExpense] = useState([]);

  const [dateFrom,setDateFrom] = useState("")
  const [dateTo,setDateTo] = useState(null)
  const [option,setOption] = useState("")

  const [idCategory, setIdCategory] = useState("");
  const [idCuenta, setIdCuenta] = useState("");



  const expenseNameRef = useRef();
  const costRef= useRef();

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/category`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const categories = await response.json();
    return categories;
  };

  const getAccounts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/account`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const accounts = await response.json();
    return accounts;
  };


  //Filters
  const getExpensesByDate = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expenseBy/${new Date(dateFrom).toISOString()}/${new Date(dateTo).toISOString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const expenses = await response.json();
    return expenses;
  };


  const handlegetExpensesByDate = async () => {
    try {
      await getExpensesByDate();

      const egresos = await getExpensesByDate();
      setMovements(egresos.data);

    } catch (error) {
      console.log(error);
    }

  };






  const getExpensesByCategory = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expenseCategory/${id}/${new Date(dateFrom).toISOString()}/${new Date(dateTo).toISOString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const expensesPorCategory = await response.json();
    return expensesPorCategory;
  };

  const handleExpensesByCategory = async (event) =>{
    setIdCategory(event.target.value)
    const idcat = (event.target.value)
    
    const egresosByCat = await getExpensesByCategory(idcat);
    setMovements(egresosByCat.data);
  }



  const getExpensesByCuenta = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expenseCuenta/${id}/${new Date(dateFrom).toISOString()}/${new Date(dateTo).toISOString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const expensesPorCategory = await response.json();
    return expensesPorCategory;
  };

  const handleExpensesByCuenta = async (event) =>{
    setIdCategory(event.target.value)
    const idcuen = (event.target.value)
    
    const egresosByCuen = await getExpensesByCuenta(idcuen);
    setMovements(egresosByCuen.data);
  }
      



  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await getCategories();
      setCategories(categories.data);

      const accounts = await getAccounts();
      setAccounts(accounts.data);


    };
    getAllCategories();
  }, []);

  const handleClear =  e => {
    e.target.reset()
  };




  return (
    <Container>
      <Navbar />
      <SubContainer>
        <SectionOne>
          <StyledFormAreaAccounts>
            <form onSubmit={handleClear}>
              <label>Filter Options</label>

              <StyledLabel>Date From</StyledLabel>
              <FromPickerStyled  selected={dateFrom}
                  onChange={(dateFrom) => setDateFrom(dateFrom)}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableMonthYearDropdown
                  placeholderText="Select Date" 
                  >
              </FromPickerStyled>

              <StyledLabel>Date To</StyledLabel>
              <ToPickerStyled  selected={dateTo}
                  onChange={(dateTo) => setDateTo(dateTo)} onCalendarClose={handlegetExpensesByDate}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableMonthYearDropdown
                  placeholderText="Select Date">
              </ToPickerStyled>


              <StyledLabel>Category</StyledLabel>
              <StyledSelect value={idCategory} onChange={(event)=> handleExpensesByCategory(event)}  >
                <option >Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.CATEGORIA_ID}>{category.NOMBRE}</option>
                ))}
              </StyledSelect>

              <StyledLabel>Select Account</StyledLabel>
              <StyledSelect onChange={(event)=> handleExpensesByCuenta(event)}>
                <option>Select account</option>
                {accounts.map((account, index) => (
                  <option key={index} value={account.CUENTA_ID}> {account.NOMBRE_CUENTA} </option>
                ))}
              </StyledSelect>

              <ButtonGroup>
                <StyledFormButton type="submit">Clear all</StyledFormButton>
              </ButtonGroup>


            </form>
          </StyledFormAreaAccounts>
        </SectionOne>

        <SectionTwo>
          <label>Your Expense History</label>

          <StyledTable>
            <STHead>
              <STHeadTR>
                <STH>Account Name</STH>
                <STH>Category</STH>
                <STH>Name</STH>
                <STH>Cost</STH>
                <STH>Creation date</STH>
              </STHeadTR>
            </STHead>

            <STBody>
              {movements.map((moves, index) => (
                <STBodyTR key={index}>
                  <STD>{moves.NOMBRE_CUENTA}</STD>
                  <STD>{moves.CATEGORIA}</STD>
                  <STD>{moves.nombre}</STD>
                  <STD>{moves.CANTIDAD}</STD> 
                  <STD>{moves.Date}</STD>     
                </STBodyTR>
                
              ))}
            </STBody>

            
          </StyledTable>
        </SectionTwo>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background: linear-gradient(to bottom right, white 0% right, #e6e4ff 70%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  margin: 1rem 8rem 1rem 4rem;

  @media screen and (min-width: 320px) and (max-width: 1080px){
    display: flex;
      flex-direction:column;
      width: 100%;
      margin: 1rem 0  0  0;
    }
`;

const SubContainer = styled.div`
  margin: 0.5rem 0;
  height: 80%;
  width: 100%;
  display: flex;
  //flex-direction: column;
  gap: 4rem;

  border-style:solid;
  border-bottom-left-radius:50px;
  border-bottom-right-radius:50px;
  border-top-right-radius:50px;
  border-color:#1F2937;

  @media screen and (min-width: 320px) and (max-width: 1080px){
      height: 100%
    }

`;

const TitleText = styled.h3`
  height: 17%;
`;

const SectionOne = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
  width: 30%;

 

  @media screen and (min-width: 320px) and (max-width: 1080px){
      flex-direction:column;
      align-items:center;
      height: max-content;
    }

`;

const SectionTwo = styled.div`
  //display: flex;
  gap: 2rem;
  height: 90%;
  width: 60%;
  text-align:center;

  margin:0 auto;
  margin-top:20px;
  padding:3px;
  border-radius:4px;
  box-shadow:${cardShadow};
  overflow-y:auto;

  @media screen and (min-width: 320px) and (max-width: 1080px){
      flex-direction:column;
      height: max-content;
      width: 100%
    }

`;





export default ExpenseHistory