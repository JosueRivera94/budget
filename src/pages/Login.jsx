import { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import { useHistory, useNavigate } from 'react-router-dom';

//Styled components
import {StyledTextInput,StyledFormArea,StyledFormButton,StyledLabel,Avatar,StyledTitle,colors,ButtonGroup, ExtraText,TextLink,Copyright,Stylederror} from './../components/Styles'
import Logo from './../assets/logo.png'

//Formik
import { Formik,Form } from 'formik';
import { TextInput } from '../components/FormLib';
import *  as Yup from 'yup'

//Icons
import {FiMail,FiLock} from 'react-icons/fi'

//auth & redux  ---- sin usartodavia
import { connect } from 'react-redux';
import  {loginUser} from './../auth/actions/usetActions'


const Login = ({loginUser}) =>{
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');
    const [disabledSubmit, setDisableSubmit] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.entries(authCtx.currentUser).length !== 0) {
          navigate('/dashboard', { replace: true });
        }
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setError('');
          setDisableSubmit(true);
          await authCtx.login(emailRef.current.value, passwordRef.current.value);
          return navigate('/dashboard', { replace: true });
        } catch (e) {
          console.log(e);
          setError('Failed to log in');
        }
        setDisableSubmit(false);
      };


    return (
      <div>
        <StyledFormArea>
          <Avatar image={Logo} />
          <StyledTitle size={30} color={colors.theme}>
            User Login
          </StyledTitle>

          <form onSubmit={handleSubmit}>
            <StyledLabel>Email Address</StyledLabel>
            <StyledTextInput type="text"  name="email" ref={emailRef}  placeholder="user@example.com" icon={<FiMail />} required></StyledTextInput>

            <StyledLabel>Password</StyledLabel>
            <StyledTextInput type="password"  name="password" ref={passwordRef}  placeholder="********" icon={<FiLock />} required></StyledTextInput>

            {error && <Stylederror>{error}</Stylederror>}

          
                <ButtonGroup>
                  <StyledFormButton disabled={disabledSubmit} type="submit">
                    Login
                  </StyledFormButton>
                  {/*<Styledbutton to="/dashboard">Login</Styledbutton>  */}
                </ButtonGroup>
              </form>

          <ExtraText>
            New here? <TextLink to="/signup">Signup</TextLink>{" "}
          </ExtraText>
        </StyledFormArea>
        <Copyright>All rights reserved &copy;2022</Copyright>
      </div>
    );
}

export default Login;