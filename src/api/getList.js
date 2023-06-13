import request from "./request";
/**
 * 
 * @param {Object} options 传参
 * @param {Number, String} scode 栏目编号
 * @param {Number, String} page 当前页码
 * @param {Number, String} num 每页条数
 * @param {String} order 排序方式
 * @returns 
 */
export default async function(options = {}){
    const scode = options.scode || 1;
    const page = options.page ? `/page/${options.page}` : "";
    const num = options.num ? `/num/${options.num}` : "";
    const order = options.order ? `/order/${options.order}` : "";
    const url = `/api.php/list/${scode + page + num + order}`;
    return await request.get(url);

}