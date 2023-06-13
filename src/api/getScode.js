import request from "./request";
/**
 * 获取分类位置
 * @param {Number,String} scode 栏目编号
 * @returns 
 */
async function getScodePosition(scode) {
  return await request.get(`/api.php/cms/position/scode/${scode}`);
}
/**
 * 获取分类信息
 * @param {Number, String} scode 栏目编号
 * @returns 
 */
async function getScodeInfo(scode) {
  return await request.get(`/api.php/cms/sort/scode/${scode}`);
}

export { getScodePosition, getScodeInfo };
