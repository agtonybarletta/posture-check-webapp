import {createContext} from 'react';
import ModelService from './ModelService';

const ModelServiceContext = createContext(new ModelService());

export default ModelServiceContext;
