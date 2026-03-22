import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/danger/law/list.json",
    method: "get",
    response: ({ query }) => {
      const { page = "0", size = "10", field = "", status = "" } = query;

      // 模拟数据
      const mockData = [
        {
          id: 1,
          level: "地方",
          type: "部门规章",
          name: "山东省化工和危险化学品企业高危场所周边施工安全风险管控措施清单(试行)",
          institution: "山东省应急管理厅",
          instDate: "2024-12-30",
          effectDate: "2025-02-01",
          status: "已发布",
          field1: "ssc-dzsh/1/b03a06c87e514be4a24ac5e4c83cd5fe.pdf",
          addDate: "2025-11-02 10:30"
        },
        {
          id: 2,
          level: "国家",
          type: "法律",
          name: "中华人民共和国水法",
          institution: "全国人民代表大会常务委员",
          instDate: "2016-07-02",
          effectDate: "2016-09-01",
          status: "已发布",
          field1: "ssc-dzsh/1/d99f3dbe6841408ebbe0bc52a3be9d58.pdf",
          addDate: "2025-11-02 10:30"
        },
        {
          id: 3,
          level: "国家",
          type: "法律",
          name: "中华人民共和国大气污染防治法",
          institution: "全国人民代表大会常务委员会",
          instDate: "2018-10-26",
          effectDate: "2018-10-26",
          status: "已发布",
          field1: "ssc-dzsh/1/805b713cd6e74863afb4d8ae7cd4f3eb.pdf",
          addDate: "2025-11-02 10:32"
        },
        {
          id: 4,
          level: "地方",
          type: "规范性文件",
          name: "山东省安全生产条例",
          institution: "山东省人民代表大会常务委员会",
          instDate: "2021-12-03",
          effectDate: "2022-03-01",
          status: "已发布",
          field1: "",
          addDate: "2025-11-02 11:00"
        },
        {
          id: 5,
          level: "国家",
          type: "行政法规",
          name: "危险化学品安全管理条例",
          institution: "国务院",
          instDate: "2013-12-07",
          effectDate: "2013-12-07",
          status: "已发布",
          field1: "ssc-dzsh/1/chem safety.pdf",
          addDate: "2025-11-02 11:15"
        },
        {
          id: 6,
          level: "国家",
          type: "部门规章",
          name: "危险化学品重大危险源监督管理暂行规定",
          institution: "国家安全生产监督管理总局",
          instDate: "2015-05-27",
          effectDate: "2015-07-01",
          status: "即将实施",
          field1: "",
          addDate: "2025-11-02 12:00"
        },
        {
          id: 7,
          level: "地方",
          type: "规范性文件",
          name: "山东省危险化学品安全管理办法",
          institution: "山东省人民政府",
          instDate: "2017-04-14",
          effectDate: "2017-06-01",
          status: "已作废",
          field1: "ssc-dzsh/1/safe mgmt.pdf",
          addDate: "2025-11-02 12:30"
        },
        {
          id: 8,
          level: "国家",
          type: "法律",
          name: "中华人民共和国安全生产法",
          institution: "全国人民代表大会常务委员会",
          instDate: "2021-06-10",
          effectDate: "2021-09-01",
          status: "已发布",
          field1: "ssc-dzsh/1/safe prod law.pdf",
          addDate: "2025-11-02 13:00"
        }
      ];

      // 过滤数据
      let filteredData = mockData;
      if (field) {
        filteredData = filteredData.filter(item =>
          item.name.includes(field as string)
        );
      }
      if (status) {
        filteredData = filteredData.filter(item => item.status === status);
      }

      // 分页
      const pageNum = parseInt(page as string);
      const pageSize = parseInt(size as string);
      const start = pageNum * pageSize;
      const end = start + pageSize;
      const paginatedData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: paginatedData,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / pageSize),
          size: pageSize,
          number: pageNum,
          first: pageNum === 0,
          last: end >= filteredData.length
        }
      };
    }
  }
]);
