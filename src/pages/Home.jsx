import { StyledTitle,StyledSubTitle,Avatar,Styledbutton,ButtonGroup } from "../components/Styles";

//logo
import Logo from "./../assets/logo.png"

const Home = () =>{
    return(
       <>
        <div>
            <div style={{
                position:"absolute",
                top:0,
                left:0,
                backgroundColor:"transparent",
                width:"100%",
                padding:"15px",
                display:"flex",
                justifyContent:"flex-start",
            }}>
                <Avatar image={Logo}/>
            </div>
            <StyledTitle size={65}>
               Welcome to Budget App
            </StyledTitle>
            <StyledSubTitle size={27}>
                Feel fre to manage your money
            </StyledSubTitle>

            <ButtonGroup>
                <Styledbutton to="/login">Login</Styledbutton>
                <Styledbutton to="/signup">Signup</Styledbutton>
            </ButtonGroup>
            
         </div>
           
            
        </>
    );
}

export default Home;