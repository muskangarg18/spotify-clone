import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE, logout } from "./common";

const BASE_API_URL= import.meta.env.VITE_API_BASE_URL;
const getAccessToken = ()=>{
    const accessToken= localStorage.getItem(ACCESS_TOKEN);
    const expireIn= localStorage.getItem(EXPIRES_IN);
    const token_type= localStorage.getItem(TOKEN_TYPE);
    if(Date.now()<expireIn){
        return{accessToken,token_type};
    }else{
        logout();
    }
}
const createAPIConfig = ({accessToken,token_type}, method="GET")=>{
    return {
        
            headers:{
                Authorization: `${token_type} ${accessToken}`
            },

            method
    }
}
export const fetchRequest = async(endpoint)=>{
    const url =`${BASE_API_URL}/${endpoint}`;
    const result = await fetch(url,createAPIConfig(getAccessToken()));
    return result.json();

}