import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  {
    id: 1,
    name: "现场违章操作事故",
    pers: "张三",
    content: "未按规定佩戴安全防护用品",
    way: "罚款500元",
    opinion: "警告处分",
    user: { id: 112, ushow: "李四" },
    createDate: 1690250269484
  },
  {
    id: 2,
    name: "设备维护奖",
    pers: "王五",
    content: "及时发现设备隐患并处理",
    way: "奖励1000元",
    opinion: "通报表扬",
    user: { id: 112, ushow: "李四" },
    createDate: 1690336669484
  },
  {
    id: 3,
    name: "泄漏处理及时奖",
    pers: "赵六",
    content: "发现管道泄漏及时处理",
    way: "奖励800元",
    opinion: "嘉奖",
    user: { id: 2, ushow: "管理员" },
    createDate: 1690423069484
  },
  {
    id: 4,
    name: "安全培训缺席处罚",
    pers: "孙七",
    content: "无故缺席安全培训会议",
    way: "罚款200元",
    opinion: "批评教育",
    user: { id: 112, ushow: "李四" },
    createDate: 1690509469484
  },
  {
    id: 5,
    name: "优秀安全管理员",
    pers: "周八",
    content: "连续三个月无安全事故",
    way: "奖励2000元",
    opinion: "先进个人",
    user: { id: 2, ushow: "管理员" },
    createDate: 1690595869484
  },
  {
    id: 6,
    name: "应急预案演练优秀表现",
    pers: "吴九",
    content: "在应急演练中表现突出",
    way: "奖励500元",
    opinion: "表扬",
    user: { id: 112, ushow: "李四" },
    createDate: 1690682269484
  },
  {
    id: 7,
    name: "违反操作规程事故",
    pers: "郑十",
    content: "未按操作规程进行设备启停",
    way: "罚款300元",
    opinion: "警告",
    user: { id: 112, ushow: "李四" },
    createDate: 1690768669484
  },
  {
    id: 8,
    name: "隐患排查奖励",
    pers: "钱十一",
    content: "主动排查发现重大安全隐患",
    way: "奖励1500元",
    opinion: "通报嘉奖",
    user: { id: 2, ushow: "管理员" },
    createDate: 1690855069484
  }
];

export default defineFakeRoute([
  {
    url: "/sft/am/reward/list/:amId",
    method: "get",
    response: ({ _params, query }) => {
      const { page = 1, size = 10, name, pers } = query;

      // 过滤数据
      let filteredData = [...mockData];
      if (name) {
        filteredData = filteredData.filter(item =>
          item.name.includes(name as string)
        );
      }
      if (pers) {
        filteredData = filteredData.filter(item =>
          item.pers.includes(pers as string)
        );
      }

      // 分页
      const total = filteredData.length;
      const start = (Number(page) - 1) * Number(size);
      const end = start + Number(size);
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: total
        }
      };
    }
  },
  {
    url: "/sft/am/reward/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
