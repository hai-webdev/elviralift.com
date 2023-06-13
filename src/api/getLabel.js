import request from "./request";
/**
 * 自定义标签接口
 * @param {String} params 如：标题title
 * @returns api接口
 */
export default async function getLabel(params) {
  const url = params
    ? `/api.php/cms/label/name/${params}`
    : "/api.php/cms/label";
  return await request.get(url);
}
