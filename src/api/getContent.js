import request from "./request";
/**
 * 获取内容详情
 * @param {Number,String} options 传入栏目编号，或者内容编号
 * @param {Number,String} scode 传入栏目编号
 * @param {Number,String} id 传入内容编号
 * @returns
 */
export default async function (options = {}) {
  const { scode, id } = options;
  if (scode && id) {
    console.error("scode与id不应该同时存在！");
  }
  if (scode) {
    return await request.get(`/api.php/about/${scode}`);
  }
  if (id) {
    return await request.get(`/api.php/content/${id}`);
  }
}
