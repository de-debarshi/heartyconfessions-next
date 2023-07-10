'use client'

import ConfessionTile from "../components/ConfessionTile";
import { useState, useEffect } from 'react';
import ConfessionService from '../services/ConfessionService';

export default function Showcase() {
    const [confessions, setConfessions] = useState([]);
  
    useEffect(() => {
        setConfessions(confessions => []);
        async function fetchSingleData(id) {
            const response = await ConfessionService.fetchSingleConfession(id);
            setConfessions(confessions => [...confessions, response]);
        }
        fetchSingleData('63444addcabb3ea72735e517');
        fetchSingleData('63444bd0cabb3ea72735e521');
        fetchSingleData('6344650ccabb3ea72735e538');
    }, []);
  
      return (
        <div className="confession-showcase">
          {
            confessions.map(item =>
                <div className="grid-item" key={item._id}><ConfessionTile confession={item} showCommentBox="false" redirectOnClick="true" showReactButton="false" /></div>
            )
          }
        </div>
      );
}