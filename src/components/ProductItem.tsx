import styled from 'styled-components';
import { useRouter } from 'next/router'


import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
  isInfinite?: boolean;
};

const ProductItem = ({ product: { name, thumbnail, price, id }, isInfinite }: ProductItemProps) => {
  const router = useRouter();
  const goDetail = (id: string) => {
    if (isInfinite) {
      window.sessionStorage.setItem("target", id);
    }
    router.push(`/products/${id}`);
  }

  return (
    <Container onClick={ () => goDetail(id) }>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} loading="lazy" data-id={id}/>
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
