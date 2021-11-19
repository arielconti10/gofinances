import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native'

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
  LogoutButton,
} from "./styles";

import { HightlightCard } from "../../components/HightlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";


export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  
  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const data = await AsyncStorage.getItem(dataKey);
    const transactions = data ? JSON.parse(data) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });


        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date: dateFormatted,
          type: item.type,
          category: item.category,
        }
      })

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]))

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
