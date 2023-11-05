import {createContext} from 'react';
import PostureCheckService from './PostureCheckService';

const PostureCheckServiceContext = createContext<PostureCheckService | undefined>(undefined);

export default PostureCheckServiceContext;
