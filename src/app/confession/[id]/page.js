'use client'

import ConfessionTile from "@/components/ConfessionTile";
import { useState, useEffect } from 'react';
import ConfessionService from '@/services/ConfessionService';

export default function Confession({params}) {
  const [confession, setConfession] = useState({});

  let id = params.id;

  useEffect(() => {
    async function fetchSingleData() {
      const response = await ConfessionService.fetchSingleConfession(id);
      setConfession(response);
    }
    fetchSingleData();
  }, [id]);

    return (
      <div className="confession-page">
        {
          confession._id ? <ConfessionTile confession={confession} showCommentBox="true"/> : 'This confession is not available right now.'
        }
      </div>
    );
}