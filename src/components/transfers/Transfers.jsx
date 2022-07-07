import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Navbar from '../Navbar'
import { StyledTextInput, StyledFormAreaAccounts, StyledFormButton, StyledLabel, ButtonGroup, StyledSelect, StyledTable, STHead, STHeadTR, STBody, STH, STBodyTR, STD, cardShadow,Stylederror } from '../Styles'
//Icons
import { FiEdit2, FiTrash2 } from 'react-icons/fi'


function Transfers() {
  const [cookies] = useCookies(['auth_token']);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [TotalTran, setTotalTran] = useState([]);

  const [cuenta_destino, setCuentaDestino] = useState("");
  const [idCuentaDestino, setIdCuentaDestino] = useState("");
  const [idCuentaOrigen, setIdCuentaOrigen] = useState("");

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


  const getTransfers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/transfers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const transfers = await response.json();
    return transfers;
  };
  

  const getTotalTransfers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/transferTotal`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const TotalTransfer = await response.json();
    return TotalTransfer;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await getCategories();
      setCategories(categories.data);

      const accounts = await getAccounts();
      setAccounts(accounts.data);

      const transfers = await getTransfers();
      setTransfers(transfers.data);

      const total = await getTotalTransfers();
      setTotalTran(total.data);

    };
    getAllCategories();
  }, []);


  const createTransfer = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/transfer`,
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

  const updateOrigin = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/origen`,
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

  const updateDestin = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/destino`,
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

  const createTransferIncome = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/transferIncome`,
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

  const createTransferExpense = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/transferExpense`,
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





  const handleAddTransfer = async (e) => {
    e.preventDefault();
    const cuenta_id_origen = idCuentaOrigen;
    const cuenta_id_destino = idCuentaDestino;
    const nombre_ingreso = "Transferencia entre cuentas";
    const cantidad = costRef.current.value;
    const categoria_id = 5;
    

    if (cuenta_id_origen === '' || cuenta_id_destino==='' || cantidad === '') return setError('Failed to add transfer');
    setDisableSubmit(true);
    try {
      await createTransfer({ cuenta_id_origen,cantidad,cuenta_id_destino });
      await updateOrigin({ cuenta_id_origen,cantidad });
      await updateDestin({ cuenta_id_destino,cantidad });
      await createTransferIncome({ cuenta_id_destino,nombre_ingreso,cantidad,categoria_id });
      await createTransferExpense({ cuenta_id_origen,nombre_ingreso,cantidad,categoria_id });

      const transfers = await getTransfers();
      setTransfers(transfers.data);

      const total = await getTotalTransfers();
      setTotalTran(total.data);

    } catch (error) {
      console.log(error);
      setError('Failed to add transfer');
    }
    setDisableSubmit(false);
    setIdCuentaOrigen("");
    //incomeNameRef.current.value = '';
    costRef.current.value = '';
    setIdCuentaDestino("");

  };
  
  return (
    <Container>
      <Navbar />
      <SubContainer>
        <SectionOne>
          <StyledFormAreaAccounts>


          <form onSubmit={handleAddTransfer}>
            <label>Add transfer</label> 
            console.log()

              <StyledLabel>Select Origin Account</StyledLabel>
              <StyledSelect onChange={event => setIdCuentaOrigen(event.target.value)}>
              <option>Select account</option>
                {accounts.map((account,index) => (
                  <option key={index} value={account.CUENTA_ID}>{account.NOMBRE_CUENTA}</option>
                ))
                }
              </StyledSelect>

              <StyledLabel>Select Destination Account</StyledLabel>
              <StyledSelect onChange={event => setIdCuentaDestino(event.target.value)}>
              <option>Select account</option>
                {accounts.map((account,index) => (
                  <option key={index} value={account.CUENTA_ID}>{account.NOMBRE_CUENTA}</option>
                ))
                }
              </StyledSelect>

              <StyledLabel>Amount</StyledLabel>
              <StyledTextInput
                name="Cost"
                type="text"
                placeholder="0.00"
                ref={costRef}
              />

              {error && <Stylederror>{error}</Stylederror>}

              <ButtonGroup>
                <StyledFormButton type="submit">
                  Add transfer
                </StyledFormButton>
              </ButtonGroup>

              <br />
              <StyledLabel>Total transfers</StyledLabel>
              <div>
              {TotalTran.map((totaltra)=>(
                totaltra.total
              ))
              
              }
            </div>

            </form>

          </StyledFormAreaAccounts>
        </SectionOne>

        <SectionTwo>
          <label>Your Transfers</label>
          <StyledTable>
            <STHead>
              <STHeadTR>
                <STH>Account Name</STH>
                <STH>Origin Account</STH>
                <STH>Destin Account</STH>
                <STH>Cost</STH>
              </STHeadTR>
            </STHead>

            <STBody>
            {transfers.map((transfer,index) => (
                  
                  <STBodyTR key={index}>
    
                    <STD>{transfer.NOMBRE}</STD>
                    <STD>{transfer.CUENTAORIGEN}</STD>
                    <STD>{transfer.CUENTADESTINO}</STD>
                    <STD>{transfer.CANTIDAD}</STD>
    
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




export default Transfers