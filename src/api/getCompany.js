import request from "./request";
/**
 * 公司信息接口
 * @param {String} params 如：标题title
 * @returns api接口
 */
export default async function getCompany(params) {
  const url = params
    ? `/api.php/cms/company/name/${params}`
    : "/api.php/cms/company";
  return await request.get(url);
}
