import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import usePagination from '../hooks/usePagination';

const Pagination = ({ queryIdx, productsLength }: { queryIdx: string | string[] | undefined; productsLength: number}) => {
  const router = useRouter();
  const [page, goPrev, goNext, range, lastPage] = usePagination({currentPage: queryIdx, currentRange: [1, 2, 3, 4, 5], productsLength: productsLength});

  const goPage = (page: number) => {
    router.push(`/pagination?page=${page}`);
  }
  const canPrev = range.indexOf(1) > -1 ? true : false;
  const canNext = range.indexOf(lastPage) > -1 ? true : false;
  
  return (
    <Container>
      <Button disabled={canPrev} onClick={() => goPrev()}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {(range as number[]).map((page: number) => (
          <Page key={page} selected={page === Number(queryIdx)} disabled={page === Number(queryIdx)} onClick={ () => goPage(page) }>
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={canNext} onClick={() => goNext()}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
