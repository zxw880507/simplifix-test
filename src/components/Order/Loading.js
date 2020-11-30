import React from "react";
import randomColor from "randomcolor";
import styled, { keyframes } from "styled-components";
const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  margin: 10em;
`;

const Char = styled.h1`
font-size: 10em,
margin: 0 5px;
color: ${(props) => props.color};
/* Animation */
animation: ${BounceAnimation} 5s linear infinite;
animation-delay: ${(props) => props.delay};
`;

export default function Loading(props) {
  const {gig, contractor} = props;
  const str = `Booking a ${gig.title} Service With ${contractor.first_name} ${contractor.last_name}`;
  const arr = str.split("").map(char => ({char: char, color: randomColor({
    luminosity: 'bright',
    hue: "monochrome",
    format: 'rgba',
    alpha: 0.7
 })}));
 
  return <Wrapper>
    {arr.map((char, index) => <Char delay={`${index/2}s`} color={char.color}>{char.char}</Char>)}
  </Wrapper>;
}
