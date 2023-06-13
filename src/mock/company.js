import Mock from "mockjs";
Mock.mock(/^\/api\.php\/cms\/company(\/name\/.+)?$/, "get", (options) => {
  const data = {
    id: "1",
    acode: "cn",
    name: "@ctitle",
    enname: "@title",
    address: "@county(true)",
    postcode: "@zip",
    contact: "@ctitle",
    mobile: "13123456789",
    phone: "13123456789",
    fax: "13123456789",
    email: "123456789@qq.com",
    qq: "123456789",
    weixin: "wechat",
    blicense: "SDAIS1231231231",
    other: "@cparagraph(3,7)",
  };
  const params = options.url.replace("/api.php/cms/company", "");
  if (params) {
    const param = params.replace("/name/", "");
    return Mock.mock({
      code: 1,
      rowtotal: 1,
      data: data[param],
    });
  } else {
    return Mock.mock({
      code: 1,
      rowtotal: 1,
      data,
    });
  }
});
