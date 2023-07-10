'use client'

import { useState, useEffect } from 'react';
import ConfessionService from '@/services/ConfessionService';
import ConfessionList from '@/components/ConfessionList.js';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Explore() {
  const [confessionList, setConfessionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = async (pageNumber) => {
    const response = await ConfessionService.fetchConfessions(pageNumber, 'Any');
    setConfessionList(confessionList => [...confessionList, ...response.confessionList]);
    if(currentPage === 1) {
      setTotalPage(response.totalPage);
    }
  }

  const paginate = () => {
    let nextPage = currentPage+1;

    if(nextPage <= totalPage) {
      // fetchData(nextPage);
      setCurrentPage(nextPage);
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

    return (
      <div className="explore-page" >
        <div className="introduction-text">
          <p>Scroll down to explore some interesting stories!</p>
        </div>
        <InfiniteScroll
          dataLength={confessionList.length} //This is important field to render the next data
          next={paginate}
          hasMore={currentPage !== totalPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {confessionList ? <ConfessionList confessionArray={confessionList} /> : ''}
        </InfiniteScroll>
      </div>
    );
}