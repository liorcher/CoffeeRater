// src/components/Post.tsx

import React from 'react';
import './Post.css';
import { PostDetailsProps } from '../models/post';


const PostDetails: React.FC<PostDetailsProps> = ({
  id,
  name,
  description,
  price,
  region,
  weight,
  flavorProfile,
  grindOption,
  roastLevel,
  imageUrl
}) => {

  return (
    <div>
      <img src={imageUrl} alt="Post" className="post-image" />
      <div className="post-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Weight:</strong> {weight}g
        </p>
        <p>
          <strong>Flavor Profile:</strong> {flavorProfile.join(', ')}
        </p>
        <p>
          <strong>Grind Options:</strong> {grindOption.join(', ')}
        </p>
        <p>
          <strong>Roast Level:</strong> {roastLevel}
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
