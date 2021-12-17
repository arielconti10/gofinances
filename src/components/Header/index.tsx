import React from 'react';
import { View } from 'react-native';

import { Container, Header as HeaderStyle, Title } from './styles';

interface Props {
  title: string
}

const Header = ({title}: Props) => {
  return (
    <Container>
      <HeaderStyle>
        <Title>{title}</Title>
      </HeaderStyle>
    </Container>
  )
}

export default Header;