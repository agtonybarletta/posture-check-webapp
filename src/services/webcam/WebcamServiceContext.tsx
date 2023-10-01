import {createContext} from 'react';
import WebcamService from './WebcamService';

const WebcamServiceContext = createContext(new WebcamService());

export default WebcamServiceContext;
