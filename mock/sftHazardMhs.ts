import { defineFakeRoute } from "vite-plugin-fake-server/client";

const mockData = [
  {
    addDate: 1738822244124,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1735488000000,
    id: 5,
    latitude: 37.517677,
    level: "Ⅲ级",
    longitude: 116.363424,
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "过氧化氢装置产品罐区"
  },
  {
    addDate: 1741855834880,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 6,
    latitude: 37.517065,
    level: "Ⅲ级",
    longitude: 116.371279,
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "氯乙烯聚合（含供料及回收）单元"
  },
  {
    addDate: 1741855398936,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 7,
    latitude: 37.518336,
    level: "Ⅳ级",
    longitude: 116.372986,
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "聚氯乙烯气柜区单元"
  },
  {
    addDate: 1741854745488,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 8,
    level: "Ⅲ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "聚氯乙烯装置单元（含VCM储存）"
  },
  {
    addDate: 1741853461171,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 9,
    level: "Ⅲ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "EDC罐区单元"
  },
  {
    addDate: 1741852886493,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 10,
    level: "Ⅰ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "氯乙烯成品罐区单元"
  },
  {
    addDate: 1741852741095,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1772467200000,
    id: 11,
    level: "Ⅳ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "EDC中间罐区单元"
  },
  {
    addDate: 1741852790122,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1740931200000,
    id: 12,
    level: "Ⅱ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "氯乙烯中间罐区单元（EDC项目）"
  },
  {
    addDate: 1741852783544,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1772467200000,
    id: 13,
    level: "Ⅳ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "VCM装置单元"
  },
  {
    addDate: 1739327635622,
    company: {
      id: 1,
      name: "德州实华化工有限公司"
    },
    filingDate: 1735574400000,
    id: 14,
    level: "Ⅲ级",
    planDate: 1735488000000,
    sysUser: {
      id: 2,
      uname: "dzsh",
      ushow: "德州实华化工有限公司"
    },
    title: "过氧化氢主装置稀品和浓品工段单元"
  }
];

export default defineFakeRoute([
  {
    url: "/sft/hazard/mhs/list.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);
      const title = query.title || "";

      let filteredData = mockData;
      if (title) {
        filteredData = mockData.filter(item =>
          item.title.includes(title as string)
        );
      }

      const start = page * size;
      const end = start + size;
      const content = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
          number: page,
          size,
          empty: content.length === 0,
          first: page === 0,
          last: end >= filteredData.length
        }
      };
    }
  }
]);
