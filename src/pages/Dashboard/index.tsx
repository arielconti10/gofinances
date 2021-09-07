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
} from "./styles";

import Logo from "../../assets/images/skteworld.png";
import { RFValue } from "react-native-responsive-fontsize";

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
    </Container>
  );
}
