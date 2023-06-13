import request from "./request";

/**
 * 获取留言内容
 * @param {Number, String} page 获取第几页
 * @param {Number, String} num 每页展示多少条
 * @returns
 */
export default async function (options = {}) {
  const { page, num = 5, fcode } = options;
  let url = "";
  if (fcode) {
    url = page
      ? `/api.php/cms/form/fcode/${fcode}/num/${num}/page/${page}`
      : `/api.php/cms/form/fcode/${fcode}/num/${num}`;
  } else {
    url = page
      ? `/api.php/cms/msg/num/${num}/page/${page}`
      : `/api.php/cms/msg/num/${num}`;
  }

  return await request.get(url);
}
