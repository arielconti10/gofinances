import React from "react";

import {
  Container,
  Header,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighLightCards,
} from "./styles";

import Logo from "../../assets/images/skteworld.png";
import { RFValue } from "react-native-responsive-fontsize";
import { HightlightCard } from "../../components/HightlightCard";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Avatar
              source={{
                uri: "https://avatars.githubusercontent.com/u/17475188?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Ariel</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HightlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada 13 de abril"
          type="up"
        />
        <HightlightCard
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída 03 de abril"
          type="down"
        />
        <HightlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighLightCards>
    </Container>
  );
}
