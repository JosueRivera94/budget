import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Navbar from  '../Navbar'
import {StyledTextInput,StyledFormAreaAccounts,StyledFormButton,StyledTitle,StyledLabel,colors,ButtonGroup,StyledSelect,StyledTable, STHead, STHeadTR, STBody, STH, STBodyTR, STD,cardShadow,Stylederror } from '../Styles'

//Icons
import {FiEdit2,FiTrash2} from 'react-icons/fi'


function Account() {
  const [cookies] = useCookies(['auth_token']);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [valueCurrency, setValueCurrency] = useState("");
  const nameRef = useRef();
  const numberRef = useRef();
  const bankRef = useRef();
  const budgetRef= useRef();

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

  useEffect(() => {
    const getAllAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts.data);

    };
    getAllAccounts();
  }, []);

  const createAccount = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/account`,
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


  const handleAddAccount = async (e) => {
    e.preventDefault();
    const nombre_cuenta = nameRef.current.value;
    const numero_cuenta = numberRef.current.value;
    const banco_nombre = bankRef.current.value;
    const currency_id = valueCurrency;
    const balance = budgetRef.current.value;

    if (nombre_cuenta === '' || numero_cuenta === '' || banco_nombre==='' || balance==='') return  setError('Failed to add account');
    setDisableSubmit(true);
   
    try {
      setError('');
      await createAccount({ nombre_cuenta, numero_cuenta, banco_nombre, currency_id, balance });
      const accounts = await getAccounts();
      setAccounts(accounts.data);
      console.log()
    } catch (error) {
      console.log(error);
      setError('Failed to add account');
    }
    setDisableSubmit(false);
    nameRef.current.value = '';
    numberRef.current.value = '';
    bankRef.current.value = '';
    setValueCurrency("");
    budgetRef.current.value = '';

  };


  return (
    <Container>
      <Navbar />
      <SubContainer>
        <SectionOne>

          <StyledFormAreaAccounts>

          <form onSubmit={handleAddAccount}>
            <label>Add account</label> 
              <StyledLabel>Account Name</StyledLabel>
              <StyledTextInput
                name="account_name"
                type="text"
                placeholder="Account name"
                ref={nameRef}
              />

              <StyledLabel>Account Number</StyledLabel>
              <StyledTextInput
                name="account_number"
                type="text"
                placeholder="Account number"
                ref={numberRef}
              />

              <StyledLabel>Account's Bank</StyledLabel>
              <StyledTextInput
                name="account_bank"
                type="text"
                placeholder="Bank name"
                ref={bankRef}
              />

              <StyledLabel>Currency</StyledLabel>
              <StyledSelect onChange={event => setValueCurrency(event.target.value)} >
                <option>Select currency</option>
                <option value={1}  >Lempira</option>
                <option value={2}  >Dolar</option>
              </StyledSelect>

              <StyledLabel>Account Budget</StyledLabel>
              <StyledTextInput
                name="account_budget"
                type="text"
                placeholder="0.00"
                ref={budgetRef}
              />

              {error && <Stylederror>{error}</Stylederror>}

              <ButtonGroup>
                <StyledFormButton type="submit">
                  Add account
                </StyledFormButton>
              </ButtonGroup>

            </form>

            

          </StyledFormAreaAccounts>
          
        </SectionOne>

        <SectionTwo>
          <label>Your Acounts</label>
          <StyledTable>
            <STHead>
              <STHeadTR>
                <STH>Account Name</STH>
                <STH>Account Number</STH>
                <STH>Account's Bank</STH>
                <STH>Currency</STH>
                <STH>Balance</STH>
                <STH>Creation date</STH>
              </STHeadTR>
            </STHead>

            <STBody>
            {accounts.map((account,index) => (
                  
              <STBodyTR key={index}>

                <STD>{account.NOMBRE_CUENTA}</STD>
                <STD>{account.NUMERO_CUENTA}</STD>
                <STD>{account.BANCO_NOMBRE}</STD>
                <STD>{account.MONEDA}</STD>
                <STD>{account.BALANCE}</STD>
                <STD>{account.Date}</STD>

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

  const Container=styled.div`
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

const SubContainer=styled.div`
  margin: 0.5rem 0;
  height: 80%;
  width: 100%;
  display: flex;
  //flex-direction: column;
  gap: 4rem;

  border-style: solid;
  border-bottom-left-radius:50px;
  border-bottom-right-radius:50px;
  border-top-right-radius:50px;
  border-color:#1F2937;

  @media screen and (min-width: 320px) and (max-width: 1080px){
      height: 100%
    }

`;

const TitleText=styled.h3`
  height: 17%;
`;

const SectionOne=styled.div`
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

const SectionTwo=styled.div`
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




export default Account