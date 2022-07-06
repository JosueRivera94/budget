import React from 'react'
import styled from 'styled-components'
import Badge from '../dashboard/Badge'
import {cardShadow,colors,hoverEffect} from '../Styles'

function Info() {
  return (
    <InfoCard>
        <Card>
            <CardContent>
                <Row>
                    <Digit>98</Digit>
                    <InfoContainer>
                        <Title>Rank</Title>
                        <SubTitle>In top 5</SubTitle>
                    </InfoContainer>
                </Row>
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                <Row>
                    <Digit>97</Digit>
                    <InfoContainer>
                        <Title>Incomes</Title>
                        <SubTitle>10 this month</SubTitle>
                    </InfoContainer>
                </Row>
                <Row justify>
                    <Badge content="Mobile app" glow />
                    <Badge content="Branding" glow />
                </Row>
            </CardContent>
        </Card>

    </InfoCard>
  )
}


const InfoCard=styled.div`
    height: 100%;
    width: 18rem;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    color: white;
    box-shadow: ${cardShadow};
    transition: 0.4s ease-in-out;
    &:hover{
        box-shadow: ${hoverEffect};
    }

    @media screen and (min-width: 320px) and (max-width: 1080px){
      width: 80%;
    }
`;

const Card=styled.div`
    background-color: rgba(183,194,243,0.3);
    border-radius: 1rem;
    margin-bottom: 1rem;
`;

const CardContent=styled.div`
    padding: 0.7rem 1rem 0.3rem 1rem;
`;

const Row=styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 0.4rem;
    ${({justify})=> justify && `
        justify-content:space-between;
        width:90%;
    `}
`;

const Digit=styled.div`
    background-color: ${colors.theme};
    padding: 0.8rem 1rem;
    font-size: 1.3rem;
    border-radius: 1rem;
`;

const InfoContainer=styled.div`
    margin-left: 0.7rem;
`;

const Title=styled.h3`
    color: black;
`;

const SubTitle=styled.h5`
    color: #333333;
    font-weight: normal;
`;


export default Info