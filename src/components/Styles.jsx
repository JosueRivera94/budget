import styled from  'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


//background
import bg from './../assets/bg.png'

//React router
import { Link } from 'react-router-dom';

export const colors={
    primary:"#fff",
    theme:"#0E97DE",
    light1:"#F3F4F6",
    light2:"#EBEFF9",
    dark1:"#1F2937",
    dark2:"#4B5563",
    dark3:"#9CA3AF",
    red:"#DC2626"
}

//Styled components
export const StyledContainer= styled.div`
    margin:0;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background: linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg});
    background-size:cover;
    background-attachment:fixed;
`;

//Home
export const StyledTitle= styled.h2`
    font-size:${(props)=>props.size}px;
    text-align: center;
    color:${(props) =>props.color ? props.color : colors.primary};
    padding:5px;
    margin-bottom:20px;
`;

export const StyledSubTitle=styled.p`
    font-size:${(props)=>props.size}px;
    text-align: center;
    color:${(props)=>props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 25px;
`;

export const Avatar = styled.div`
    width:100px;
    height:100px;
    border-radius:50px;
    background-image:url(${props => props.image});
    background-size:cover;
    background-position:center;
    margin:auto;
`;


export const Styledbutton=styled(Link)`
    padding:10px;
    width:150px;
    background-color:transparent;
    font-size:16px;
    border: 3px solid ${colors.primary};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration:none;
    text-align:center;
    transition: ease-in-out 0.3s;
    outline:0;

    &:hover{
        background-color:${colors.primary};
        color:${colors.theme};
        cursor: pointer;
    }
`;

export const StyledEnlace=styled(Link)`
    margin-left: 10%;
    margin-bottom: 1.5rem;
    display: flex;
    gap: 1rem;
    color: ${colors.light1};
    text-decoration:none;
    cursor: pointer;
    h3{
        font-weight: 280;
    }
    svg{
        font-size: 1rem;
        margin-top: 3%;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content:space-around;
    flex-direction:row;
    margin-top:25px;
`;

//Input
export const  StyledTextInput =styled.input`
    width:280px;
    padding:15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.light2};
    border: 0;
    outline: 0;
    display:block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && `background-color: ${colors.red}; color:${colors.primary};` }

    &:focus{
        background-color: ${colors.dark2};
        color:${colors.primary};
    }
`;

export const  StyledSelect =styled.select`
    width:280px;
    padding:15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.light2};
    background-color:#aab3bd;
    border: 0;
    outline: 0;
    display:block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    

    &:focus{
        background-color: ${colors.dark2};
        color:${colors.primary};
    }
`;

export const FromPickerStyled = styled(DatePicker)`
  width:280px;
  padding:15px;
  padding-left: 50px;
  font-size: 17px;
  letter-spacing: 1px;
  background-color:#aab3bd;
  border: 0;
  display:block;
  margin: 5px auto 10px auto;
`;

export const ToPickerStyled = styled(DatePicker)`
  width:280px;
  padding:15px;
  padding-left: 50px;
  font-size: 17px;
  letter-spacing: 1px;
  background-color:#aab3bd;
  border: 0;
  display:block;
  margin: 5px auto 10px auto;
  
`;


export const StyledLabel = styled.p`
    text-align:left;
    font-size:13px;
    font-weight:bold;
`;

export const Stylederror = styled.div`

    text-align:center;
    font-size:13px;
    font-weight:bold;
    align-items: center;
    display: flex;
    height:40px;
    justify-content: center;
    background-color:rgba(227, 71, 71, 0.6);
`;

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light1};
    text-align:center;
    padding:45px 55px;
`;

export const StyledFormAreaAccounts = styled.div`
    //background-color: ${props => props.bg || colors.light1};
    background: linear-gradient(to bottom right, white 0% right, #e6e4ff 70%);
    text-align:center;
    padding:15px 26px;
`;

export  const StyledFormButton = styled.button`
    padding:10px;
    width:150px;
    background-color:transparent;
    font-size:16px;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;
    outline:0;

    &:hover{
        background-color:${colors.theme};
        color:${colors.primary};
        cursor: pointer;
    }
`;

export  const StyledLogOutButton = styled.button`
    padding:10px;
    width:150px;
    background-color:transparent;
    font-size:16px;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.light1};
    transition: ease-in-out 0.3s;
    outline:0;

    &:hover{
        background-color:${colors.theme};
        color:${colors.primary};
        cursor: pointer;
    }
`;

//Tables
export  const StyledTable = styled.table`
    width:100%;
    border-collapse:collapse;
    text-align:center;
    border-radius:4px;
    overflow:hidden;
    
`;

export  const STHead = styled.thead`
    position:sticky;
    z-index:100;
`;

export  const STHeadTR = styled.tr`
    background-color:${colors.theme};
`;

export  const STH = styled.th`
    font-weight:normal;
    padding:3px;
    text-transform:capitalize;
    font-weight:700;
    font-size:15px;
`;

export  const STBody = styled.tbody`
    border-radius:4px;
`;

export  const STBodyTR = styled.tr`
    background-color:${colors.light1};
`;

export  const STD = styled.td`
    padding:3px;
    border:1px solid;
    border-color:#a3a1c2;
    font-size:15px;
`;



export const  ErrorMsg=styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align:left;
`;

export const ExtraText=styled.p`
    font-size: ${(props)=>props.size}px;
    text-align:center;
    color:${(props)=> (props.color? props.color : colors.dark2)};
    padding:2px;
    margin-top:10px;
`;

export const TextLink = styled(Link)`
    text-decoration:none;
    color:${colors.theme};
    transition:ease-in-out 0.3s;

    &:hover{
        text-decoration:underline;
        letter-spacing:2px;
        font-weight:bold;
    }
`;

//Icons
export const StyledIcon = styled.p`
    color: ${colors.dark1};
    position:absolute;
    font-size:21px;
    top:35px;
    ${(props)=> props.right && `right: 15px;`}
    ${(props)=> !props.right && `left: 15px;`};
`;

//copyright
export const Copyright =styled.p`
    padding:5px;
    margin:20px;
    text-align:center;
    color:${colors.light2};
`;



///////////////////////////
export const hoverEffect = `rgba(0,0,0,0.56) 0px 22px 70px 4px` ;

export const cardShadow=`rgba (0,0,0,0.1) 0px 20px 25px -5px, rgba(0,0,0,0.04) 0px 10px 10px -5px`;