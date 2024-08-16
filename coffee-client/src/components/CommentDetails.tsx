import React, { useEffect, useState } from 'react';
import './CommentDetails.css';
import { User } from '../userContext';
import { uploadImage } from '../services/authFetchApi';
import { useParams } from 'react-router-dom';
import { PostData } from '../models/post';
import { CommentData } from '../models/comment';
import { getPostWithComment } from '../services/coffeeApi';
import PostDetails from './PostDetails';
import StarRating from './StarRating';
import ChildComment from './ChildComment';

const CommentDetails: React.FC = () => {
  const { postId, commentId } = useParams<{ postId: string; commentId: string }>();

  const [post, setPost] = useState<PostData>();
  const [comment, setComment] = useState<CommentData>();
  useEffect(() => {
    if (postId && commentId) {
      getPostWithComment(postId, commentId).then(post => {
        setPost(post);
        setComment(post.comments[0]);
      })
    }
  }, [commentId, postId])

  return (<div className='comment-details'>
    {post && comment && <div>
      <PostDetails
        key={post._id}
        id={post._id}
        name={post.name}
        description={post.description}
        price={post.price}
        region={post.region}
        weight={post.weight}
        flavorProfile={post.flavor_profile}
        grindOption={post.grind_option}
        roastLevel={post.roast_level}
        imageUrl={post.image_url} />
      <div className="comment-content">
        <div className="comment-header">
          <img src={comment.avatarUrl} alt="Author Avatar" className="avatar" />
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{comment.time}</span>
          <StarRating rating={comment.rating} readOnly={true} />
        </div>
        <p>{comment.content}</p>
        {comment.photoUrl && <img src={comment.photoUrl} alt="Comment" className="comment-photo" />}
      </div>
      <div className="child-comments">
        {comment.childComments.map((childComment) =>
          <ChildComment
            content={childComment.commentTime}
            commentTime={childComment.commentTime}
            author={childComment.author}
            avatarUrl={childComment.avatarUrl}
            canEdit={false}
            onEdit={function (newText: string): void {
              throw new Error('Function not implemented.');
            }}
            onDelete={function (): void {
              throw new Error('Function not implemented.');
            }} />)}
      </div>
    </div>}</div>)
};

export default CommentDetails;
