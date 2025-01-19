import request from "@/utils/request";

export function send(data) {
  return request({
    url: "/api/communication/reply",
    method: "post",
    data,
  });
}
export function foodsuggest(data) {
  return request({
    url: "/api/communication/recommend",
    method: "post",
    data,
  });
}
export function end(data) {
  return request({
    url: "/api/communication/logout",
    method: "post",
    data,
  });
}
