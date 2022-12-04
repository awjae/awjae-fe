import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useStore from '../utilities/store';
import { UserInfo } from '../types/userInfo';

const HomePage: NextPage = () => {
  const { accessToken, user, removeUser, setUser }: UserInfo = useStore(state => state);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setUser({
        accessToken: window.localStorage.getItem("accessToken"),
        user: {
          ID: window.localStorage.getItem("user_ID"),
          NAME: window.localStorage.getItem("user_NAME"),
        }
      })
    }
  }, [])

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        { accessToken ? 
            <LogoutButton onClick={() => removeUser() }>
              <p>{ user.ID }</p>
              <p>logout</p>
            </LogoutButton>
          :
            <Link href='/login'>
              <p>login</p>
            </Link>
        }
      </Header>
      <Container>
        <Link href='/pagination?page=1'>
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;

const LogoutButton = styled.button`
  outline: none;
  border: none;
  text-align: right;
`;
