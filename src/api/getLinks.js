import request from "./request";

/**
 * 获取友情链接
 * @param {Number, String} gid 编号
 * @param {Number, String} num 数量
 * @returns 
 */
export default async function(gid = 1, num = 5){
    return await request.get(`/api.php/cms/link/gid/${gid}/num/${num}`)
}