import request from "@/utils/request";

export function get(data) {
  return request({
    url: "/api/food/page",
    method: "post",
    data,
  });
}
export function getInfo(params) {
  return request({
    url: "/api/food/info",
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
