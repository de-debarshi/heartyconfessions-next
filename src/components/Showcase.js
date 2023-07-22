'use client'

import ConfessionTile from "../components/ConfessionTile";
import { useState, useEffect } from 'react';
import ConfessionService from '../services/ConfessionService';

export default function Showcase() {
    const [confessions, setConfessions] = useState([]);
  
    useEffect(() => {
        setConfessions(confessions => []);
        async function fetchPopularConfessions() {
            const response = await ConfessionService.fetchPopular();
            setConfessions(confessions => [...response]);
        }
        fetchPopularConfessions();
    }, []);
  
      return (
        <div className="confession-showcase">
          {
            confessions.map(item =>
                <div className="grid-item" key={item._id}><ConfessionTile confession={item} showCommentBox="false" redirectOnClick="true" showReactButton="false" showShareButton="false"/></div>
            )
          }
        </div>
      );
}