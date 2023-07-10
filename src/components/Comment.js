'use client'

// import { formatRelative, parseISO } from 'date-fns';

export default function Comment(props) {
    return (
        <div className="confession-tile__comment">
            {/* <div className="confession-tile__comment-details">{props.comment.username} commented on {(formatRelative(parseISO(props.comment.createdAt), new Date()))}</div> */}
            <div className="confession-tile__comment-content">{props.comment.comment}</div>
        </div>
    );
}