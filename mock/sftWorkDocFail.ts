import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 审验作业管理
const mockData = [
  {
    id: "1",
    deptName: "热电车间",
    zynr: "锅炉检修动火作业",
    doc: {
      id: "1001",
      title: "动火作业证",
      docNo: "DH-2024-001",
      failType: "安全措施确认不当",
      failReason: "未确认现场可燃气体检测合格",
      createTime: 1735209600000,
      dept: { name: "供水工段" },
      user: { ushow: "张三" },
      act: {
        id: "act1001",
        jsaNo: "JSA-2024-001",
        beginTime: 1735209600000,
        endTime: 1735213200000,
        status: 1,
        nodeStatus: 0,
        content: "锅炉检修动火作业"
      }
    }
  },
  {
    id: "2",
    deptName: "电解车间",
    zynr: "液氯储罐受限空间作业",
    doc: {
      id: "1002",
      title: "受限空间作业证",
      docNo: "SX-2024-002",
      failType: "作业分析不合规",
      failReason: "作业危害分析不完整",
      createTime: 1735216800000,
      dept: { name: "液氯工段" },
      user: { ushow: "李四" },
      act: {
        id: "act1002",
        jsaNo: "JSA-2024-002",
        beginTime: 1735216800000,
        endTime: 1735220400000,
        status: 2,
        nodeStatus: 1,
        content: "液氯储罐受限空间作业"
      }
    }
  },
  {
    id: "3",
    deptName: "聚氯乙烯车间",
    zynr: "高处管道检维修作业",
    doc: {
      id: "1003",
      title: "高处作业证",
      docNo: "GD-2024-003",
      failType: "票证基础信息有误",
      failReason: "作业地点填写不准确",
      createTime: 1735224000000,
      dept: { name: "聚合工段" },
      user: { ushow: "王五" },
      act: {
        id: "act1003",
        jsaNo: "JSA-2024-003",
        beginTime: 1735224000000,
        endTime: 1735227600000,
        status: 0,
        nodeStatus: 0,
        content: "高处管道检维修作业"
      }
    }
  },
  {
    id: "4",
    deptName: "机电仪车间",
    zynr: "临时用电作业",
    doc: {
      id: "1004",
      title: "临时用电作业证",
      docNo: "DD-2024-004",
      failType: "签字无法辨认",
      failReason: "审批人员签字模糊不清",
      createTime: 1735231200000,
      dept: { name: "电气工段" },
      user: { ushow: "赵六" },
      act: {
        id: "act1004",
        jsaNo: "JSA-2024-004",
        beginTime: 1735231200000,
        endTime: 1735234800000,
        status: 3,
        nodeStatus: 0,
        content: "临时用电作业"
      }
    }
  },
  {
    id: "5",
    deptName: "双氧水车间",
    zynr: "盲板抽堵作业",
    doc: {
      id: "1005",
      title: "盲板抽堵作业证",
      docNo: "MB-2024-005",
      failType: "盲板图不合规",
      failReason: "盲板图未标注正确位置",
      createTime: 1735238400000,
      dept: { name: "双氧水装置工段" },
      user: { ushow: "孙七" },
      act: {
        id: "act1005",
        jsaNo: "JSA-2024-005",
        beginTime: 1735238400000,
        endTime: 1735242000000,
        status: 1,
        nodeStatus: 0,
        content: "盲板抽堵作业"
      }
    }
  },
  {
    id: "6",
    deptName: "热电车间",
    zynr: "设备吊装作业",
    doc: {
      id: "1006",
      title: "吊装作业证",
      docNo: "DZ-2024-006",
      failType: "作业人选取不当",
      failReason: "作业人员未持有效证件",
      createTime: 1735245600000,
      dept: { name: "锅炉工段" },
      user: { ushow: "周八" },
      act: {
        id: "act1006",
        jsaNo: "JSA-2024-006",
        beginTime: 1735245600000,
        endTime: 1735249200000,
        status: 2,
        nodeStatus: 1,
        content: "设备吊装作业"
      }
    }
  },
  {
    id: "7",
    deptName: "运营管理部",
    zynr: "动土作业",
    doc: {
      id: "1007",
      title: "动土作业证",
      docNo: "DT-2024-007",
      failType: "危害辨识不适用",
      failReason: "未识别地下管线风险",
      createTime: 1735252800000,
      dept: { name: "生产运营办" },
      user: { ushow: "吴九" },
      act: {
        id: "act1007",
        jsaNo: "JSA-2024-007",
        beginTime: 1735252800000,
        endTime: 1735256400000,
        status: 1,
        nodeStatus: 0,
        content: "动土作业"
      }
    }
  },
  {
    id: "8",
    deptName: "供应链管理部",
    zynr: "道路断路作业",
    doc: {
      id: "1008",
      title: "断路作业证",
      docNo: "DL-2024-008",
      failType: "票证未及时验收",
      failReason: "作业完成后未及时验收",
      createTime: 1735260000000,
      dept: { name: "仓储物流办公室" },
      user: { ushow: "郑十" },
      act: {
        id: "act1008",
        jsaNo: "JSA-2024-008",
        beginTime: 1735260000000,
        endTime: 1735263600000,
        status: 2,
        nodeStatus: 1,
        content: "道路断路作业"
      }
    }
  },
  {
    id: "9",
    deptName: "聚氯乙烯车间",
    zynr: "高处架设作业",
    doc: {
      id: "1009",
      title: "高处作业证",
      docNo: "GS-2024-009",
      failType: "未选取记录仪",
      failReason: "未配置作业记录仪",
      createTime: 1735267200000,
      dept: { name: "聚氯乙烯维修工段" },
      user: { ushow: "钱一" },
      act: {
        id: "act1009",
        jsaNo: "JSA-2024-009",
        beginTime: 1735267200000,
        endTime: 1735270800000,
        status: 0,
        nodeStatus: 0,
        content: "高处架设作业"
      }
    }
  },
  {
    id: "10",
    deptName: "HSE管理部",
    zynr: "安全培训动火作业",
    doc: {
      id: "1010",
      title: "动火作业证",
      docNo: "DH-2024-010",
      failType: "受限空间进出登记表不合规",
      failReason: "进出人员登记不完整",
      createTime: 1735274400000,
      dept: { name: "安全管理办公室" },
      user: { ushow: "刘二" },
      act: {
        id: "act1010",
        jsaNo: "JSA-2024-010",
        beginTime: 1735274400000,
        endTime: 1735278000000,
        status: 2,
        nodeStatus: 1,
        content: "安全培训动火作业"
      }
    }
  },
  {
    id: "11",
    deptName: "电解车间",
    zynr: "电解槽受限空间作业",
    doc: {
      id: "1011",
      title: "受限空间作业证",
      docNo: "SX-2024-011",
      failType: "安全措施确认不当",
      failReason: "应急救援设备未到位",
      createTime: 1735281600000,
      dept: { name: "离子膜工段" },
      user: { ushow: "陈三" },
      act: {
        id: "act1011",
        jsaNo: "JSA-2024-011",
        beginTime: 1735281600000,
        endTime: 1735285200000,
        status: 1,
        nodeStatus: 0,
        content: "电解槽受限空间作业"
      }
    }
  },
  {
    id: "12",
    deptName: "热电车间",
    zynr: "烟囱高处检维修作业",
    doc: {
      id: "1012",
      title: "高处作业证",
      docNo: "GD-2024-012",
      failType: "作业人选取不当",
      failReason: "作业人员未进行体检",
      createTime: 1735288800000,
      dept: { name: "热电车间管理组" },
      user: { ushow: "杨四" },
      act: {
        id: "act1012",
        jsaNo: "JSA-2024-012",
        beginTime: 1735288800000,
        endTime: 1735292400000,
        status: 3,
        nodeStatus: 0,
        content: "烟囱高处检维修作业"
      }
    }
  },
  {
    id: "13",
    deptName: "机电仪车间",
    zynr: "仪表校验作业",
    doc: {
      id: "1013",
      title: "其他作业证",
      docNo: "QT-2024-013",
      failType: "其他",
      failReason: "票证填写不规范",
      createTime: 1735296000000,
      dept: { name: "仪表工段" },
      user: { ushow: "黄五" },
      act: {
        id: "act1013",
        jsaNo: "JSA-2024-013",
        beginTime: 1735296000000,
        endTime: 1735299600000,
        status: 1,
        nodeStatus: 0,
        content: "仪表校验作业"
      }
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doc/fails.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const deptId = query.deptId as string;
      const _title = query.title as string;
      const failType = query.failType as string;
      const name = query.name as string;

      // 过滤数据
      let filteredData = mockData;

      if (deptId && deptId !== "-1" && deptId !== "") {
        filteredData = filteredData.filter(item => {
          // 简单匹配部门名称
          return item.deptName && item.deptName.length > 0;
        });
      }

      if (failType) {
        filteredData = filteredData.filter(
          item => item.doc.failType === failType
        );
      }

      if (name) {
        filteredData = filteredData.filter(
          item =>
            item.zynr?.includes(name) ||
            item.doc.act.content?.includes(name) ||
            item.doc.docNo?.includes(name)
        );
      }

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          first: page === 1,
          last: end >= filteredData.length,
          number: page - 1,
          numberOfElements: pageData.length,
          size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          empty: pageData.length === 0
        }
      };
    }
  }
]);
