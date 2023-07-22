'use client'

// import { useState, useEffect } from 'react';
import ConfessionTile from "./ConfessionTile";

export default function ConfessionList(props) {
    return (
      <div className="confession-list">
        {
          props.confessionArray.map(item =>
            <div className="grid-item" key={item._id}><ConfessionTile confession={item} showCommentBox="false" redirectOnClick="true" showReactButton="false" showShareButton="false" /></div>
          )
        }
      </div>
    );
}