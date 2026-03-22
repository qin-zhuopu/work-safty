import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/loc/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const type = query.type ? Number(query.type) : 0;
      const alarmStatus = query.alarmStatus ? Number(query.alarmStatus) : 0;

      const allData = [
        {
          id: "1",
          jhr: "张三",
          docNo: "ZY-2024-001",
          title: "受限空间作业",
          no: "KH001",
          status: 2,
          time: 1711123200000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "2",
          jhr: "李四",
          docNo: "ZY-2024-002",
          title: "动火作业",
          no: "KH002",
          status: 3,
          time: 1711126800000,
          alarmStatus: 2,
          field: "已处理"
        },
        {
          id: "3",
          jhr: "王五",
          docNo: "ZY-2024-003",
          title: "高处作业",
          no: "KH003",
          status: 4,
          time: 1711130400000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "4",
          jhr: "赵六",
          docNo: "ZY-2024-004",
          title: "吊装作业",
          no: "KH004",
          status: 5,
          time: 1711134000000,
          alarmStatus: 2,
          field: "已处理"
        },
        {
          id: "5",
          jhr: "孙七",
          docNo: "ZY-2024-005",
          title: "临时用电作业",
          no: "KH005",
          status: 6,
          time: 1711137600000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "6",
          jhr: "周八",
          docNo: "ZY-2024-006",
          title: "动土作业",
          no: "KH006",
          status: 7,
          time: 1711141200000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "7",
          jhr: "吴九",
          docNo: "ZY-2024-007",
          title: "断路作业",
          no: "KH007",
          status: 8,
          time: 1711144800000,
          alarmStatus: 2,
          field: "已处理"
        },
        {
          id: "8",
          jhr: "郑十",
          docNo: "ZY-2024-008",
          title: "盲板抽堵作业",
          no: "KH008",
          status: 9,
          time: 1711148400000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "9",
          jhr: "钱十一",
          docNo: "ZY-2024-009",
          title: "设备检修",
          no: "KH009",
          status: 10,
          time: 1711152000000,
          alarmStatus: 2,
          field: "已处理"
        },
        {
          id: "10",
          jhr: "陈十二",
          docNo: "ZY-2024-010",
          title: "管道维保",
          no: "KH010",
          status: 2,
          time: 1711155600000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "11",
          jhr: "杨十三",
          docNo: "ZY-2024-011",
          title: "阀门更换",
          no: "KH011",
          status: 3,
          time: 1711159200000,
          alarmStatus: 1,
          field: "待处理"
        },
        {
          id: "12",
          jhr: "朱十四",
          docNo: "ZY-2024-012",
          title: "仪表校验",
          no: "KH012",
          status: 4,
          time: 1711162800000,
          alarmStatus: 2,
          field: "已处理"
        }
      ];

      let filteredData = [...allData];

      if (type !== 0) {
        filteredData = filteredData.filter(item => item.status === type);
      }

      if (alarmStatus !== 0) {
        filteredData = filteredData.filter(
          item => item.alarmStatus === alarmStatus
        );
      }

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
  },
  {
    url: "/sft/work/loc/statistics/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          deptCountAll: 49349,
          deptCountList: [
            34, 7371, 6964, 2098, 105, 4046, 4189, 4461, 5948, 65, 10663, 1029,
            23, 2353
          ],
          deptCountStr:
            "按照属地分：公司领导34次、HSE管理部7371次、双氧水车间6964次、办公室(党委)2098次、运营管理部105次、PVC一车间4046次、供应链管理部4189次、电解车间4461次、研发中心5948次、财务管理部65次、机电仪车间10663次、承包商1029次、人力资源部23次、热电车间2353次",
          deptList: [
            "公司领导",
            "HSE管理部",
            "双氧水车间",
            "办公室(党委)",
            "运营管理部",
            "PVC一车间",
            "供应链管理部",
            "电解车间",
            "研发中心",
            "财务管理部",
            "机电仪车间",
            "承包商",
            "人力资源部",
            "热电车间"
          ],
          field: 34,
          field1: 7371,
          field10: 4461,
          field11: 5948,
          field12: 0,
          field13: 65,
          field14: 10663,
          field15: 1029,
          field16: 23,
          field17: 0,
          field18: 2353,
          field19: 155,
          field2: 0,
          field20: 0,
          field21: 0,
          field22: 0,
          field23: 1,
          field24: 5,
          field25: 0,
          field26: 52475,
          field27: 2,
          field3: 6964,
          field4: 2098,
          field5: 105,
          field6: 4046,
          field7: 0,
          field8: 0,
          field9: 4189,
          typeCountList: [155, 1, 5, 52475, 2],
          typeCountStr:
            "按照报警类型分：检修超员155次、一键报警1次、静止预警5次、人员聚集52475次、越界报警2次",
          typeList: ["检修超员", "一键报警", "静止预警", "人员聚集", "越界报警"]
        }
      };
    }
  }
]);
