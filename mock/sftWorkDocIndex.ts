import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟部门数据
const deptData = [
  { id: 3, name: "公司领导", value: 3 },
  { id: 4, name: "办公室（党委办公室）", value: 4 },
  { id: 5, name: "纪委办公室", value: 5 },
  { id: 6, name: "党群工作部", value: 6 },
  { id: 8, name: "人力资源部", value: 8 },
  { id: 9, name: "HSE管理部", value: 9 },
  { id: 11, name: "运营管理部", value: 11 },
  { id: 13, name: "供应链管理部", value: 13 },
  { id: 14, name: "财务管理部", value: 14 },
  { id: 16, name: "法律合规部", value: 16 },
  { id: 19, name: "聚氯乙烯车间", value: 19 },
  { id: 20, name: "电解车间", value: 20 },
  { id: 21, name: "机电仪车间", value: 21 },
  { id: 22, name: "热电车间", value: 22 },
  { id: 23, name: "双氧水车间", value: 23 }
];

// 模拟作业数据
const mockWorkData = [
  {
    deptName: "热电车间",
    doc: {
      id: "1",
      title: "动火安全作业证",
      docNo: "DH-2024-001",
      status: "作业中",
      nodeName: "安全员确认",
      dept: { id: 22, name: "热电车间" },
      user: { id: "101", ushow: "张三" },
      createTime: 1704067200000,
      act: { id: "act1", jsaNo: "JSA-2024-001" },
      monitorId: 101,
      cameraId: 201,
      cameraName: "布控球-01"
    },
    monitorName: "摄像头-01",
    start_time: "2024-01-15 08:00",
    endTime: "2024-01-15 18:00",
    zynr: "汽机外置油泵系统管道碰口及垫铁点焊",
    files: "/uploads/file1.pdf,/uploads/file2.jpg"
  },
  {
    deptName: "电解车间",
    doc: {
      id: "2",
      title: "受限空间安全作业证",
      docNo: "SX-2024-002",
      status: "审核中",
      nodeName: "车间主任审批",
      dept: { id: 20, name: "电解车间" },
      user: { id: "102", ushow: "李四" },
      createTime: 1704153600000,
      act: { id: "act2", jsaNo: "JSA-2024-002" },
      monitorId: 102,
      cameraId: null,
      cameraName: null
    },
    monitorName: "摄像头-02",
    start_time: "2024-01-16 09:00",
    endTime: "2024-01-16 17:00",
    zynr: "液氯储罐内部检修",
    files: "/uploads/file3.pdf"
  },
  {
    deptName: "聚氯乙烯车间",
    doc: {
      id: "3",
      title: "高处检维修安全作业证",
      docNo: "GC-2024-003",
      status: "新建",
      nodeName: "申请人提交",
      dept: { id: 19, name: "聚氯乙烯车间" },
      user: { id: "103", ushow: "王五" },
      createTime: 1704240000000,
      act: { id: "act3", jsaNo: "JSA-2024-003" },
      monitorId: null,
      cameraId: 203,
      cameraName: "布控球-03"
    },
    monitorName: null,
    start_time: "2024-01-17 08:30",
    endTime: "2024-01-17 16:30",
    zynr: "聚合釜顶部平台护栏维修",
    files: null
  },
  {
    deptName: "机电仪车间",
    doc: {
      id: "4",
      title: "临时用电安全作业证",
      docNo: "LD-2024-004",
      status: "结束",
      nodeName: "已完成",
      dept: { id: 21, name: "机电仪车间" },
      user: { id: "104", ushow: "赵六" },
      createTime: 1704326400000,
      act: { id: "act4", jsaNo: "JSA-2024-004" },
      monitorId: 104,
      cameraId: null,
      cameraName: null
    },
    monitorName: "摄像头-04",
    start_time: "2024-01-18 08:00",
    endTime: "2024-01-18 12:00",
    zynr: "临时照明线路敷设",
    files: "/uploads/file5.docx"
  },
  {
    deptName: "双氧水车间",
    doc: {
      id: "5",
      title: "盲板抽堵安全作业证",
      docNo: "MB-2024-005",
      status: "中断",
      nodeName: "安全员确认",
      dept: { id: 23, name: "双氧水车间" },
      user: { id: "105", ushow: "孙七" },
      createTime: 1704412800000,
      act: { id: "act5", jsaNo: "JSA-2024-005" },
      monitorId: null,
      cameraId: null,
      cameraName: null
    },
    monitorName: null,
    start_time: "2024-01-19 09:00",
    endTime: "2024-01-19 17:00",
    zynr: "氧化管道盲板抽堵",
    files: null
  },
  {
    deptName: "热电车间",
    doc: {
      id: "6",
      title: "吊装安全作业证",
      docNo: "XZ-2024-006",
      status: "作业中",
      nodeName: "监护人确认",
      dept: { id: 22, name: "热电车间" },
      user: { id: "106", ushow: "周八" },
      createTime: 1704499200000,
      act: { id: "act6", jsaNo: "JSA-2024-006" },
      monitorId: 106,
      cameraId: 206,
      cameraName: "布控球-06"
    },
    monitorName: "摄像头-06",
    start_time: "2024-01-20 08:00",
    endTime: "2024-01-20 20:00",
    zynr: "锅炉省煤器吊装更换",
    files: "/uploads/file6.pdf,/uploads/file7.jpg"
  },
  {
    deptName: "电解车间",
    doc: {
      id: "7",
      title: "动土安全作业证",
      docNo: "DT-2024-007",
      status: "审核中",
      nodeName: "生产技术部审批",
      dept: { id: 20, name: "电解车间" },
      user: { id: "107", ushow: "吴九" },
      createTime: 1704585600000,
      act: { id: "act7", jsaNo: "JSA-2024-007" },
      monitorId: null,
      cameraId: null,
      cameraName: null
    },
    monitorName: null,
    start_time: "2024-01-21 08:30",
    endTime: "2024-01-21 16:30",
    zynr: "盐水工段管道开挖",
    files: null
  },
  {
    deptName: "聚氯乙烯车间",
    doc: {
      id: "8",
      title: "断路安全作业证",
      docNo: "DL-2024-008",
      status: "作废",
      nodeName: "已作废",
      dept: { id: 19, name: "聚氯乙烯车间" },
      user: { id: "108", ushow: "郑十" },
      createTime: 1704672000000,
      act: { id: "act8", jsaNo: "JSA-2024-008" },
      monitorId: null,
      cameraId: null,
      cameraName: null
    },
    monitorName: null,
    start_time: "2024-01-22 09:00",
    endTime: "2024-01-22 15:00",
    zynr: "厂区道路断路施工",
    files: null
  },
  {
    deptName: "HSE管理部",
    doc: {
      id: "9",
      title: "高处架设安全作业证",
      docNo: "GCJS-2024-009",
      status: "结束",
      nodeName: "已完成",
      dept: { id: 9, name: "HSE管理部" },
      user: { id: "109", ushow: "刘十一" },
      createTime: 1704758400000,
      act: { id: "act9", jsaNo: "JSA-2024-009" },
      monitorId: 109,
      cameraId: null,
      cameraName: null
    },
    monitorName: "摄像头-09",
    start_time: "2024-01-23 08:00",
    endTime: "2024-01-23 14:00",
    zynr: "安全监控架设",
    files: "/uploads/file9.pdf"
  },
  {
    deptName: "运营管理部",
    doc: {
      id: "10",
      title: "设备断电作业",
      docNo: "SDD-2024-010",
      status: "作业中",
      nodeName: "电工确认",
      dept: { id: 11, name: "运营管理部" },
      user: { id: "110", ushow: "陈十二" },
      createTime: 1704844800000,
      act: { id: "act10", jsaNo: "JSA-2024-010" },
      monitorId: 110,
      cameraId: 210,
      cameraName: "布控球-10"
    },
    monitorName: "摄像头-10",
    start_time: "2024-01-24 08:30",
    endTime: "2024-01-24 17:00",
    zynr: "配电室断电检修",
    files: "/uploads/file10.pdf"
  },
  {
    deptName: "机电仪车间",
    doc: {
      id: "11",
      title: "设备送电作业",
      docNo: "SSD-2024-011",
      status: "新建",
      nodeName: "申请人提交",
      dept: { id: 21, name: "机电仪车间" },
      user: { id: "111", ushow: "杨十三" },
      createTime: 1704931200000,
      act: { id: "act11", jsaNo: "JSA-2024-011" },
      monitorId: null,
      cameraId: null,
      cameraName: null
    },
    monitorName: null,
    start_time: "2024-01-25 09:00",
    endTime: "2024-01-25 16:00",
    zynr: "配电室送电恢复",
    files: null
  },
  {
    deptName: "热电车间",
    doc: {
      id: "12",
      title: "高压断电作业",
      docNo: "GYDD-2024-012",
      status: "审核中",
      nodeName: "能源部审批",
      dept: { id: 22, name: "热电车间" },
      user: { id: "112", ushow: "黄十四" },
      createTime: 1705017600000,
      act: { id: "act12", jsaNo: "JSA-2024-012" },
      monitorId: 112,
      cameraId: null,
      cameraName: null
    },
    monitorName: "摄像头-12",
    start_time: "2024-01-26 08:00",
    endTime: "2024-01-26 18:00",
    zynr: "高压开关柜断电检修",
    files: "/uploads/file12.pdf"
  }
];

export default defineFakeRoute([
  // 部门列表接口
  {
    url: "/sft/sys/dept/cjzr/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: deptData
      };
    }
  },
  // 作业列表接口
  {
    url: "/sft/work/doc/list.json",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const deptId = (query.deptId as string) || "";
      const status = (query.status as string) || "";
      const title = (query.title as string) || "";
      const name = (query.name as string) || "";
      const startTime = (query.startTime as string) || "";
      const endTime = (query.endTime as string) || "";

      // 过滤数据
      let filteredData = mockWorkData;
      if (deptId && deptId !== "-1") {
        filteredData = filteredData.filter(
          item => item.doc?.dept?.id === parseInt(deptId)
        );
      }
      if (status) {
        filteredData = filteredData.filter(item => item.doc?.status === status);
      }
      if (title && title !== "-1") {
        filteredData = filteredData.filter(item =>
          item.doc?.title?.includes(title)
        );
      }
      if (name) {
        filteredData = filteredData.filter(item => item.zynr?.includes(name));
      }
      if (startTime) {
        filteredData = filteredData.filter(
          item => item.doc?.createTime >= new Date(startTime).getTime()
        );
      }
      if (endTime) {
        const endDate = new Date(endTime);
        endDate.setHours(23, 59, 59, 999);
        filteredData = filteredData.filter(
          item => item.doc?.createTime <= endDate.getTime()
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
          empty: pageData.length === 0
        }
      };
    }
  }
]);
