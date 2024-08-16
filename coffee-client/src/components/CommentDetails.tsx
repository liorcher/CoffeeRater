import React, { useEffect, useState, useCallback } from 'react';
import './CommentDetails.css';
import { useUser } from '../userContext';
import { useParams } from 'react-router-dom';
import { PostData } from '../models/post';
import { CommentData } from '../models/comment';
import { getPostWithComment } from '../services/coffeeApi';
import PostDetails from './PostDetails';
import StarRating from './StarRating';
import ChildComment from './ChildComment';
import ChildCommentForm from './ChildCommentForm';
import { createChildComment, updateChildComment, deleteChildComment } from '../services/childCommentsFetchApi';
import { CreateChildComment, UpdateChildComment } from '../models/childComment';

const CommentDetails: React.FC = () => {
  const { postId, commentId } = useParams<{ postId: string; commentId: string }>();
  const { user } = useUser()

  const [post, setPost] = useState<PostData>();
  const [comment, setComment] = useState<CommentData>();

  const refreshPost = useCallback(() => {
    if (postId && commentId) {
      getPostWithComment(postId, commentId).then(post => {
        setPost(post);
        setComment(post.comments[0]);
      })
    }
  }, [postId, commentId])

  useEffect(() => {
    refreshPost()
  }, [commentId, postId, refreshPost])

  const handleAddChildComment = async (content: string) => {
    if (commentId) {
      const newChildComment: CreateChildComment = {
        content,
        commentId,
        commentTime: Date.now().toString(),
      };
      await createChildComment(newChildComment).then(refreshPost);
    }
  };

  const handleEditChildComment = async (childCommentId: string, content: string) => {
    if (commentId) {
      const childComment: UpdateChildComment = {
        content,
        commentId,
        childCommentId,
        commentTime: Date.now().toString(),
      };
      await updateChildComment(childComment).then(refreshPost);
    }
  };

  const handleDeleteChildComment = async (childCommentId: string) => {
    if (commentId) {  
      await deleteChildComment(commentId, childCommentId)

      refreshPost()
    }
  };

  return (<div className='comment-details'>
    {post && comment && <div>
      <div className="comment-content">
        <div className="comment-header">
          <img src={comment.avatarUrl} alt="Author Avatar" className="avatar" />
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{new Date(comment.commentTime).toLocaleString()}</span>
          <StarRating rating={comment.rating} readOnly={true} />
        </div>
        {comment.photoUrl && <img src={comment.photoUrl} alt="Comment" className="comment-image" />}
        <p>{comment.content}</p>
      </div>
      <hr></hr>
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
      
      <div className="child-comments">
        {comment.childComments.map((childComment) =>
          <ChildComment
            key={childComment.childCommentId}
            content={childComment.content}
            commentTime={new Date(comment.commentTime).toLocaleString()}
            author={childComment.author}
            avatarUrl={childComment.avatarUrl}
            canEdit={user?.userName === comment.author}
            onEdit={function (newText: string): void {
              handleEditChildComment(childComment.childCommentId, newText)
            }}
            onDelete={function (): void {
              handleDeleteChildComment(childComment.childCommentId)
            }} />)}
      </div>
      <ChildCommentForm onAddChildComment={handleAddChildComment} userAvatar={user?.avatarUrl} />
    </div>}</div>)
};

export default CommentDetails;
