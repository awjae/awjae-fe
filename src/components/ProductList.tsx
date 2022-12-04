import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types/product';
import ProductItem from './ProductItem';
type ProductListProps = {
  products: Product[];
  isInfinite: boolean;
};

const ProductList = ({ products, isInfinite }: ProductListProps) => {
  const pagingProduct = useRef<any>();
  const [infinitePage, setInfinitePage] = useState(1);

  useEffect(() => {
    if (isInfinite) {
      const onIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && infinitePage <= Math.floor(products.length/16)) {
            setInfinitePage(infinitePage + 1);
          }
        });
      };
  
      const observer = new IntersectionObserver(onIntersect, {threshold: 0.3});
      observer.observe(pagingProduct.current);
      return () => {
        observer.disconnect();
      }
    }
  }, [infinitePage])

  useEffect(() => {
    if (window.sessionStorage.getItem("target")) {
      const targetPage = Math.floor(Number(window.sessionStorage.getItem("target"))/16) + 1;
      setInfinitePage(targetPage);
      setTimeout(() => {
        window.scrollTo(0, document.querySelector(`img[data-id="${window.sessionStorage.getItem("target")}"]`)?.offsetTop);
      }, 300)
    }
  }, [])
  

  return (
    <Container>
      {!isInfinite && products.map((product) => (
        <ProductItem key={product.id} product={product}/>
      ))}
      {isInfinite && products.filter((product, idx) => idx < infinitePage * 16).map((product, idx) => {
        if (idx + 1 === infinitePage * 16 || idx + 1 === products.length) {
          return <span key={product.id} ref={ pagingProduct }><ProductItem product={product} isInfinite={isInfinite}/></span>
        }
        return <ProductItem key={product.id} product={product} isInfinite={isInfinite}/>
      })}
    </Container>
  )
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
  & > span {
    display: inherit;
  }
`;

const ObserverWrapper = styled.span`
  display: inherit;
`;