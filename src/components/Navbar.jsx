import React from 'react'
import styled from 'styled-components'
import {FiSearch} from 'react-icons/fi'
import {colors} from '../components/Styles'
import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';

function Navbar() {
  const authCtx = useContext(AuthContext);

  return (
    <NavbarContainer>
      <Text>
        <span>{`${authCtx.currentUser.nombre}`}, </span>
        Budget App
      </Text>
      <InputContainer>
        
      </InputContainer>
    </NavbarContainer>
  )
}


const NavbarContainer=styled.nav`
  display:flex;
  justify-content:space-between;
  align-items: center;
  height: 10%;

  @media screen and (min-width: 320px) and (max-width: 1080px){
      flex-direction:column;
      margin-bottom: 1rem;
    }
`;

const Text=styled.h1`
  span{
    font-weight: 500;
    color: ${colors.dark2};
  }

  @media screen and (min-width: 320px) and (max-width: 1080px){
      margin-top: 1rem;
    }
`;

const InputContainer=styled.div`
  display:flex;
`;

const Icon=styled.div`
  height: 3rem;
  width: 3rem;
  background-color: ${colors.dark3};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  svg{
    color: white;
  }
`;

const Input=styled.input`
  border: none;
  background-color: ${colors.dark3};
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  &:focus{
    border:none;
    outline: none;
  }
`;



export default Navbar