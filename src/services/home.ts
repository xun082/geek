import request from "./request";

export function getChannels() {
  return request({
    url: "/user/channels",
  });
}
