import Mock from "mockjs";

Mock.mock("/api.php/cms/addmsg", "post", {
  code: 1,
  rowtotal: 1,
  data: "留言提交成功！",
});
Mock.mock(/^\/api\.php\/cms\/addform\/fcode\/\d+$/, "post", {
  code: 1,
  rowtotal: 1,
  data: "留言提交成功！",
});

Mock.mock(/^\/api\.php\/cms\/msg\/num\/\d+(\/page\/\d+)?$/, "get", {
  code: 1,
  "rowtotal|2-20": 1,
  "data|2-20": [
    {
      "id|+1": 1,
      acode: "cn",
      user_ip: /\d{10}/,
      user_os: "Windows 10",
      user_bs: "Chrome",
      recontent: "",
      status: "1",
      create_user: "api",
      update_user: "admin",
      create_time: "@now",
      update_time: "@now",
      uid: "0",
      title: "@ctitle",
      tel: /13\d{9}/,
    },
  ],
});
Mock.mock(/^\/api\.php\/cms\/form\/fcode\/\d+(\/num\/\d+)?(\/page\/\d+)?$/, "get", {
  code: 1,
  "rowtotal|2-20": 1,
  "data|2-20": [
    {
      "id|+1": 1,
      acode: "cn",
      user_ip: /\d{10}/,
      user_os: "Windows 10",
      user_bs: "Chrome",
      recontent: "",
      status: "1",
      create_user: "api",
      update_user: "admin",
      create_time: "@now",
      update_time: "@now",
      uid: "0",
      title: "@ctitle",
      tel: /13\d{9}/,
    },
  ],
});
