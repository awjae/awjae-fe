import { useState } from 'react';
import { useRouter } from 'next/router';

const usePagination = ({currentPage, currentRange, productsLength}: {currentPage: string | string[] | undefined; currentRange: number[]; productsLength: number }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [range, setRange] = useState([1, 2, 3, 4, 5]);
  const [lastPage, setLastPage] = useState(Math.floor(productsLength / 10));
  const goPrev = () => { 
    setRange([range[0] - 5, range[0] - 4, range[0] - 3, range[0] - 2, range[0] - 1]);
    router.push(`/pagination?page=${range[0] - 1}`);
  };
  const goNext = () => { 
    const quotient = Math.floor((Number(currentPage) + 4)/5);

    const newRange = [];
    for (let i = 1; i <= 5; i++) {
      if ((5 * quotient) + i > Math.floor(productsLength/10)) {
        break;
      };
      newRange.push((5 * quotient) + i);
    }

    setRange(newRange);
    setPage((5 * quotient) + 1);
    router.push(`/pagination?page=${(5 * quotient) + 1}`);
  };

  return [page, goPrev, goNext, range, lastPage] as const;
}
export default usePagination