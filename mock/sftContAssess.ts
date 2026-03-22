import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/assess/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page || "0");
      const size = parseInt(query.size || "10");
      const field = query.field || "";
      const beginTime = query.beginTime || "";
      const endTime = query.endTime || "";

      // Mock data
      const allData = [
        {
          id: 187,
          createTime: 1768665600000,
          endTime: 1768924799000,
          count: 30,
          status: 1,
          cm: { field: "衡水郁腾建筑工程有限公司" },
          user: { ushow: "张希瑞" }
        },
        {
          id: 186,
          createTime: 1768319999000,
          endTime: 1768579199000,
          count: 28,
          status: 1,
          cm: { field: "山东德建集团有限公司" },
          user: { ushow: "李明" }
        },
        {
          id: 185,
          createTime: 1767974399000,
          endTime: 1768233599000,
          count: 25,
          status: 0,
          cm: { field: "中石化建设工程公司" },
          user: { ushow: "王强" }
        },
        {
          id: 184,
          createTime: 1767628799000,
          endTime: 1767887999000,
          count: 32,
          status: 1,
          cm: { field: "华鲁控股集团有限公司" },
          user: { ushow: "赵敏" }
        },
        {
          id: 183,
          createTime: 1767283199000,
          endTime: 1767542399000,
          count: 20,
          status: 0,
          cm: { field: "山东能源集团有限公司" },
          user: { ushow: "刘洋" }
        },
        {
          id: 182,
          createTime: 1766937599000,
          endTime: 1767196799000,
          count: 35,
          status: 1,
          cm: { field: "中国建筑第八工程局有限公司" },
          user: { ushow: "孙丽" }
        },
        {
          id: 181,
          createTime: 1766591999000,
          endTime: 1766851199000,
          count: 18,
          status: 1,
          cm: { field: "中铁十四局集团有限公司" },
          user: { ushow: "周杰" }
        },
        {
          id: 180,
          createTime: 1766246399000,
          endTime: 1766505599000,
          count: 22,
          status: 0,
          cm: { field: "山东鲁信建设工程有限公司" },
          user: { ushow: "吴磊" }
        },
        {
          id: 179,
          createTime: 1765900799000,
          endTime: 1766159999000,
          count: 27,
          status: 1,
          cm: { field: "中建五局第三建设有限公司" },
          user: { ushow: "郑华" }
        },
        {
          id: 178,
          createTime: 1765555199000,
          endTime: 1765814399000,
          count: 15,
          status: 0,
          cm: { field: "山东省路桥集团有限公司" },
          user: { ushow: "冯涛" }
        },
        {
          id: 177,
          createTime: 1765209599000,
          endTime: 1765468799000,
          count: 29,
          status: 1,
          cm: { field: "天元建设集团有限公司" },
          user: { ushow: "陈静" }
        },
        {
          id: 176,
          createTime: 1764863999000,
          endTime: 1765123199000,
          count: 24,
          status: 1,
          cm: { field: "兴润建设集团有限公司" },
          user: { ushow: "沈伟" }
        },
        {
          id: 175,
          createTime: 1764518399000,
          endTime: 1764777599000,
          count: 31,
          status: 0,
          cm: { field: "山东新城建工有限公司" },
          user: { ushow: "韩冰" }
        },
        {
          id: 174,
          createTime: 1764172799000,
          endTime: 1764431999000,
          count: 19,
          status: 1,
          cm: { field: "万得分有限公司" },
          user: { ushow: "杨秀兰" }
        },
        {
          id: 173,
          createTime: 1763827199000,
          endTime: 1764086399000,
          count: 26,
          status: 1,
          cm: { field: "山东黄金集团有限公司" },
          user: { ushow: "朱峰" }
        },
        {
          id: 172,
          createTime: 1763481599000,
          endTime: 1763740799000,
          count: 21,
          status: 0,
          cm: { field: "中煤建筑安装工程集团有限公司" },
          user: { ushow: "秦勇" }
        },
        {
          id: 171,
          createTime: 1763135999000,
          endTime: 1763395199000,
          count: 33,
          status: 1,
          cm: { field: "山东鲁泰建筑工程有限公司" },
          user: { ushow: "许梅" }
        },
        {
          id: 170,
          createTime: 1762790399000,
          endTime: 1763049599000,
          count: 17,
          status: 1,
          cm: { field: "盛安建设集团有限公司" },
          user: { ushow: "何军" }
        },
        {
          id: 169,
          createTime: 1762444799000,
          endTime: 1762703999000,
          count: 28,
          status: 0,
          cm: { field: "山东经达建筑工程有限公司" },
          user: { ushow: "吕萍" }
        },
        {
          id: 168,
          createTime: 1762099199000,
          endTime: 1762358399000,
          count: 23,
          status: 1,
          cm: { field: "济南四建集团有限责任公司" },
          user: { ushow: "丁强" }
        },
        {
          id: 167,
          createTime: 1761753599000,
          endTime: 1762012799000,
          count: 30,
          status: 1,
          cm: { field: "山东三箭建设工程有限公司" },
          user: { ushow: "马超" }
        },
        {
          id: 166,
          createTime: 1761407999000,
          endTime: 1761667199000,
          count: 16,
          status: 0,
          cm: { field: "青岛市建筑设计研究院" },
          user: { ushow: "林芳" }
        },
        {
          id: 165,
          createTime: 1761062399000,
          endTime: 1761321599000,
          count: 25,
          status: 1,
          cm: { field: "烟台建工集团有限公司" },
          user: { ushow: "袁波" }
        },
        {
          id: 164,
          createTime: 1760716799000,
          endTime: 1760975999000,
          count: 34,
          status: 1,
          cm: { field: "潍坊昌大建设集团有限公司" },
          user: { ushow: "田甜" }
        },
        {
          id: 163,
          createTime: 1760371199000,
          endTime: 1760630399000,
          count: 20,
          status: 0,
          cm: { field: "山东建工集团有限公司" },
          user: { ushow: "章磊" }
        },
        {
          id: 162,
          createTime: 1760025599000,
          endTime: 1760284799000,
          count: 27,
          status: 1,
          cm: { field: "威海建设集团股份有限公司" },
          user: { ushow: "蔡军" }
        },
        {
          id: 161,
          createTime: 1759679999000,
          endTime: 1759939199000,
          count: 22,
          status: 1,
          cm: { field: "日照建设集团有限公司" },
          user: { ushow: "苏华" }
        },
        {
          id: 160,
          createTime: 1759334399000,
          endTime: 1759593599000,
          count: 29,
          status: 0,
          cm: { field: "临沂天元建设集团有限公司" },
          user: { ushow: "唐杰" }
        },
        {
          id: 159,
          createTime: 1758988799000,
          endTime: 1759247999000,
          count: 18,
          status: 1,
          cm: { field: "德州天元集团有限公司" },
          user: { ushow: "董敏" }
        }
      ];

      // Filter by field if provided
      let filteredData = allData;
      if (field) {
        filteredData = filteredData.filter(item =>
          item.cm.field.toLowerCase().includes(field.toLowerCase())
        );
      }

      // Filter by date range if provided
      if (beginTime) {
        const beginTimestamp = new Date(beginTime).getTime();
        filteredData = filteredData.filter(
          item => item.createTime >= beginTimestamp
        );
      }
      if (endTime) {
        const endTimestamp = new Date(endTime).getTime() + 86400000 - 1;
        filteredData = filteredData.filter(
          item => item.createTime <= endTimestamp
        );
      }

      const totalElements = filteredData.length;
      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / size),
          size,
          number: page
        }
      };
    }
  }
]);
