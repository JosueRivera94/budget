import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../context/auth-context';
//Styled components
import {StyledTextInput,StyledFormArea,StyledFormButton,StyledLabel,Avatar,StyledTitle,colors,ButtonGroup, ExtraText,TextLink,Copyright,Stylederror} from './../components/Styles'
import Logo from './../assets/logo.png'



//Icons
import {FiMail,FiLock,FiUser} from 'react-icons/fi'

//auth & redux
import { connect } from 'react-redux';
import  {signupUser} from './../auth/actions/usetActions'
import { useNavigate } from 'react-router-dom';

const Signup = ({signupUser}) =>{
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');
    const [disabledSubmit, setDisableSubmit] = useState(false);
    const NameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRed = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.entries(authCtx.currentUser).length !== 0) {
          navigate('/dashboard', { replace: true });
        }
      }, []);

      const handleRegist = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRed.current.value)

          return setError('Passwords do not match');
        try {
          setError('');
          setDisableSubmit(true);
          await authCtx.register(
            NameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value
          );
          return navigate('/dashboard', { replace: true });
        } catch (e) {
          console.log(e);
          setError('Failed to create an account');
        }
        setDisableSubmit(false);
      };


    return (
      <div>
          <StyledFormArea>
            <Avatar image={Logo}/>
            <StyledTitle size={30} color={colors.theme}>Member Signup</StyledTitle>


                <form onSubmit={handleRegist}>

                    <StyledLabel>Full Name</StyledLabel>
                    <StyledTextInput type="text" name="name" ref={NameRef}  placeholder="Name" icon={<FiUser/>}  required></StyledTextInput>

                    <StyledLabel>Email Address</StyledLabel>
                    <StyledTextInput type="text" name="email"  ref={emailRef}  placeholder="user@example.com" icon={<FiMail/>} required></StyledTextInput>

                    <StyledLabel>Password</StyledLabel>
                    <StyledTextInput type="password" name="password"  ref={passwordRef}  placeholder="********" icon={<FiLock />} required></StyledTextInput>

                    <StyledLabel>Repeat Password</StyledLabel>
                    <StyledTextInput type="password" name="repeatPassword"  ref={passwordConfirmRed}  placeholder="********" icon={<FiLock />} required></StyledTextInput>

                    {error && <Stylederror>{error}</Stylederror>}

                    <ButtonGroup>
                        <StyledFormButton  disabled={disabledSubmit}  type="submit">
                            Signup
                        </StyledFormButton>
                    </ButtonGroup>
                </form>

            <ExtraText>Already have an account? <TextLink to="/login">Login</TextLink> </ExtraText>

          </StyledFormArea>
          <Copyright>All rights reserved &copy;2022</Copyright>
      </div>
    )
}

export default  connect(null,{signupUser}) (Signup);