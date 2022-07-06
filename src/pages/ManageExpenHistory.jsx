import {
    StyledTitle,
    StyledSubTitle,
    Avatar,
    Styledbutton,
    ButtonGroup,
    StyledFormArea,
    colors,
  } from "../components/Styles";
  import styled from 'styled-components'
  import Sidebar from "../components/Sidebar";
  import ExpenseHistory from'../components/history/ExpenseHistory'
  
  //logo
  import Logo from "./../assets/logo.png";
  
  const Dashboard = () => {
    return (
      <>
      <Container>
         <Sidebar/>
         <ExpenseHistory/>
      </Container>
      
        
      </>
    );
  };
  
  const Container =styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    background: linear-gradient(to bottom right, white 0%, #c3c0d7 70%);
  
    @media screen and (min-width: 320px) and (max-width: 1080px){
        flex-direction:column;
      }
  `;
  
  export default Dashboard;
  