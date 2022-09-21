import request from "./request";

export function getUserProfile() {
  return request({
    url: "/user/profile",
    method: "get",
  });
}
