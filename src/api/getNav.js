import request from "./request";
/**
 * 栏目列表树
 * @param {String} scode 如：标题title
 * @returns api接口
 */
export default async function getNav(scode) {
  const url = scode ? `/api.php/cms/nav/scode/${scode}` : "/api.php/cms/nav";
  return await request.get(url);
}
