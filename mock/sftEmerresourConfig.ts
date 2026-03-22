import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/config/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);
      const field = query.field || "";

      const allData = [
        {
          id: 34,
          field: "空气呼吸器气瓶",
          field1:
            "1、外表干净无划痕；2、气瓶阀门完整好用；3、气瓶在检测期内；4、气瓶压力在28MPA-30MPA内",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1751264499989
        },
        {
          id: 33,
          field: "防汛物资",
          field1: "清理表面卫生，有损害的及时更换",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1748568066109
        },
        {
          id: 32,
          field: "PY推车式泡沫灭火装置",
          field1: "擦拭表面卫生，接头进行润滑",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1745895887357
        },
        {
          id: 31,
          field: "氯气捕消器",
          field1: "表面干净，喷射位置滴润滑油",
          cycle: "每半月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1745894526644
        },
        {
          id: 30,
          field: "手动报警按钮",
          field1: "每季度对手报底座进行一次防腐",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1729242402597
        },
        {
          id: 29,
          field: "医疗药箱",
          field1: "擦拭表面及内部，保证医疗箱内外无杂物灰尘",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1728985461977
        },
        {
          id: 28,
          field: "应急照明灯",
          field1: "外观是否清洁",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1728990365932
        },
        {
          id: 27,
          field: "有机玻璃防护面罩",
          field1: "擦拭有机面罩",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1730707364809
        },
        {
          id: 26,
          field: "安全绳",
          field1: "外表无污染物",
          cycle: "每季度",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1744698987035
        },
        {
          id: 25,
          field: "长管呼吸器",
          field1:
            "1、外观是否清洁2、各部件是否齐全3、导气管是否有龟裂、气泡、压扁、弯折、漏气现象4、面罩是否清晰、无划痕",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1751264685551
        },
        {
          id: 24,
          field: "防化服",
          field1: "表面干净整洁，无破损",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1730707364809
        },
        {
          id: 23,
          field: "正压式空气呼吸器",
          field1: "1、外观是否清洁2、各部件是否齐全3、气瓶压力在28MPA-30MPA内",
          cycle: "每月",
          addUser: { id: 2, uname: "dzsh", ushow: "德州实华化工有限公司" },
          addDate: 1730707364809
        }
      ];

      let filteredData = allData;
      if (field) {
        filteredData = allData.filter(item => item.field.includes(field));
      }

      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          number: page,
          size,
          first: page === 0,
          last: end >= filteredData.length,
          numberOfElements: content.length,
          empty: content.length === 0
        }
      };
    }
  },
  {
    url: "/sft/emerresour/config/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  },
  {
    url: "/sft/emerresour/config/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
