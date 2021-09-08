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
  Transactions,
  Title,
  TransactionList,
} from "./styles";

import Logo from "../../assets/images/skteworld.png";
import { RFValue } from "react-native-responsive-fontsize";
import { HightlightCard } from "../../components/HightlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$ 12.400,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburguer Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "01/04/2020",
    },
  ];
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

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
