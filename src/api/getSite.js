import request from "./request";
/**
 * 网站信息接口
 * @param {String} params 如：标题title
 * @returns
 */
export default async function getSite(params) {
  const url = params ? `/api.php/cms/site/name/${params}` : "/api.php/cms/site";
  return await request.get(url);
}
