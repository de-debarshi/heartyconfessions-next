'use client'

import ConfessionTile from "../components/ConfessionTile";
import { useState, useEffect } from 'react';
import ConfessionService from '../services/ConfessionService';
import SkeletonCard from './SkeletonCard';

export default function Showcase() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPopularConfessions() {
      try {
        setLoading(true);
        const response = await ConfessionService.fetchPopular();
        setConfessions(response);
      } catch (err) {
        setError('Failed to load confessions.');
      } finally {
        setLoading(false);
      }
    }
    fetchPopularConfessions();
  }, []);

  if (loading) {
    return (
      <div className="confession-showcase">
        {[...Array(3)].map((_, i) => (
          <div className="grid-item" key={i}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="confession-showcase">
      {confessions.length === 0 ? (
        <div>No popular confessions found.</div>
      ) : (
        confessions.map(item =>
                <div className="grid-item" key={item._id}><ConfessionTile confession={item} showCommentBox="false" redirectOnClick="true" showReactButton="false" showShareButton="false"/></div>
        )
      )}
    </div>
  );
}