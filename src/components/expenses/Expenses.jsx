import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Navbar from '../Navbar'
import { StyledTextInput, StyledFormAreaAccounts, StyledFormButton, StyledTitle, StyledLabel, colors, ButtonGroup, StyledSelect, StyledTable, STHead, STHeadTR, STBody, STH, STBodyTR, STD, cardShadow,Stylederror } from '../Styles'


//Icons
import { FiEdit2, FiTrash2 } from 'react-icons/fi'


function Expenses() {
  const [cookies] = useCookies(['auth_token']);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [TotalExpen, setTotalExpense] = useState([]);

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

  const getExpenses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expense`,
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

  const getTotalExpenses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expensesTotal`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const TotalExpenses = await response.json();
    return TotalExpenses;
  };

      
  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await getCategories();
      setCategories(categories.data);

      const accounts = await getAccounts();
      setAccounts(accounts.data);

      const expenses = await getExpenses();
      setExpenses(expenses.data);

      const total = await getTotalExpenses();
      setTotalExpense(total.data);
    };
    getAllCategories();
  }, []);

  const createExpense = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/expense`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    await response.json();
  };

  const updateBalance = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/updateBalance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    await response.json();
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const cuenta_id = idCuenta;
    const nombre_egreso = expenseNameRef.current.value;
    const cantidad = costRef.current.value;
    const categoria_id = idCategory;

    if (nombre_egreso === '' || cantidad === '') return  setError('Failed to add expense');
    setDisableSubmit(true);
    try {
      await createExpense({ cuenta_id,nombre_egreso,cantidad,categoria_id });
      await updateBalance({ cuenta_id,cantidad });

      const expenses = await getExpenses();
      setExpenses(expenses.data);

      const total = await getTotalExpenses();
      setTotalExpense(total.data);
    } catch (error) {
      console.log(error);
      setError('Failed to add expense');
    }
    setDisableSubmit(false);
    setIdCuenta("");
    expenseNameRef.current.value = '';
    costRef.current.value = '';
    setIdCategory("");

  };





  return (
    <Container>
      <Navbar />
      <SubContainer>
        <SectionOne>
          <StyledFormAreaAccounts>
            <form onSubmit={handleAddExpense}>
              <label>Add expense</label>

              <StyledLabel>Select Account</StyledLabel>
              <StyledSelect onChange={(event) => setIdCuenta(event.target.value)}>
                <option>Select account</option>
                {accounts.map((account, index) => (
                  <option key={index} value={account.CUENTA_ID}> {account.NOMBRE_CUENTA} </option>
                ))}
              </StyledSelect>

              <StyledLabel>Category</StyledLabel>
              <StyledSelect onChange={(event) => setIdCategory(event.target.value)}>
                <option>Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.CATEGORIA_ID}>{category.NOMBRE}</option>
                ))}
              </StyledSelect>

              <StyledLabel>Expense Name</StyledLabel>
              <StyledTextInput
                name="expense_name"
                type="text"
                placeholder="Expense name"
                ref={expenseNameRef}
              />

              <StyledLabel>Cost</StyledLabel>
              <StyledTextInput
                name="Cost"
                type="text"
                placeholder="0.00"
                ref={costRef}
              />

              {error && <Stylederror>{error}</Stylederror>}

              <ButtonGroup>
                <StyledFormButton type="submit">Add expense</StyledFormButton>
              </ButtonGroup>
            </form>

            <br />
            <StyledLabel>Total expenses</StyledLabel>
            <div>
              {TotalExpen.map((totalExpen)=>(
                totalExpen.total
              ))
              
              }
            </div>

          </StyledFormAreaAccounts>
        </SectionOne>

        <SectionTwo>
          <label>Your Expenses</label>

          <StyledTable>
            <STHead>
              <STHeadTR>
                <STH>Account Name</STH>
                <STH>Category</STH>
                <STH>Expense name</STH>
                <STH>Cost</STH>
                <STH>Creation date</STH>
              </STHeadTR>
            </STHead>

            <STBody>
              {expenses.map((expense, index) => (
                <STBodyTR key={index}>
                  <STD>{expense.NOMBRE_CUENTA}</STD>
                  <STD>{expense.CATEGORIA}</STD>
                  <STD>{expense.NOMBRE_EGRESO}</STD>
                  <STD>{expense.CANTIDAD}</STD> 
                  <STD>{expense.Date}</STD>     
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




export default Expenses