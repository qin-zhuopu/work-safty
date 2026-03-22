import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟数据
const mockData = [
  { code: "DZ", id: 6, name: "吊装一级模板", status: 1, type: 6 },
  { code: "DH", id: 9, name: "动火一级模板", status: 1, type: 1 },
  { code: "DH", id: 10, name: "动火二级模板", status: 1, type: 9 },
  { code: "DH", id: 11, name: "动火特级模板", status: 1, type: 10 },
  { code: "SX", id: 12, name: "受限空间模板", status: 1, type: 3 },
  { code: "GC", id: 13, name: "高处一级模板", status: 1, type: 7 },
  { code: "GC", id: 14, name: "高处二级模板", status: 1, type: 11 },
  { code: "GC", id: 15, name: "高处三级模板", status: 1, type: 12 },
  { code: "GC", id: 16, name: "高处四级模板", status: 1, type: 15 },
  { code: "DZ", id: 17, name: "吊装二、三级模板", status: 1, type: 16 },
  { code: "DL", id: 18, name: "断路作业模板", status: 1, type: 2 },
  { code: "MB", id: 19, name: "盲板抽堵模板", status: 1, type: 5 },
  { code: "DT", id: 20, name: "动土作业模板", status: 1, type: 4 },
  { code: "LD1", id: 21, name: "临电一级模板", status: 1, type: 6 },
  { code: "LD2", id: 22, name: "临电二级模板", status: 1, type: 13 },
  { code: "LD3", id: 23, name: "临电特级模板", status: 1, type: 14 },
  { code: "GCJ1", id: 24, name: "高处架设一级模板", status: 1, type: 17 },
  { code: "GCJ2", id: 25, name: "高处架设二级模板", status: 1, type: 18 },
  { code: "SBDD", id: 26, name: "设备断电模板", status: 1, type: 21 },
  { code: "SBSD", id: 27, name: "设备送电模板", status: 1, type: 22 },
  { code: "GYDD", id: 28, name: "高压断电模板", status: 1, type: 23 },
  { code: "GYSD", id: 29, name: "高压送电模板", status: 1, type: 24 }
];

export default defineFakeRoute([
  {
    url: "/sft/work/doc/tmpl/list1.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;
      const type = query.type;

      // 过滤数据
      let filteredData = mockData;
      if (type && type !== "-1") {
        filteredData = mockData.filter(item => item.type === Number(type));
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
          totalPages: Math.ceil(totalElements / size),
          number: page - 1,
          size,
          first: page === 1,
          last: end >= totalElements
        }
      };
    }
  }
]);
