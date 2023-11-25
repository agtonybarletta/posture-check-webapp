import {models} from "@tensorflow/tfjs";
import React, {createContext, useContext, useState} from "react";
import PostureCheckService from "./PostureCheckService";
import PostureCheckServiceContext from "./PostureCheckServiceContext";


function ServicesProvider(props: any) {
	
  const postureCheckService = new PostureCheckService();

  return (
			<PostureCheckServiceContext.Provider value={postureCheckService}>
					{props.children}
			</PostureCheckServiceContext.Provider>
  );
}

export default ServicesProvider;
