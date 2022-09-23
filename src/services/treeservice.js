import axios from "axios";
import { URL_SERVICE } from "config.js";
import { defaultFailedRes, defaultSuccessRes } from "./defaultRes";

let response = {
  responseCode: 999,
  responseDesc: "",
  responseData: null,
};

export const InitialGoals = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .get(`${URL_SERVICE}goals/initialGoals`, options)
    .then(defaultSuccessRes)
    .catch(defaultFailedRes);
  return result;
};

export const TreeGoals = async (token, body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .post(`${URL_SERVICE}goals/treeGoals`, body, options)
    .then(defaultSuccessRes)
    .catch(defaultFailedRes);
  return result;
};

export const ChildGoals = async (token, body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .post(`${URL_SERVICE}goals/childGoals`, body, options)
    .then(defaultSuccessRes)
    .catch(defaultFailedRes);
  return result;
};

export const SearchGoals = async (token, body) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .post(`${URL_SERVICE}goals/searchgoals`, body, options)
    .then(defaultSuccessRes)
    .catch(defaultFailedRes);
  return result;
};

export const TreeView = async (token) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .post(`${URL_SERVICE}goals/alltreegoals`, {}, header)
    .then((res) => {
      if (res) {
        if (res.data) {
          if (res.data.statusCode) {
            // console.log(res.data.statusCode);
            response = {
              responseCode: res.data.statusCode,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          } else {
            response = {
              responseCode: 999,
              responseDesc: res.data.message,
              responseData: [],
            };
          }
        } else {
          response = {
            responseCode: 999,
            responseDesc: "Invalid response. 3",
            responseData: [],
          };
        }
      } else {
        response = {
          responseCode: 999,
          responseDesc: "Failled to parse response.",
          responseData: [],
        };
      }
      return response;
    })
    .catch(function (error) {
      // console.log(error);
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        response = {
          responseCode: error.response.status,
          responseDesc: error.response.data.message,
          responseData: null,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        response = {
          responseCode: 999,
          responseDesc: error.request,
          responseData: null,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        response = {
          responseCode: 999,
          responseDesc: `Something went wrong, ${error.message}`,
          responseData: null,
        };
      }
      return response;
    });
  return result;
};

export const TreeAdmin = async (token) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .post(`${URL_SERVICE}goals/allgoalsadmin`, {}, header)
    .then((res) => {
      if (res) {
        if (res.data) {
          if (res.data.statusCode) {
            // console.log(res.data.data);
            response = {
              responseCode: res.data.statusCode,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          } else {
            response = {
              responseCode: 999,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          }
        } else {
          response = {
            responseCode: 999,
            responseDesc: "Invalid response. 3",
            responseData: null,
          };
        }
      } else {
        response = {
          responseCode: 999,
          responseDesc: "Failled to parse response.",
          responseData: null,
        };
      }
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        response = {
          responseCode: error.response.status,
          responseDesc: error.response.data.message,
          responseData: null,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        response = {
          responseCode: 999,
          responseDesc: error.request,
          responseData: null,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        response = {
          responseCode: 999,
          responseDesc: `Something went wrong, ${error.message}`,
          responseData: null,
        };
      }
      return response;
    });
  return result;
};

export const AddChildTreeService = async (
  token,
  titleReq,
  descReq,
  picReq,
  startReq,
  endReq,
  parentReq,
  typeReq,
  indReq
) => {
  const params = new URLSearchParams();
  params.append("title_goals", titleReq);
  params.append("desc_goals", descReq);
  params.append("pic_goals", picReq);
  params.append("start_date", startReq);
  params.append("due_date", endReq);
  params.append("parent_goals", parentReq);
  params.append("type_goals", JSON.stringify(typeReq));
  params.append("indikator", indReq);
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(header.params);
  const result = await axios
    .post(`${URL_SERVICE}goals/addgoals`, params, header)
    .then((res) => {
      if (res) {
        if (res.data) {
          if (res.data.statusCode) {
            // console.log(res.data.data);
            response = {
              responseCode: res.data.statusCode,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          } else {
            response = {
              responseCode: 999,
              responseDesc: "Invalid response. 2",
              responseData: null,
            };
          }
        } else {
          response = {
            responseCode: 999,
            responseDesc: "Invalid response. 3",
            responseData: null,
          };
        }
      } else {
        response = {
          responseCode: 999,
          responseDesc: "Failled to parse response.",
          responseData: null,
        };
      }
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        response = {
          responseCode: error.response.status,
          responseDesc: error.response.data.message,
          responseData: null,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        response = {
          responseCode: 999,
          responseDesc: error.request,
          responseData: null,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        response = {
          responseCode: 999,
          responseDesc: `Something went wrong, ${error.message}`,
          responseData: null,
        };
      }
      return response;
    });
  return result;
};

export const EditNode = async (
  token,
  idReq,
  titleReq,
  descReq,
  picReq,
  startReq,
  endReq,
  statusReq,
  typeReq,
  indReq
) => {
  const params = new URLSearchParams();
  params.append("id_goals", idReq);
  params.append("title_goals", titleReq);
  params.append("desc_goals", descReq);
  params.append("pic_goals", picReq);
  params.append("start_date", startReq);
  params.append("due_date", endReq);
  params.append("status_goals", statusReq);
  params.append("type_goals", JSON.stringify(typeReq));
  params.append("indikator", indReq);

  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    params: {
      id_goals: idReq,
      title_goals: titleReq,
      desc_goals: descReq,
      pic_goals: picReq,
      start_date: startReq,
      due_date: endReq,
      status_goals: statusReq,
      type_goals: typeReq,
      indikator: indReq,
    },
  };

  // console.log(header.params);
  const result = await axios
    .post(`${URL_SERVICE}goals/editgoals`, params, header)
    .then((res) => {
      if (res) {
        if (res.data) {
          if (res.data.statusCode) {
            // console.log(res.data.data);
            response = {
              responseCode: res.data.statusCode,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          } else {
            response = {
              responseCode: 999,
              responseDesc: "Invalid response. 2",
              responseData: null,
            };
          }
        } else {
          response = {
            responseCode: 999,
            responseDesc: "Invalid response. 3",
            responseData: null,
          };
        }
      } else {
        response = {
          responseCode: 999,
          responseDesc: "Failled to parse response.",
          responseData: null,
        };
      }
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        response = {
          responseCode: error.response.status,
          responseDesc: error.response.data.message,
          responseData: null,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        response = {
          responseCode: 999,
          responseDesc: error.request,
          responseData: null,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        response = {
          responseCode: 999,
          responseDesc: `Something went wrong, ${error.message}`,
          responseData: null,
        };
      }
      return response;
    });
  return result;
};
export const RemapNode = async (token, Req) => {
  const params = new URLSearchParams();
  params.append("NewMap", JSON.stringify(Req));
  // console.log(params.toString());
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(header.params);
  const result = await axios
    .post(`${URL_SERVICE}goals/remapgoals`, params, header)
    .then((res) => {
      if (res) {
        if (res.data) {
          if (res.data.statusCode) {
            // console.log(res.data.data);
            response = {
              responseCode: res.data.statusCode,
              responseDesc: res.data.message,
              responseData: res.data.data,
            };
          } else {
            response = {
              responseCode: 999,
              responseDesc: "Invalid response. 2",
              responseData: null,
            };
          }
        } else {
          response = {
            responseCode: 999,
            responseDesc: "Invalid response. 3",
            responseData: null,
          };
        }
      } else {
        response = {
          responseCode: 999,
          responseDesc: "Failled to parse response.",
          responseData: null,
        };
      }
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        response = {
          responseCode: error.response.status,
          responseDesc: error.response.data.message,
          responseData: null,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        response = {
          responseCode: 999,
          responseDesc: error.request,
          responseData: null,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        response = {
          responseCode: 999,
          responseDesc: `Something went wrong, ${error.message}`,
          responseData: null,
        };
      }
      return response;
    });
  return result;
};
