import request from "./request";

export function getUserChannels() {
  return request({
    url: "/user/channels",
  });
}
