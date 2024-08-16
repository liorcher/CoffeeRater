import { CommentData } from "./comment";

export interface PostProps {
  id: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavorProfile: string[];
  grindOption: string[];
  roastLevel: number;
  imageUrl: string;
  comments: CommentData[];
  currentUser: string | undefined;
  currentUserAvatar: string | undefined;
  onCommentChange: any;
}

export interface PostData  {
  _id: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
  image_url: string;
  comments: CommentData[];
}


export interface PostDetailsProps  {
  id: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavorProfile: string[];
  grindOption: string[];
  roastLevel: number;
  imageUrl: string;
}