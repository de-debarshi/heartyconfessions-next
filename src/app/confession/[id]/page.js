'use client'

import ConfessionTile from "@/components/ConfessionTile";
import { useState, useEffect } from 'react';
import ConfessionService from '@/services/ConfessionService';

export default function Confession({params}) {
  const [confession, setConfession] = useState({});
  const [message, setMessage] = useState('Loading...');

  let id = params.id;

  useEffect(() => {
    async function fetchSingleData() {
      const response = await ConfessionService.fetchSingleConfession(id);
      setConfession(response);
      if(!confession._id) {
        setMessage('This confession is not available right now.');
      }
    }
    fetchSingleData();
  }, [id]);

    return (
      <div className="confession-page">
        {
          confession._id ? <ConfessionTile confession={confession} showCommentBox="true"/> : message
        }
        <div>
          <a href="/submit" className="button-styled submit-stories-btn">Submit Your Stories</a>
        </div>
        <div>
          <a href="/explore" className="button-styled">Explore Stories</a>
        </div>
      </div>
    );
}