import request from "@/utils/request";

export function get(data) {
  return request({
    url: "/api/order/list",
    method: "post",
    data,
  });
}
