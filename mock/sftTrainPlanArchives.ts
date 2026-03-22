import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟用户数据
const mockUsers = [
  { id: 1, ushow: "张三", sex: "男" },
  { id: 2, ushow: "李四", sex: "女" },
  { id: 3, ushow: "王五", sex: "男" }
];

// 模拟三级教育台账数据
const mockTeoData = [
  {
    id: 1,
    sysUser: { ushow: "张三", sex: "男" },
    post: "操作工",
    gsDate: "2024-01-15",
    gsScore: "95",
    gsFile1: "gs-file.pdf",
    gsFile2: "8",
    cjDate: "2024-01-20",
    cjScore: "92",
    cjFile1: "cj-file.pdf",
    cjFile2: "8",
    bzDate: "2024-01-25",
    bzScore: "98",
    bzFile1: "bz-file.pdf",
    bzFile2: "4",
    type: "转岗",
    zgjyDate: "2024-02-01",
    zgjyScore: "90",
    zgjyFile1: "zgjy-file.pdf",
    zgjyFile2: "4"
  },
  {
    id: 2,
    sysUser: { ushow: "张三", sex: "男" },
    post: "操作工",
    gsDate: "2023-06-10",
    gsScore: "88",
    gsFile1: "gs-file2.pdf",
    gsFile2: "8",
    cjDate: "2023-06-15",
    cjScore: "90",
    cjFile1: "cj-file2.pdf",
    cjFile2: "8",
    bzDate: "2023-06-20",
    bzScore: "92",
    bzFile1: "bz-file2.pdf",
    bzFile2: "4"
  }
];

export default defineFakeRoute([
  // 获取部门列表
  {
    url: "/sft/sys/dept/cjzr/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 1,
            name: "实华化工有限公司",
            value: 1,
            children: [
              {
                id: 2,
                name: "德州实华化工有限公司",
                value: 2,
                children: [
                  { id: 19, name: "聚氯乙烯车间", value: 19, children: [] },
                  { id: 20, name: "电解车间", value: 20, children: [] },
                  { id: 21, name: "机电仪车间", value: 21, children: [] },
                  { id: 22, name: "热电车间", value: 22, children: [] },
                  { id: 23, name: "双氧水车间", value: 23, children: [] }
                ]
              },
              {
                id: 24,
                name: "泰安分公司",
                value: 24,
                children: []
              }
            ]
          }
        ]
      };
    }
  },
  // 获取部门下的用户列表
  {
    url: "/sft/sys/user/allListByDept/:deptId",
    method: "get",
    response: () => {
      return {
        success: true,
        t: mockUsers
      };
    }
  },
  // 三级教育台账列表
  {
    url: "/sft/train/teo/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page || "1");
      const size = parseInt(query.size || "10");
      const sysUserId = parseInt(query.sysUserId || "0");

      // 简单的过滤逻辑
      const filteredData = [...mockTeoData];
      if (sysUserId) {
        // 实际应该根据用户ID过滤
      }

      const start = (page - 1) * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          number: page - 1,
          size,
          empty: content.length === 0,
          first: page === 1,
          last: end >= filteredData.length
        }
      };
    }
  },
  // 证书管理列表 - 使用实际数据
  {
    url: "/sft/work/special/list.json",
    method: "get",
    response: async () => {
      // 从实际JSON文件读取数据
      const actualData = {
        success: true,
        t: {
          content: [
            {
              beginTime: 1698364800000,
              cardNo: "T372401197701104810",
              category: "高处安装、维护、拆除作业",
              checkTime: 1790812800000,
              company: {
                id: 1
              },
              deptName: "PVC一车间",
              endTime: 1790899200000,
              id: 8704,
              idCard: "372401197701104810",
              issuedDept: "德州市应急管理局",
              userName: "郝金柱"
            },
            {
              beginTime: 1698364800000,
              cardNo: "T371326200101192410",
              category: "高处安装、维护、拆除作业",
              checkTime: 1790812800000,
              company: {
                id: 1
              },
              deptName: "PVC二车间",
              endTime: 1790899200000,
              id: 8705,
              idCard: "371326200101192410",
              issuedDept: "德州市应急管理局",
              userName: "吴文韬"
            },
            {
              beginTime: 1698364800000,
              cardNo: "T372401197506275710",
              category: "高处安装、维护、拆除作业",
              checkTime: 1790812800000,
              company: {
                id: 1
              },
              deptName: "热电车间",
              endTime: 1790899200000,
              id: 8706,
              idCard: "372401197506275710",
              issuedDept: "德州市应急管理局",
              userName: "崔风田"
            },
            {
              beginTime: 1700870400000,
              cardNo: "T371402198711111918",
              category: "高处安装、维护、拆除作业",
              checkTime: 1793491200000,
              company: {
                id: 1
              },
              deptName: "热电车间",
              endTime: 1793491200000,
              id: 8707,
              idCard: "371402198711111918",
              issuedDept: "德州市应急管理局",
              userName: "马晓勇"
            },
            {
              beginTime: 1685059200000,
              cardNo: "T371422200201256717",
              category: "高处安装、维护、拆除作业",
              checkTime: 1777593600000,
              company: {
                id: 1
              },
              deptName: "热电车间",
              endTime: 1777593600000,
              id: 8452,
              idCard: "371422200201256717",
              issuedDept: "德州市应急管理局",
              userName: "李中亮"
            }
          ],
          totalElements: 5,
          totalPages: 1,
          number: 0,
          size: 10,
          empty: false,
          first: true,
          last: true
        }
      };
      return actualData;
    }
  }
]);
