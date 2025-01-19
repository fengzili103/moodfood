import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}

export function register(data) {
  return request({
    url: "/api/auth/register",
    method: "post",
    data,
  });
}
export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}
export function dictList() {
  return request({
    url: "/dict/dictList",
    method: "get",
  });
}
