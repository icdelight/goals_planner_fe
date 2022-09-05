import React from 'react';
import axios from 'axios';
import authReducer, { setCurrentUser } from 'auth/authSlice';
import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';
import { URL_SERVICE } from 'config.js';

let response = {
    responseCode : 999,
    responseDesc : "",
    responseData : null,
};

export const TreeView = async (token) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
    };
    const result = await axios.post( `${URL_SERVICE}goals/alltreegoals`, { }, header)
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.statusCode);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : res.data.message,
                        responseData : [],
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : [],
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : [],
            };
        }
        return response;
    })
    .catch( function(error) {
        // console.log(error);
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}

export const TreeAdmin = async (token) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        }
    };
    const result = await axios.post( `${URL_SERVICE}goals/allgoalsadmin`, { }, header)
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}

export const AddChildTreeService = async (token,titleReq,descReq,picReq,startReq,endReq,parentReq,typeReq,indReq) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
        params : {
            title_goals: titleReq, 
            desc_goals: descReq, 
            pic_goals: picReq, 
            start_date: startReq, 
            due_date: endReq, 
            parent_goals: parentReq,
            type_goals: typeReq,
            indikator: indReq,
        }
    };

    // console.log(header.params);
    const result = await axios.post( 
        `${URL_SERVICE}goals/addgoals`, 
        { }, 
        header
    )
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : 'Invalid response. 2',
                        responseData : null,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}

export const EditNode = async (token,idReq,titleReq,descReq,picReq,startReq,endReq,statusReq,typeReq,indReq) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
        params : {
            id_goals: idReq, 
            title_goals: titleReq, 
            desc_goals: descReq, 
            pic_goals: picReq, 
            start_date: startReq, 
            due_date: endReq, 
            status: statusReq,
            type_goals: typeReq,
            indikator: indReq,
        }
    };

    // console.log(header.params);
    const result = await axios.post( 
        `${URL_SERVICE}goals/editgoals`, 
        { }, 
        header
    )
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : 'Invalid response. 2',
                        responseData : null,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}
export const RemapNode = async (token,Req) => {
    const header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
        params : {
            NewMap: Req,
        }
    };

    // console.log(header.params);
    const result = await axios.post( 
        `${URL_SERVICE}goals/remapgoals`, 
        { }, 
        header
    )
    .then(res => {
        if(res) {
            if(res.data) {
                if(res.data.statusCode) {
                    // console.log(res.data.data);
                    response = {
                        responseCode : res.data.statusCode,
                        responseDesc : res.data.message,
                        responseData : res.data.data,
                    };
                }else{
                    response = {
                        responseCode : 999,
                        responseDesc : 'Invalid response. 2',
                        responseData : null,
                    };
                }
            }else{
                response = {
                    responseCode : 999,
                    responseDesc : 'Invalid response. 3',
                    responseData : null,
                };
            }
        }else{
            response = {
                responseCode : 999,
                responseDesc : 'Failled to parse response.',
                responseData : null,
            };
        }
        return response;
    })
    .catch( function(error) {
        if (error.response) {
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            response = {
                responseCode : error.response.status,
                responseDesc : error.response.data.message,
                responseData : null,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            response = {
                responseCode : 999,
                responseDesc : error.request,
                responseData : null,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
            response = {
                responseCode : 999,
                responseDesc : `Something went wrong, ${error.message}`,
                responseData : null,
            };
        }  
        return response; 
    });
    return result;
}