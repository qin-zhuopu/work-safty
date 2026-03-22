import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 列表接口
  {
    url: "/sft/emerresour/ma/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const mockData = [
        {
          id: 1,
          field: "碘伏",
          field1: "100ml/瓶",
          field2: "50",
          field3: "医务室A柜",
          field5: 1640995200000,
          field6: 1777612800000,
          sysDept: {
            id: 86,
            name: "供水工段",
            parent: {
              name: "热电车间"
            }
          },
          sysUser: {
            ushow: "张三"
          }
        },
        {
          id: 2,
          field: "医用酒精",
          field1: "75% 500ml/瓶",
          field2: "30",
          field3: "医务室B柜",
          field5: 1640995200000,
          field6: 1704067200000,
          sysDept: {
            id: 87,
            name: "热电车间管理组",
            parent: {
              name: "热电车间"
            }
          },
          sysUser: {
            ushow: "李四"
          }
        },
        {
          id: 3,
          field: "创可贴",
          field1: "常规型",
          field2: "100",
          field3: "急救箱1",
          field5: 1672531200000,
          field6: 1810000000000,
          sysDept: {
            id: 75,
            name: "离子膜工段",
            parent: {
              name: "电解车间"
            }
          },
          sysUser: {
            ushow: "王五"
          }
        },
        {
          id: 4,
          field: "纱布块",
          field1: "10cm×10cm",
          field2: "200",
          field3: "急救箱2",
          field5: 1672531200000,
          field6: 1800000000000,
          sysDept: {
            id: 76,
            name: "氯氢处理及氯化氢工段",
            parent: {
              name: "电解车间"
            }
          },
          sysUser: {
            ushow: "赵六"
          }
        },
        {
          id: 5,
          field: "云南白药气雾剂",
          field1: "85g/瓶",
          field2: "20",
          field3: "医务室C柜",
          field5: 1640995200000,
          field6: 1672531200000,
          sysDept: {
            id: 47,
            name: "合成工段",
            parent: {
              name: "聚氯乙烯车间"
            }
          },
          sysUser: {
            ushow: "孙七"
          }
        },
        {
          id: 6,
          field: "体温计",
          field1: "电子式",
          field2: "15",
          field3: "医务室A柜",
          field5: 1680307200000,
          field6: 1820000000000,
          sysDept: {
            id: 52,
            name: "聚合工段",
            parent: {
              name: "聚氯乙烯车间"
            }
          },
          sysUser: {
            ushow: "周八"
          }
        },
        {
          id: 7,
          field: "医用棉签",
          field1: "常规型",
          field2: "500",
          field3: "急救箱3",
          field5: 1672531200000,
          field6: 1790000000000,
          sysDept: {
            id: 94,
            name: "双氧水装置工段",
            parent: {
              name: "双氧水车间"
            }
          },
          sysUser: {
            ushow: "吴九"
          }
        },
        {
          id: 8,
          field: "医用口罩",
          field1: "医用外科",
          field2: "300",
          field3: "急救箱4",
          field5: 1672531200000,
          field6: 1780000000000,
          sysDept: {
            id: 83,
            name: "仪表工段",
            parent: {
              name: "机电仪车间"
            }
          },
          sysUser: {
            ushow: "郑十"
          }
        },
        {
          id: 9,
          field: "止血带",
          field1: "成人型",
          field2: "50",
          field3: "急救箱5",
          field5: 1640995200000,
          field6: 1770000000000,
          sysDept: {
            id: 84,
            name: "电气工段",
            parent: {
              name: "热电车间"
            }
          },
          sysUser: {
            ushow: "冯十一"
          }
        },
        {
          id: 10,
          field: "医用手套",
          field1: "L号",
          field2: "100",
          field3: "急救箱6",
          field5: 1672531200000,
          field6: 1805000000000,
          sysDept: {
            id: 62,
            name: "聚氯乙烯维修工段",
            parent: {
              name: "聚氯乙烯车间"
            }
          },
          sysUser: {
            ushow: "陈十二"
          }
        },
        {
          id: 11,
          field: "清凉油",
          field1: "3g/盒",
          field2: "80",
          field3: "急救箱7",
          field5: 1640995200000,
          field6: 1760000000000,
          sysDept: {
            id: 88,
            name: "锅炉工段",
            parent: {
              name: "热电车间"
            }
          },
          sysUser: {
            ushow: "楚十三"
          }
        },
        {
          id: 12,
          field: "风油精",
          field1: "8ml/瓶",
          field2: "60",
          field3: "急救箱8",
          field5: 1640995200000,
          field6: 1750000000000,
          sysDept: {
            id: 79,
            name: "电解维修工段",
            parent: {
              name: "电解车间"
            }
          },
          sysUser: {
            ushow: "魏十四"
          }
        }
      ];

      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedData = mockData.slice(startIndex, endIndex);

      return {
        success: true,
        t: {
          content: paginatedData,
          totalElements: mockData.length
        }
      };
    }
  },
  // 删除接口
  {
    url: "/sft/emerresour/ma/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  },
  // 批量删除接口
  {
    url: "/sft/emerresour/ma/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
