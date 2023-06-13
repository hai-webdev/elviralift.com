import Mock from "mockjs";
import pic from "@/assets/images/banner-about.jpg";
Mock.mock(/^\/api\.php\/cms\/position\/scode\/\d+$/, "get", {
  code: 1,
  rowtotal: 1,
  data: [
    {
      "scode|1-20": 1,
      "id|+1": 1,
      "pcode|1-20": 1,
      name: "@ctitle",
      outlink: "",
      type: "2",
    },
  ],
});
Mock.mock(/^\/api\.php\/cms\/sort\/scode\/\d+$/, "get", {
  code: 1,
  rowtotal: 1,
  data: [
    {
      "id|+1": 1,
      acode: "cn",
      mcode: "1",
      pcode: "0",
      scode: "@id",
      name: "@ctitle(2,6)",
      listtpl: "",
      contenttpl: "",
      status: 1,
      outlink: "",
      subname: "@ctitle(2,6)",
      ico: "@image('300x200', '#333', '#fff', 'random Image')",
      // pic: "@image('1920x680', '#333', '#fff', 'random Image')",
      pic,
      title: "@ctitle",
      keywords: "@cparagraph(3,7)",
      description: "@cparagraph(3,7)",
      filename: "et",
      sorting: "255",
      create_user: "admin",
      update_user: "admin",
      create_time: "@now",
      update_time: "@now",
      gtype: "4",
      gid: "0",
      gnote: "",
      type: "1",
    },
  ],
});
