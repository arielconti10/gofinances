import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
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
  LoadContainer,
} from "./styles";

import { HightlightCard } from "../../components/HightlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import { useTheme } from "styled-components";


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps{
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const theme = useTheme();
  
  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
      .filter(transaction => transaction.type === 'positive')
      .map(transaction => new Date(transaction.date).getTime()))
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('default', { month: 'long' })} de ${lastTransaction.getFullYear()}`;
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const data = await AsyncStorage.getItem(dataKey);
    const transactions = data ? JSON.parse(data) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {

        if(item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

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
    
    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionExpensives}`

    const total = entriesTotal - expensiveTotal;  

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensives:{
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima saída dia ${lastTransactionExpensives}`,

      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval
      }
    })
      
    setTimeout(() => {
      setIsloading(false);
    }, 2000)
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]))

  return (
    <Container>
      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer> : (
        <>
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
              amount={highlightData.entries ? highlightData.entries.amount : '0,00'}
              lastTransaction={highlightData.entries ? highlightData.entries.lastTransaction : ''}
              type="up"
            />
            <HightlightCard
              title="Saidas"
              amount={highlightData.expensives ? highlightData.expensives.amount : '0,00'}
              lastTransaction={highlightData.entries ? highlightData.expensives.lastTransaction : ''}
              type="down"
            />
            <HightlightCard
              title="Total"
              amount={highlightData.total ? highlightData.total.amount : '0,00'}
              lastTransaction={highlightData.total ? highlightData.total.lastTransaction : ''}
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
        </>
        )
      }
    </Container>
  );
}
