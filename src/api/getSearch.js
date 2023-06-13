import request from "./request";
import qs from "qs";
/**
 * 获取搜索内容
 * @param {Object} options 传入参数num, order, field, scode, fuzzy
 * @param {Number, String} num 数量
 * @param {String} order 排序
 * @param {String} field 可以搜索的字段
 * @param {Number, String} scode 指定的分类
 * @param {Number} fuzzy 是否开启模糊搜索，0为关闭模糊搜索
 * @returns
 */
export default async function (options = {}) {
  const data = qs.stringify(options) || "{}";
  return await request.post("/api.php/cms/search", data);
}
