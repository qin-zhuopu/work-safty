import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据 - 更换台账
const mockData = [
  {
    id: 1,
    deptName: "PVC VCM公用工程工段",
    field: "Redmi Note 9 pro",
    field1: "865276052166089",
    field2: "865276052166097",
    field3: "无法充电",
    field4: "Redmi Note 9 pro",
    field5: "865276052156445",
    field6: "865276052156452",
    field7: 1694707200000,
    field8: "葛宏振",
    field9: "13361126906",
    field10: "张海月",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "",
    addDate: 1711352343670,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 2,
    deptName: "PVC VCM 反应",
    field: "Redmi Note 9 pro",
    field1: "862010057159549",
    field2: "862010057159556",
    field3: "无法充电",
    field4: "Redmi Note 9 pro",
    field5: "862010057327443",
    field6: "862010057327450",
    field7: 1694793600000,
    field8: "潘正红",
    field9: "15553407335",
    field10: "张海月",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "",
    addDate: 1711352334292,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 3,
    deptName: "PVC VCM 精制",
    field: "Redmi Note 9 pro",
    field1: "862010057211688",
    field2: "862010057211696",
    field3: "无法充电",
    field4: "Redmi Note 9 pro",
    field5: "865276054132766",
    field6: "865276054132774",
    field7: 1694793600000,
    field8: "潘正红",
    field9: "15553407335",
    field10: "张海月",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "",
    addDate: 1711352773561,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 4,
    deptName: "PVC 合成转化二线",
    field: "Redmi Note 9 pro",
    field1: "862010054168261",
    field2: "862010054168279",
    field3: "信号慢",
    field4: "Redmi Note 9 pro",
    field5: "862010057327443",
    field6: "862010057327450",
    field7: 1695052800000,
    field8: "苏斌",
    field9: "13053477281",
    field10: "张海月",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "",
    addDate: 1711353123296,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 5,
    deptName: "VCM 装置工段",
    field: "华为 Mate 40",
    field1: "862010057211699",
    field2: "862010057211700",
    field3: "屏幕损坏",
    field4: "华为 Mate 50",
    field5: "865276054132800",
    field6: "865276054132801",
    field7: 1695139200000,
    field8: "李明",
    field9: "13800138000",
    field10: "王芳",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "物联网卡123456",
    addDate: 1711353500000,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 6,
    deptName: "聚合工段",
    field: "小米 12",
    field1: "862010057211701",
    field2: "862010057211702",
    field3: "电池续航不足",
    field4: "小米 13",
    field5: "865276054132802",
    field6: "865276054132803",
    field7: 1695225600000,
    field8: "张伟",
    field9: "13900139000",
    field10: "刘洋",
    field11: "报废",
    field12: "已报废",
    field13: "",
    addDate: 1711353900000,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 7,
    deptName: "干燥工段",
    field: "荣耀 50",
    field1: "862010057211703",
    field2: "862010057211704",
    field3: "系统卡顿",
    field4: "荣耀 60",
    field5: "865276054132804",
    field6: "865276054132805",
    field7: 1695312000000,
    field8: "赵静",
    field9: "13700137000",
    field10: "孙强",
    field11: "返厂维修",
    field12: "维修中",
    field13: "物联网卡789012",
    addDate: 1711354200000,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  },
  {
    id: 8,
    deptName: "包装工段",
    field: "OPPO Reno 7",
    field1: "862010057211705",
    field2: "862010057211706",
    field3: "摄像头故障",
    field4: "OPPO Reno 8",
    field5: "865276054132806",
    field6: "865276054132807",
    field7: 1695398400000,
    field8: "周杰",
    field9: "13600136000",
    field10: "吴敏",
    field11: "返厂维修",
    field12: "已换回原手机",
    field13: "",
    addDate: 1711354500000,
    addUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    }
  }
];

export default defineFakeRoute([
  {
    url: "/sft/insp/cl/list.json",
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
            item.deptName?.includes(name) ||
            item.field?.includes(name) ||
            item.field1?.includes(name) ||
            item.field8?.includes(name)
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
          totalElements,
          pageable: {
            offset: start,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: { empty: true, sorted: false, unsorted: true },
            unpaged: false
          },
          first: page === 1,
          last: end >= totalElements,
          number: page - 1,
          size,
          sort: { empty: true, sorted: false, unsorted: true },
          numberOfElements: content.length,
          totalPages: Math.ceil(totalElements / size),
          empty: content.length === 0
        }
      };
    }
  }
]);
