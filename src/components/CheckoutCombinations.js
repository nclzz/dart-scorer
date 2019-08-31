import React from "react";
import styled from "styled-components";

const CombinationList = styled.ul`
  font-size: 3rem;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  text-transform: uppercase;
  & > li {
    margin-right: 2rem;
  }
  & > li ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

function CheckoutCombinations({ checkoutCombinations }) {
  return (
    <CombinationList>
      {checkoutCombinations.combinations.map((items, index) => (
        <li key={index}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </CombinationList>
  );
}

export default CheckoutCombinations;
