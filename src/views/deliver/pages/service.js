import request from "@/utils/request";

export function foodlist(params) {
  return request({
    url: "/api/food/list",
    method: "get",
    params: params,
  });
}
export function orderlist(data) {
  return request({
    url: "/api/order/list",
    method: "post",
    data,
  });
}
export function updatelist(data) {
  return request({
    url: "/api/order/update/state",
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
export function del(data) {
  return request({
    url: "/api/food/remove",
    method: "post",
    data,
  });
}
export function addOne(data) {
  return request({
    url: "/api/food/add",
    method: "post",
    data,
  });
}
export function editOne(data) {
  return request({
    url: "/api/food/edit",
    method: "post",
    data,
  });
}

export function getComment(data) {
  return request({
    url: "/api/comment/list",
    method: "post",
    data,
  });
}
