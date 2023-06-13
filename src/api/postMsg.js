import request from "./request";
import qs from "qs";

/**
 * 提交留言信息
 * @param {Object} options 传入的字段名的对象
 * @returns
 */
export default async function (options = {}, fcode) {
  const url = fcode
    ? `/api.php/cms/addform/fcode/${fcode}`
    : "/api.php/cms/addmsg";
  const data = qs.stringify(options) || "{}";
  return await request.post(url, data);
}
