'use client';

import ConfessionTile from '@/components/ConfessionTile';
import { useState, useEffect, use } from 'react';
import ConfessionService from '@/services/ConfessionService';
import Link from 'next/link';

export default function Confession({ params }) {
  const { id } = use(params);
  const [confession, setConfession] = useState({});
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    async function fetchSingleData() {
      const response = await ConfessionService.fetchSingleConfession(id);
      setConfession(response);
      if (!confession._id) {
        setMessage('This confession is not available right now.');
      }
    }
    fetchSingleData();
  }, [id]);

  return (
    <div className="confession-page">
      {confession._id ? <ConfessionTile confession={confession} showCommentBox="true" /> : message}
      <div>
        <Link href="/submit" className="button-styled submit-stories-btn">
          Submit Your Stories
        </Link>
      </div>
      <div>
        <Link href="/explore" className="button-styled">
          Explore Stories
        </Link>
      </div>
    </div>
  );
}
