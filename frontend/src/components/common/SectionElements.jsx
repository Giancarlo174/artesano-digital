import styled from 'styled-components';

export const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem 1rem;
  background-color: ${props => props.$bgColor || 'transparent'};
  border-radius: ${props => props.$bgColor ? '8px' : '0'};
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #6F4E37;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
`;

export const TitleUnderline = styled.div`
  height: 3px;
  background-color: #ECB176;
  width: 60px;
  margin: 0.5rem auto 0;
`;
