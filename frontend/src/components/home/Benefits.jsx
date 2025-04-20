import React from 'react';
import styled from 'styled-components';
import { FaHandHolding, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';

const Benefits = () => {
  return (
    <BenefitsContainer>
      <BenefitsGrid>
        <BenefitItem>
          <BenefitIcon>
            <FaHandHolding />
          </BenefitIcon>
          <BenefitTitle>Apoyando la artesanía</BenefitTitle>
          <BenefitText>100% productos artesanos</BenefitText>
        </BenefitItem>
        
        <BenefitItem>
          <BenefitIcon>
            <FaShieldAlt />
          </BenefitIcon>
          <BenefitTitle>Compra segura</BenefitTitle>
          <BenefitText>100% segura</BenefitText>
        </BenefitItem>
        
        <BenefitItem>
          <BenefitIcon>
            <FaWhatsapp />
          </BenefitIcon>
          <BenefitTitle>Atención al cliente</BenefitTitle>
          <BenefitText>WhatsApp, email</BenefitText>
        </BenefitItem>
      </BenefitsGrid>
    </BenefitsContainer>
  );
};

const BenefitsContainer = styled.section`
  background-color: #ffffff;
  padding: 5rem 4%; /* Increased padding */
  width: 100%;
  max-width: 1800px; /* Increased max-width */
  margin: 0 auto 50px; /* Added bottom margin */
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Slightly larger cards */
  gap: 3rem; /* Increased gap */
  max-width: 1600px; /* Increased inner max-width */
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 300px;
  width: 100%;
`;

const BenefitIcon = styled.div`
  font-size: 32px;
  color: #4d2c18;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  color: #6F4E37;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const BenefitText = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

export default Benefits;
