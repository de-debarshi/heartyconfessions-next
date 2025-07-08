'use client';

import { useState, useEffect } from 'react';
import ConfessionService from '@/services/ConfessionService';
import ConfessionList from '@/components/ConfessionList.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from '@/components/SkeletonCard';

export default function Explore() {
  const [confessionList, setConfessionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = async (pageNumber) => {
    const response = await ConfessionService.fetchConfessions(pageNumber, 'Any');
    setConfessionList((prevList) => {
      const ids = new Set(prevList.map((item) => item._id));
      const newItems = response.confessionList.filter((item) => !ids.has(item._id));
      return [...prevList, ...newItems];
    });
    if (currentPage === 1) {
      setTotalPage(response.totalPage);
    }
  };

  const paginate = () => {
    let nextPage = currentPage + 1;

    if (nextPage <= totalPage) {
      // fetchData(nextPage);
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="explore-page">
      <div className="introduction-text">
        <p>Scroll down to explore some interesting stories!</p>
      </div>
      <InfiniteScroll
        dataLength={confessionList.length} //This is important field to render the next data
        next={paginate}
        hasMore={currentPage !== totalPage}
        loader={
          <div className="confession-list">
            {[...Array(4)].map((_, i) => (
              <div className="grid-item" key={i}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        }
      >
        {confessionList ? <ConfessionList confessionArray={confessionList} /> : ''}
      </InfiniteScroll>
    </div>
  );
}
