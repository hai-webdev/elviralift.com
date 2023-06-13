import request from "./request";
/**
 * 内容多图
 * @param {Number,String} id 内容多图的id
 * @returns 
 */
export default async function(id){
    return await request.get(`/api.php/cms/pics/id/${id}`)
}