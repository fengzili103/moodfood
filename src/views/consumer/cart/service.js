import request from "@/utils/request";

export function checkout(data) {
  return request({
    url: "/api/order/add",
    method: "post",
    data,
  });
}
export function insert(data) {
  return request({
    url: "/api/communication/insert",
    method: "post",
    data,
  });
}
