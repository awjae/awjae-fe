import type { NextPage } from 'next';
import styled from 'styled-components';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import CommonHeader from '../components/common/Header';

const InfiniteScrollPage: NextPage = () => {
  return (
    <>
      <CommonHeader></CommonHeader>
      <Container>
        <ProductList products={products} isInfinite={true}/>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
