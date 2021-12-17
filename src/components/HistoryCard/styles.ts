import styled from 'styled-components/native';

interface ContainerProps  { 
  color: string
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  
  border-color: ${props => props.color};
  border-left-width: 5px;
`;

export const Title = styled.Text``
export const Amount = styled.Text``