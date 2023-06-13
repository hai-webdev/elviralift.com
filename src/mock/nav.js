import Mock from "mockjs";
import pic from "@/assets/images/banner-pro1.jpg";
Mock.mock(/^\/api\.php\/cms\/nav(\/scode\/.+)?$/, "get", () => {
    
  const data = {
    "id|+1": 1,
    acode: "cn",
    mcode: "1",
    pcode: "0",
    scode: "@id",
    // name: "@ctitle(2,6)",
    name: "经典传承",
    listtpl: "",
    contenttpl: "",
    status: 1,
    outlink: "",
    // subname: "@ctitle(2,6)",
    subname: "Classic",
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
    def1:"Inheritance"
    
  };
  return Mock.mock({
    code: 1,
    "rowtotal|1-7": 1,
    "data|1-7": [
      {
        ...data,
        "son|0-7": [{
            ...data,
            "son|0-7": [data],
        }],
      },
    ],
  });
});
