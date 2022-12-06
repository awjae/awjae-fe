import Link from 'next/link';
import styled from 'styled-components';
import useStore from '../../utilities/store';
import { UserInfo } from '../../types/userInfo';
import React, { useEffect } from 'react';

const Header = () => {

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
    <HeaderContainer>
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
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const LogoutButton = styled.button`
  outline: none;
  border: none;
  text-align: right;
`;