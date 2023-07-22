'use client'

import { useState } from 'react';
import { Heart, ShareFat } from "@phosphor-icons/react";
import { RWebShare } from "react-web-share";
import ConfessionService from '../services/ConfessionService';
import Comment from './Comment';

export default function ConfessionTile(props) {
    const propComments = props.confession.comments ? props.confession.comments : [];
    const [inputs, setInputs] = useState({});
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([...propComments]);
    const [formError, setFormError] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
      setFormError(false);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      if(inputs.newcomment) {
        const newComment = {
          _id: props.confession._id,
          username: 'Guest',
          comment: inputs.newcomment
        }
        let response = await ConfessionService.addComment(newComment);
        setComments(comments => [...response.comments]);
        props.confession.commentCount = response.commentCount;
        setInputs(values => ({...values, newcomment: ''}));
      } else {
        setFormError(true);
      }
    }

    const tileClicked = () => {
      if(props.redirectOnClick === 'true' ) {
        window.location.href = `/confession/${props.confession._id}`;
      }
    }

    const handleLike = async () => {
      console.log(like);
      if(!like) {
        let response = await ConfessionService.addLike(props.confession._id);
        props.confession.reactionCount = response.reactionCount;
        setLike(true);
      }
    }

    return (
      <div className="confession-tile tile-shadow" onClick={tileClicked}>
        <div className="confession-tile__age-gender">
            <div>Age: {props.confession.age}</div>
            <div>Gender: {props.confession.sex}</div>
        </div>
        <div className="confession-tile__content">
            {props.confession.content}
        </div>
        <div className="confession-tile__reaction">
            <div className="confession-tile__reaction-content">
                {props.showReactButton !== 'false' && (<span className="confession-tile__like-icon" onClick={handleLike}>
                  <Heart color="#F76F72" weight={like ? 'fill' : 'regular'} size={24} />
                </span>)}
                <span>
                {props.confession.reactionCount} likes
                </span>
            </div>
            <div className="confession-tile__reaction-content">
              <span>{props.confession.commentCount} comments</span>
              {props.showShareButton !== 'false' && (<span className="confession-tile__share-icon">
                <RWebShare
                    data={{
                        text: props.confession.content.slice(0, 100) + "... Read more at ",
                        url: "https://www.heartyconfessions.com/confession/"+props.confession._id,
                        title: "Hearty Confessions",
                    }}
                >
                    <ShareFat color="#F76F72" size={24} />
                </RWebShare>
              </span>)}
            </div>
            
        </div>
        {
          props.showCommentBox==='true' && (<div className="confession-tile__comment-section">
            <form onSubmit={handleSubmit} className="confession-tile__comment-form">
              <textarea rows="5" placeholder="Type your comment here..." className="confession-tile__new-comment-textarea" name="newcomment" value={inputs.newcomment} onChange={handleChange} />
              {
                formError===true && (<div className="error-message">Please enter a comment above</div>)
              }
              <button type="submit" className="button-styled confession-tile__comment-submit-btn">Add Comment</button>
            </form>
            {
              comments.length > 0 && (<div className='confession-tile__comment-section-heading'>User Comments:</div>)
            }
            {
              comments &&
                comments.map((item, index) =>
                <Comment key={item._id} comment={item} commentIndex={index}/>
              )
            }
          </div>)
        }
        {/* <div v-if="enableShare">
            <button className="btn btn-primary" type="button" @click="shareConfession">Share</button>
        </div> */}
        {/* <div id="share-confession-modal" className="modal" v-if="showShareModal">
            <!-- Modal content -->
            <div className="modal-content">
                <div className="modal-header">
                <span className="close" @click="showShareModal = false">&times;</span>
                <h2></h2>
                </div>
                <div className="modal-body">
                    <!-- The text field -->
                    <input type="text" :value="shareableContent + shareableLink" id="dataToCopy">

                    <!-- The button used to copy the text -->
                    <button className="btn btn-primary" type="button" @click="copyToClipboard">Copy text</button>
                    <!-- {shareableContent} 
                    <a :href="shareableLink">Link</a> -->
                </div>
                <div className="modal-footer">
                <h3></h3>
                </div>
            </div>
        </div> */}
    </div>
    );
}