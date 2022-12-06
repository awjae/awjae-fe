import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import useStore from '../utilities/store';
import CommonHeader from '../components/common/Header';

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
    idMessage: '',
    passwordMessage: '',
    isDisabled: true
  });
  const { setUser } = useStore(state => state);

  const { id, password, idMessage, passwordMessage, isDisabled } = inputs;

  const validationValues = (type: string, value: string) => {
    if (type === 'id' && !/^[a-zA-Z0-9]{5,30}$/.test(id)) {
      return setInputs({
        ...inputs, 
        idMessage: '올바른 아이디 형식으로 입력해주세요.',
        isDisabled: true
      });
    } 
  
    if (type === 'password' && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9]{8,30}$/.test(value)) {
      return setInputs({
        ...inputs, 
        passwordMessage: '올바른 비밀번호 형식으로 입력해주세요.',
        isDisabled: true
      });
    }

    if (id.length > 0 && password.length > 0 && !idMessage && !passwordMessage) {
      return setInputs({
        ...inputs, 
        isDisabled: false, 
      });
    }

    type === 'id' ? setInputs({...inputs, idMessage: ''}) : setInputs({...inputs, passwordMessage: ''});
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target; 
    setInputs({
      ...inputs, 
      [name]: value 
    });
  };
  useEffect(() => {
    if (id.length > 0 && password.length > 0 && !idMessage && !passwordMessage) {
      setInputs({
        ...inputs, 
        isDisabled: false, 
      });
    }
  }, [idMessage, passwordMessage])

  const goLogin = () => {
    fetch('/login', {
      method: 'POST'
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setUser({ accessToken: data.data.accessToken, user: data.data.user });
      router.push('/');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
      <CommonHeader></CommonHeader>
      <Form>
        <div>아이디</div>
        <TextInput type='text' name='id' value={ id } onChange={ onChange } onBlur={ (e: React.ChangeEvent<HTMLInputElement>) => validationValues('id', e.target.value) }/>
        <div className='valiationText'>{ idMessage }</div>
        <div>비밀번호</div>
        <TextInput type='password' name='password' value={ password } onChange={ onChange } onBlur={ (e: React.ChangeEvent<HTMLInputElement>) => validationValues('password', e.target.value) }/>
        <div className='valiationText'>{ passwordMessage }</div>
        <LoginButton disabled={isDisabled} onClick={ goLogin }>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  & > div {
    font-weight: 700;
    font-size: 13px;
    color: #6C6C7D;
  }
  & > div.valiationText {
    height: 13px;
    margin-top: 8px;
    color: #ED4E5C;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  
`;

const TextInput = styled.input`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  background: #F7F7FA;
  border-radius: 12px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #e2e2ea;
  }
`;
