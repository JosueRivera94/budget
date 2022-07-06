import React from 'react'
import styled from 'styled-components'
import Badge from './Badge'
import {cardShadow,colors,hoverEffect} from '../Styles'
import AvatarImage from './../../assets/avatar4.png'

function Categories() {
  return (
    <RecomendedProject>
        <CardContent>
            <Detail>
                <InfoContainer>
                    <Avatar>
                        <img src={AvatarImage}/>
                    </Avatar>
                    <Info>
                        <InfoName>Josue Rivera</InfoName>
                        <InfoUpdate>Updated 10m ago</InfoUpdate>
                    </Info>
                </InfoContainer>
                <Badge content="Design" />
            </Detail>
            <Title>
                Lorem ipsum Lorem ipsum Lorem ipsum
            </Title>
            <ProjectInfo>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </ProjectInfo>
            <PriceContainer>
                <Price>$8,700/moth</Price>
                <Badge content="Full time" clean/>
            </PriceContainer>
        </CardContent>
    </RecomendedProject>
  )
}



const RecomendedProject= styled.div`
    border-radius: 1rem;
    height: 145%;
    padding: 1rem;
    background-color: white;
    width: 100%;
    box-shadow: ${cardShadow};
    transition: 0.4s ease-in-out;
    &:hover{
        box-shadow: ${hoverEffect};
    }
`;
const CardContent= styled.div`
    margin: 0.4rem;
`;
const Detail= styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const InfoContainer= styled.div`
    display: flex;
    align-items: center;
`;
const Avatar= styled.div`
    margin-right: 1rem;
    img{
        height: 5rem;
        border-radius: 5rem;
    }
`;
const Info= styled.div`
`;
const InfoName= styled.h3`
    font-weight: 500;
`;
const InfoUpdate= styled.h5`
    font-weight: 300;
`;
const Title= styled.h4`
    font-weight: 500;
`;
const ProjectInfo= styled.p`
    margin:0;
    padding:0;
    font-size: 0.9rem;
    color: #3b3b3b;
    margin-bottom: 0.5rem;
`;
const PriceContainer= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color:  rgba(146,166,255,0.3);
`;
const Price= styled.div`
`;





export default Categories