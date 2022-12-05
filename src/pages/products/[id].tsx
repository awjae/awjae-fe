import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CommonHeader from '../../components/common/Header';
import products from '../../api/data/products.json';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = products[0];

  return (
    <>
      <CommonHeader></CommonHeader>
      { Number(id) <= products.length && (
        <>
          <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product.name}</Name>
            <Price>{product.price}원</Price>
          </ProductInfoWrapper>
        </>
      )}
      { Number(id) > products.length && (
        <Error>
          존재하지 않는 페이지입니다.
        </Error>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const Error = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;