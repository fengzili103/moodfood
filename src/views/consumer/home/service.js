import request from "@/utils/request";

export function get(data) {
  return request({
    url: "/api/food/page",
    method: "post",
    data,
  });
}
