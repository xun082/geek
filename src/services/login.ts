import request from "./request";

export function sendCode(mobile: string) {
  return request({
    url: "/sms/codes/" + mobile,
    method: "get",
  });
}

export function sendLogin(value: {}) {
  return request({
    url: "/authorizations",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(value),
  });
}

export function getUserInfo() {
  return request({
    url: "/user",
    method: "get",
  });
}
