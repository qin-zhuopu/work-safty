import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1,
    name: "智能巡检终端",
    field: "维克X5 红米note9 Pro",
    field1: "860497057200302",
    field2: "860497057200310",
    field3: "电气",
    field4: "1#-2#发电机巡更机",
    field5: "张三",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890123",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 2,
    name: "智能巡检终端",
    field: "维克X5 红米note9",
    field1: "862010056896182",
    field2: "862010056896190",
    field3: "电气",
    field4: "3#-5#发电机巡更机",
    field5: "李四",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890124",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 3,
    name: "智能巡检终端",
    field: "德兰Emate60",
    field1: "863434030240995",
    field2: "863434030241001",
    field3: "电气",
    field4: "化工区运行电工巡更机",
    field5: "王五",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890125",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 4,
    name: "智能巡检终端",
    field: "维克X5 红米note9 Pro",
    field1: "865276050419464",
    field2: "865276050419472",
    field3: "供水",
    field4: "泵房巡检",
    field5: "赵六",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890126",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 5,
    name: "智能巡检终端",
    field: "蓝防L5",
    field1: "353661093835140",
    field2: "353661093835157",
    field3: "供水",
    field4: "母液水巡检",
    field5: "孙七",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890127",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 6,
    name: "智能巡检终端",
    field: "维克X5 红米note9 Pro",
    field1: "865276051364644",
    field2: "865276051364651",
    field3: "供水",
    field4: "排污站巡检",
    field5: "周八",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890128",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 7,
    name: "智能巡检终端",
    field: "蓝防L5",
    field1: "353661093835124",
    field2: "353661093835132",
    field3: "供水",
    field4: "高含盐水巡检",
    field5: "吴九",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890129",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 8,
    name: "智能巡检终端",
    field: "蓝防L5",
    field1: "353661093833988",
    field2: "353661093833996",
    field3: "供水",
    field4: "黄河水巡检",
    field5: "郑十",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890130",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 9,
    name: "智能巡检终端",
    field: "德兰Emate60",
    field1: "863434030240797",
    field2: "863434030240805",
    field3: "供水",
    field4: "化水巡检",
    field5: "冯十一",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890131",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 10,
    name: "智能巡检终端",
    field: "维克X5 红米note9 Pro",
    field1: "862010058258969",
    field2: "862010058258977",
    field3: "供水",
    field4: "消防水站",
    field5: "陈十二",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890132",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 11,
    name: "智能巡检终端",
    field: "德兰Emate60",
    field1: "863434030241003",
    field2: "863434030241011",
    field3: "化工",
    field4: "聚合工段巡检",
    field5: "褚十三",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890133",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  },
  {
    id: 12,
    name: "智能巡检终端",
    field: "维克X5 红米note9",
    field1: "862010056896201",
    field2: "862010056896219",
    field3: "化工",
    field4: "干燥工段巡检",
    field5: "卫十四",
    field6: 1693291308971,
    field7: "管理员",
    field8: "8986001234567890134",
    addDate: 1693291308971,
    addUser: { id: 2, ushow: "dzsh" }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/tl/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const name = query.name || "";

      // 过滤数据
      let filteredData = mockData;
      if (name) {
        filteredData = mockData.filter(
          item =>
            item.name.includes(name) ||
            item.field.includes(name) ||
            item.field3?.includes(name) ||
            item.field4?.includes(name)
        );
      }

      // 分页
      const totalElements = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements
        }
      };
    }
  }
]);
