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
    id: 8704,
    userName: "郝金柱",
    deptName: "PVC一车间",
    idCard: "372401197701104810",
    category: "高处安装、维护、拆除作业",
    cardNo: "T372401197701104810",
    beginTime: 1698364800000,
    checkTime: 1790812800000,
    endTime: 1790899200000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8705,
    userName: "吴文韬",
    deptName: "PVC二车间",
    idCard: "371326200101192410",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371326200101192410",
    beginTime: 1698364800000,
    checkTime: 1790812800000,
    endTime: 1790899200000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8706,
    userName: "崔风田",
    deptName: "热电车间",
    idCard: "372401197506275710",
    category: "高处安装、维护、拆除作业",
    cardNo: "T372401197506275710",
    beginTime: 1698364800000,
    checkTime: 1790812800000,
    endTime: 1790899200000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8707,
    userName: "马晓勇",
    deptName: "热电车间",
    idCard: "371402198711111918",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371402198711111918",
    beginTime: 1700870400000,
    checkTime: 1793491200000,
    endTime: 1793491200000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8708,
    userName: "韩文相",
    deptName: "PVC二车间",
    idCard: "370481200112013819",
    category: "高处安装、维护、拆除作业",
    cardNo: "T370481200112013819",
    beginTime: 1700870400000,
    checkTime: 1793491200000,
    endTime: 1793491200000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8452,
    userName: "李中亮",
    deptName: "热电车间",
    idCard: "371422200201256717",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371422200201256717",
    beginTime: 1685059200000,
    checkTime: 1777593600000,
    endTime: 1777593600000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8451,
    userName: "杨晓伟",
    deptName: "PVC一车间",
    idCard: "371202200010182114",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371202200010182114",
    beginTime: 1685059200000,
    checkTime: 1777593600000,
    endTime: 1777593600000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8450,
    userName: "杨松",
    deptName: "PVC一车间",
    idCard: "371425198703027657",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371425198703027657",
    beginTime: 1685059200000,
    checkTime: 1777593600000,
    endTime: 1777593600000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8449,
    userName: "谷永才",
    deptName: "PVC一车间",
    idCard: "371581198610123910",
    category: "高处安装、维护、拆除作业",
    cardNo: "T371581198610123910",
    beginTime: 1685059200000,
    checkTime: 1777593600000,
    endTime: 1777593600000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8448,
    userName: "闫俊伟",
    deptName: "PVC一车间",
    idCard: "372401197707170018",
    category: "高处安装、维护、拆除作业",
    cardNo: "T372401197707170018",
    beginTime: 1685059200000,
    checkTime: 1777593600000,
    endTime: 1777593600000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8709,
    userName: "张三",
    deptName: "PVC一车间",
    idCard: "372401199001015678",
    category: "熔化焊接与热切割作业",
    cardNo: "T372401199001015678",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8710,
    userName: "李四",
    deptName: "PVC二车间",
    idCard: "371326198505206789",
    category: "低压电工作业",
    cardNo: "T371326198505206789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8711,
    userName: "王五",
    deptName: "热电车间",
    idCard: "372401198808256789",
    category: "高压电工作业",
    cardNo: "T372401198808256789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  },
  {
    id: 8712,
    userName: "赵六",
    deptName: "氯碱车间",
    idCard: "371422199003306789",
    category: "氯化工艺作业",
    cardNo: "T371422199003306789",
    beginTime: 1704067200000,
    checkTime: 1796688000000,
    endTime: 1796774400000,
    issuedDept: "德州市应急管理局"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/special/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const userName = (query.userName as string) || "";
      const deptName = (query.deptName as string) || "";
      const category = (query.category as string) || "";

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
