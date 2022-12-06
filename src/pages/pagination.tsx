import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styled from 'styled-components';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import CommonHeader from '../components/common/Header';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <CommonHeader></CommonHeader>
      <Container>
        { Number(page) > Math.floor(products.length / 10) ?
          <div className='error'>
            존재하지 않는 페이지입니다.
          </div>
          :
          <>
            <ProductList products={products.slice(10*(Number(page)) - 1, 10*(Number(page)) + 9)} />
            <Pagination queryIdx={ page } productsLength={ products.length }/>
          </>
        }
        
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
  .error {
    height: 300px;
    display: flex;
    align-items: center;
  }
`;
