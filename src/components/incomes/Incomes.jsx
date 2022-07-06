import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Navbar from '../Navbar'
import { StyledTextInput, StyledFormAreaAccounts, StyledFormButton, StyledLabel, ButtonGroup, StyledSelect, StyledTable, STHead, STHeadTR, STBody, STH, STBodyTR, STD, cardShadow,Stylederror } from '../Styles'
//Icons
import { FiEdit2, FiTrash2 } from 'react-icons/fi'


function Incomes() {
  const [cookies] = useCookies(['auth_token']);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [TotalIncom, setTotalIncom] = useState([]);

  const [idCategory, setIdCategory] = useState("");
  const [idCuenta, setIdCuenta] = useState("");

  const incomeNameRef = useRef();
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

  const getIncomes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/income`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const incomes = await response.json();
    return incomes;
  };

  const getTotalIncomes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/incomeTotal`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const TotalIncomes = await response.json();
    return TotalIncomes;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await getCategories();
      setCategories(categories.data);

      const accounts = await getAccounts();
      setAccounts(accounts.data);

      const incomes = await getIncomes();
      setIncomes(incomes.data);

      const total = await getTotalIncomes();
      setTotalIncom(total.data);

    };
    getAllCategories();
  }, []);


  const createIncome = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/income`,
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

  const updateBalanceIncome = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/updateIncome`,
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

  const handleAddIncome = async (e) => {
    e.preventDefault();
    const cuenta_id = idCuenta;
    const nombre_ingreso = incomeNameRef.current.value;
    const cantidad = costRef.current.value;
    const categoria_id = idCategory;

    if (nombre_ingreso === '' || cantidad === '') return setError('Failed to add income');
    setDisableSubmit(true);
    try {
      await createIncome({ cuenta_id,nombre_ingreso,cantidad,categoria_id });
      await updateBalanceIncome({ cuenta_id,cantidad });

      const incomes = await getIncomes();
      setIncomes(incomes.data);

      const total = await getTotalIncomes();
      setTotalIncom(total.data);

    } catch (error) {
      console.log(error);
      setError('Failed to add expense')
    }
    setDisableSubmit(false);
    setIdCuenta("");
    incomeNameRef.current.value = '';
    costRef.current.value = '';
    setIdCategory("");

  };
  
  return (
    <Container>
      <Navbar />
      <SubContainer>
        <SectionOne>
          <StyledFormAreaAccounts>


          <form onSubmit={handleAddIncome}>
            <label>Add income</label> 

              <StyledLabel>Select Account</StyledLabel>
              <StyledSelect onChange={event => setIdCuenta(event.target.value)}>
              <option>Select account</option>
                {accounts.map((account,index) => (
                  <option key={index} value={account.CUENTA_ID}>{account.NOMBRE_CUENTA}</option>
                ))
                }
              </StyledSelect>

              <StyledLabel>Category</StyledLabel>
              <StyledSelect  onChange={event => setIdCategory(event.target.value)}>
                <option>Select category</option>
                {categories.map((category,index) => (
                  <option key={index} value={category.CATEGORIA_ID}>{category.NOMBRE}</option>
                ))
                }
              </StyledSelect>

              <StyledLabel>Income Name</StyledLabel>
              <StyledTextInput
                name="expense_name"
                type="text"
                placeholder="Expense name"
                ref={incomeNameRef}
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
                <StyledFormButton type="submit">
                  Add income
                </StyledFormButton>
              </ButtonGroup>

              <br />
              <StyledLabel>Total incomes</StyledLabel>
              <div>
              {TotalIncom.map((totalInco)=>(
                totalInco.total
              ))
              
              }
            </div>

            </form>

          </StyledFormAreaAccounts>
        </SectionOne>

        <SectionTwo>
          <label>Your Incomes</label>
          <StyledTable>
            <STHead>
              <STHeadTR>
                <STH>Account Name</STH>
                <STH>Category</STH>
                <STH>Income name</STH>
                <STH>Cost</STH>
                <STH>Creation date</STH>
              </STHeadTR>
            </STHead>

            <STBody>
            {incomes.map((income,index) => (
                  
                  <STBodyTR key={index}>
    
                    <STD>{income.NOMBRE_CUENTA}</STD>
                    <STD>{income.CATEGORIA}</STD>
                    <STD>{income.NOMBRE_INGRESO}</STD>
                    <STD>{income.CANTIDAD}</STD>
                    <STD>{income.Date}</STD>
    
                  </STBodyTR>
               ))
              }
    
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




export default Incomes