import Mock from "mockjs";

Mock.mock(/^\/api\.php\/cms\/link\/gid\/\d+\/num\/\d+$/, "get", {
  code: 1,
  "rowtotal|2-10": 1,
  "data|2-10": [
    {
        "id|+1": 1,
        acode: "cn",
        gid: "1",
        "name": "@ctitle",
        "link": "@url('http')",
        "logo": "@image('200x68', '#333', '#fff', 'random Image')",
        "sorting": "255",
        "create_user": "admin",
        "update_user": "admin",
        "create_time": "@now",
        "update_time": "@now"
    }
  ],
});
