import request from "@/utils/request";

export function send(data) {
  return request({
    url: "/v1/chat/completions",
    method: "post",
    data,
  });
}
