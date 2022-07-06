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
import MainContent from'../components/dashboard/MainContent'

//logo
import Logo from "./../assets/logo.png";

const Dashboard = () => {
  return (
    <>
    <Container>
       <Sidebar/>
       <MainContent/>
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



{/*
<div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "transparent",
            width: "100%",
            padding: "15px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Avatar image={Logo} />
        </div>
        <StyledFormArea bg={colors.dark2}>
          <StyledTitle size={65}>Welcome User</StyledTitle>
          

          <ButtonGroup>
            <Styledbutton to="#">Logout</Styledbutton>
          </ButtonGroup>
        </StyledFormArea>
      </div>

*/}