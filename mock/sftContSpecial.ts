import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface SpecialWorker {
  id: number;
  userName: string;
  deptName: string;
  idCard: string;
  category: string;
  cardNo: string;
  beginTime: number;
  checkTime: number;
  endTime: number;
  issuedDept: string;
  file1?: string;
}

const mockData: SpecialWorker[] = [
  {
    id: 1,
    userName: "李浩然",
    deptName: "山东鸿华建筑安装工程有限公司",
    idCard: "131126199912020953",
    category: "高处安装、维护、拆除作业",
    cardNo: "T131126199912020953",
    beginTime: 1727020800000,
    checkTime: 1821542400000,
    endTime: 1821542400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 2,
    userName: "仇跟艳",
    deptName: "浙江中天智汇安装工程有限公司",
    idCard: "370826198405256432",
    category: "高处安装、维护、拆除作业",
    cardNo: "T370826198405256432",
    beginTime: 1737216000000,
    checkTime: 1831737600000,
    endTime: 1831737600000,
    issuedDept: "菏泽鲁西新区应急管理局"
  },
  {
    id: 3,
    userName: "付卫涛",
    deptName: "隆基森特新能源有限公司",
    idCard: "370305198108294716",
    category: "高处安装、维护、拆除作业",
    cardNo: "T370305198108294716",
    beginTime: 1754841600000,
    checkTime: 1849449600000,
    endTime: 1849449600000,
    issuedDept: "济南应急管理局"
  },
  {
    id: 4,
    userName: "赵凤新",
    deptName: "隆基森特新能源有限公司",
    idCard: "37158119910607275X",
    category: "高处安装、维护、拆除作业",
    cardNo: "T37158119910607275X",
    beginTime: 1529596800000,
    checkTime: 1718899200000,
    endTime: 1813507200000,
    issuedDept: "江苏省应急管理厅"
  },
  {
    id: 5,
    userName: "杨巨松",
    deptName: "德州正通市政公用工程有限公司",
    idCard: "371428198709052510",
    category: "熔化焊接与热切割作业",
    cardNo: "T371428198709052510",
    beginTime: 1695830400000,
    checkTime: 1790438400000,
    endTime: 1790438400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 6,
    userName: "吕宪蕾",
    deptName: "山东九安特科技有限公司",
    idCard: "372422200008306410",
    category: "低压电工作业",
    cardNo: "T372422200008306410",
    beginTime: 1657209600000,
    checkTime: 1748188800000,
    endTime: 1846512000000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 7,
    userName: "辛志兵",
    deptName: "隆基森特新能源有限公司",
    idCard: "131127198611043619",
    category: "高压电工作业",
    cardNo: "T131127198611043619",
    beginTime: 1749484800000,
    checkTime: 1844092800000,
    endTime: 1844092800000,
    issuedDept: "河北省应急管理厅"
  },
  {
    id: 8,
    userName: "申小利",
    deptName: "隆基森特新能源有限公司",
    idCard: "410726197208150412",
    category: "氯化工艺作业",
    cardNo: "T410726197208150412",
    beginTime: 1752163200000,
    checkTime: 1846771200000,
    endTime: 1846771200000,
    issuedDept: "河南省应急管理厅"
  },
  {
    id: 9,
    userName: "戚开国",
    deptName: "山东金光集团有限公司",
    idCard: "372424197306187534",
    category: "聚合工艺作业",
    cardNo: "T372424197306187534",
    beginTime: 1663862400000,
    checkTime: 1754236800000,
    endTime: 1853164800000,
    issuedDept: "德州应急管理局"
  },
  {
    id: 10,
    userName: "申法波",
    deptName: "隆基森特新能源有限公司",
    idCard: "410726197807150019",
    category: "化工自动化控制仪表作业",
    cardNo: "T410726197807150019",
    beginTime: 1748361600000,
    checkTime: 1842969600000,
    endTime: 1842969600000,
    issuedDept: "清远市应急管理局"
  },
  {
    id: 11,
    userName: "张三",
    deptName: "山东鸿华建筑安装工程有限公司",
    idCard: "372401199001015678",
    category: "熔化焊接与热切割作业",
    cardNo: "T372401199001015678",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 12,
    userName: "李四",
    deptName: "浙江中天智汇安装工程有限公司",
    idCard: "371326198505206789",
    category: "低压电工作业",
    cardNo: "T371326198505206789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "菏泽鲁西新区应急管理局"
  },
  {
    id: 13,
    userName: "王五",
    deptName: "隆基森特新能源有限公司",
    idCard: "372401198808256789",
    category: "高压电工作业",
    cardNo: "T372401198808256789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "济南应急管理局"
  },
  {
    id: 14,
    userName: "赵六",
    deptName: "德州正通市政公用工程有限公司",
    idCard: "371422199003306789",
    category: "氯化工艺作业",
    cardNo: "T371422199003306789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 15,
    userName: "孙七",
    deptName: "山东九安特科技有限公司",
    idCard: "372401199205156789",
    category: "登高架设作业",
    cardNo: "T372401199205156789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/cont/special/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const userName = (query.userName as string) || "";
      const deptName = (query.deptName as string) || "";
      const category = (query.category as string) || "";
      const status = (query.status as string) || "";

      let filteredData = [...mockData];

      if (userName) {
        filteredData = filteredData.filter(item =>
          item.userName.includes(userName)
        );
      }
      if (deptName) {
        filteredData = filteredData.filter(item =>
          item.deptName.includes(deptName)
        );
      }
      if (category) {
        filteredData = filteredData.filter(item => item.category === category);
      }
      if (status) {
        const now = Date.now();
        if (status === "1") {
          // 过期证书
          filteredData = filteredData.filter(item => item.endTime < now);
        } else if (status === "2") {
          // 即将过期证书（距离有效期1个月内的）
          const oneMonthLater = now + 30 * 24 * 60 * 60 * 1000;
          filteredData = filteredData.filter(
            item => item.endTime >= now && item.endTime <= oneMonthLater
          );
        } else if (status === "3") {
          // 有效证书
          filteredData = filteredData.filter(item => item.endTime > now);
        }
      }

      const total = filteredData.length;
      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: total,
          totalPages: Math.ceil(total / size),
          number: page - 1,
          size,
          first: page === 1,
          last: end >= total,
          numberOfElements: content.length,
          empty: content.length === 0
        }
      };
    }
  }
]);
