import { useCookies } from 'react-cookie';
import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import styled from 'styled-components'
import Badge from './Badge'
import {cardShadow,colors,hoverEffect} from '../Styles'
import AvatarImage from './../../assets/budget.png'
import AvatarImage2 from './../../assets/avatar4.png'

function Expenses() {
    const [cookies] = useCookies(['auth_token']);
    const authCtx = useContext(AuthContext);

    const [accounts, setAccounts] = useState([]);

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
    const getAll = async () => {

        const accounts = await getAccounts();
        setAccounts(accounts.data);


    };
    getAll();
  }, []);



  return (
    <AccountsContainer>
        <CardContent>

        {accounts.map((account, index) => (
            <Income>
                <Info>
                    <Avatar>
                        <img src={AvatarImage}/>
                    </Avatar>        
                    <TextContainer key={index}>
                        <Title>{account.NOMBRE_CUENTA}</Title>
                        <SubTitle>Bank: {account.BANCO_NOMBRE}</SubTitle>
                        <SubTitle>Currency: {account.MONEDA}</SubTitle>
                    </TextContainer>                
                </Info>
                <Container>
                    <Badge content="Balance = "/>
                    <Price>{account.BALANCE}</Price>
                </Container>
            </Income>
 ))
}
        </CardContent>
    </AccountsContainer>



  )
}

const AccountsContainer=styled.div`
    width: 35rem;
    border-radius: 1rem;
    margin-top: 1rem;
    background-color: white;
    height: 440%;
    box-shadow: ${cardShadow};
    transition: 0.4s ease-in-out;
    &:hover{
        box-shadow: ${hoverEffect};
    }
    overflow-y:auto;

    @media screen and (min-width: 320px) and (max-width: 1080px){
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;
const CardContent=styled.div`
        @media screen and (min-width: 320px) and (max-width: 1080px){
      margin: 2rem  0;
    }
`;
const Income=styled.div`
    display: flex;
    align-items: center;
    justify-content:  space-around;
    margin: 0.4rem;
    padding-top: 0.6rem;

    @media screen and (min-width: 320px) and (max-width: 1080px){
      flex-direction:column;
      gap:1rem;
    }
`;
const Info=styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    @media screen and (min-width: 320px) and (max-width: 1080px){
      flex-direction: column;
      width:100%;
      text-align:center;
    }
`;
const Avatar=styled.div`
    img{
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 3.5rem;
    }
`;
const TextContainer=styled.div`
    margin-left: 1rem;
`;
const Title=styled.h4`
`;
const SubTitle=styled.h5`
    font-weight: 400;
`;
const Container=styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    align-items: center;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        width: 100%;
      flex-direction:column;
      gap: 0.6rem;
    }
`;
const Price=styled.div`
`;


export default Expenses