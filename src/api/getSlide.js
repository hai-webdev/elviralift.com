import request from "./request";
/**
 * 轮播图
 * @param {Number,String} gid 轮播图的编号
 * @param {Number,String} num 展示的数量，默认为5
 * @returns 
 */
export default async function(gid = 1,  num = 5){
    return await request.get(`/api.php/cms/slide/gid/${gid}/num/${num}`)
}