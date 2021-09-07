import React from "react";
import { Image } from "react-native";

import { Container, Title, LogoContainer } from "./styles";

import Logo from "../../assets/images/skteworld.png";

export function Dashboard() {
  return (
    <Container>
      <Title>Dashboard</Title>

      <LogoContainer source={Logo} resizeMode="cover" />
    </Container>
  );
}
