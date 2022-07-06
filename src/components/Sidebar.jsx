import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Badge from  '../components/dashboard/Badge'
import AvatarImage from '../assets/avatar.png'
import {RiHomeLine}  from 'react-icons/ri'
import { BiTransferAlt,BiWallet,BiLogInCircle,BiLogOut,BiHistory } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import {colors,StyledEnlace, StyledLogOutButton}  from '../components/Styles'


function Sidebar() {
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const HandleLogout = async () => {
      setError('');
      try {
        await authCtx.logout();
        navigate('/login', { replace: true });
      } catch {
        setError('Failed to log out');
      }
    };




  return (
    <Container>
        <ProfileContainer>
            <Avatar src={AvatarImage}/>
            <Name> {`${authCtx.currentUser.nombre}`}</Name>
            <Badge content={"Welcome!"}/>
        </ProfileContainer>
        
        <LinksContainer>
            <Enlaces>
                <StyledEnlace to="/dashboard">
                    <RiHomeLine/>
                    <h3>Dashboard</h3>
                </StyledEnlace>

                <StyledEnlace to="/accounts">
                    <MdOutlineAccountBalanceWallet/>
                    <h3 >Accounts</h3> 
                   
                </StyledEnlace>

                <StyledEnlace to="/expenses">
                    <BiWallet/>
                    <h3>Expenses</h3>
                </StyledEnlace>

                <StyledEnlace to="/incomes">
                    <BiLogInCircle/>
                    <h3>Incomes</h3>
                </StyledEnlace>

                <StyledEnlace to="/transfers">
                    <BiTransferAlt/>
                    <h3>Transfers</h3>
                </StyledEnlace>

                <StyledEnlace to="/history">
                    <BiHistory/>
                    <h3>Income History</h3>
                </StyledEnlace>

                <StyledEnlace to="/historyExpen">
                    <BiHistory/>
                    <h3>Expense History</h3>
                </StyledEnlace>


            </Enlaces>

            <ContactContainer>
            <StyledLogOutButton onClick={HandleLogout}>
                <h3><BiLogOut/> Logout</h3>
            </StyledLogOutButton>
            </ContactContainer>
        </LinksContainer>
    </Container>
  )
}

const Container = styled.div`
    width: 15%;
    height: 100% !important;
    //border-radius: 1rem;
    background-color: ${colors.theme};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    @media screen and (min-width: 320px) and (max-width: 1080px){
      width: 100%;
      height: max-content  !important;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Avatar = styled.img`
    height: 5rem;
    border-radius: 6rem;
    margin-top: 20%;
`;

const Name = styled.h1`
    color: white;
    font: 1rem;
    font-weight: 400;
    margin: 0.8rem 0 0.5rem 0;
`;

const LinksContainer=styled.div`
    background-color:${colors.dark1};
    height: 100%;
    width: 100%;
    //border-radius: 1rem;
`;

const Enlaces=styled.ul`
    list-style-type: none;
    display:flex;
    flex-direction: column;
    padding-top: 1rem;
    height: 60%;
`;

{/*
const Enlace=styled.li`
    margin-left: 20%;
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    color: ${colors.light1};
    cursor: pointer;
    h3{
        font-weight: 300;
    }
    svg{
        font-size: 1.1rem;
        margin-top: 3%;
    }
`;
 */}

const ContactContainer=styled.div`
    width: 75%;
    color: ${colors.light1};
    height: 15%;
    margin: auto auto;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 55px;
    align-items:center;
  
`;


export default Sidebar


