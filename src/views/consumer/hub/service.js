import request from "@/utils/request";

export function get(params) {
  return request({
    url: "/api/auth/info",
    method: "get",
    params: params,
  });
}

export function getComment(data) {
  return request({
    url: "/api/comment/list",
    method: "post",
    data,
  });
}

export function history(data) {
  return request({
    url: "/api/order/list",
    method: "post",
    data,
  });
}
export function leavemessage(data) {
  return request({
    url: "/api/comment/add",
    method: "post",
    data,
  });
}

export function removemessage(data) {
  return request({
    url: "/api/comment/remove",
    method: "post",
    data,
  });
}

export function editinfo(data) {
  return request({
    url: "/api/auth/update",
    method: "post",
    data,
  });
}
