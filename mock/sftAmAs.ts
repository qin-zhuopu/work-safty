import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/am/as/list.json",
    method: "get",
    response: ({ query }: { query: Record<string, string> }) => {
      const page = parseInt(query.page || "1");
      const size = parseInt(query.size || "10");
      const field = query.field || "";
      const field1 = query.field1 || "";

      const allData = [
        {
          id: 11,
          name: "光明院11.21爆炸事故",
          field: "爆炸事故",
          field1: "ssc-dzsh/1/54bb650f0a96484e98f7a00fb7f7e873.pdf",
          field2: 1,
          plan: { name: "爆炸事故预防培训" },
          addDate: 1718605949981,
          remarks:
            "2020 年 11 月 21 日 15 点 17 分，光明院研发产业基地一车间附楼一氧化氮研制装置收集用的一个 8L 铝合金气瓶发生爆炸，造成一人当场死亡，另有1人重伤被立即送至瓦房店中心医院救治，抢救无效死亡。事故装置用于纯度99.9%的一氧化氮研制项目，事故发生时，正在按项目进度要求进行一氧化氮的研制实验工作。"
        },
        {
          id: 12,
          name: "某化工厂泄漏事故",
          field: "泄漏事故",
          field1: "ssc-dzsh/2/report.pdf,ssc-dzsh/2/photo.jpg",
          field2: 5,
          plan: { name: "化学品泄漏应急处置培训" },
          addDate: 1718692348000,
          remarks: "液氯储罐发生泄漏，造成周边环境污染"
        },
        {
          id: 13,
          name: "设备火灾事故",
          field: "火灾事故",
          field1: "ssc-dzsh/3/fire.docx",
          field2: 3,
          plan: null,
          addDate: 1718778749000,
          remarks: "反应釜过热引发火灾"
        },
        {
          id: 14,
          name: "高处坠落事故",
          field: "坠落事故",
          field1: "ssc-dzsh/4/fall.pdf",
          field2: 2,
          plan: { name: "高处作业安全培训" },
          addDate: 1718865150000,
          remarks: "维修作业时未系安全带导致坠落"
        },
        {
          id: 15,
          name: "中毒窒息事故",
          field: "中毒事故",
          field1: "ssc-dzsh/5/poison.xlsx",
          field2: 8,
          plan: { name: "受限空间作业安全培训" },
          addDate: 1718951551000,
          remarks: "受限空间作业导致人员中毒"
        },
        {
          id: 16,
          name: "触电事故",
          field: "触电事故",
          field1: "",
          field2: 0,
          plan: null,
          addDate: 1719037952000,
          remarks: "设备漏电导致操作人员触电"
        },
        {
          id: 17,
          name: "机械伤害事故",
          field: "机械伤害",
          field1: "ssc-dzsh/7/mechanic.pdf,ssc-dzsh/7/report.docx",
          field2: 4,
          plan: { name: "机械设备操作安全培训" },
          addDate: 1719124353000,
          remarks: "输送皮带卷入事故"
        },
        {
          id: 18,
          name: "容器爆炸事故",
          field: "爆炸事故",
          field1: "ssc-dzsh/8/vessel.pdf",
          field2: 6,
          plan: null,
          addDate: 1719210754000,
          remarks: "压力容器超压爆炸"
        },
        {
          id: 19,
          name: "灼烫事故",
          field: "灼烫事故",
          field1: "ssc-dzsh/9/burn.jpg",
          field2: 1,
          plan: { name: "高温作业安全培训" },
          addDate: 1719297155000,
          remarks: "高温蒸汽管道破裂导致灼烫"
        },
        {
          id: 20,
          name: "坍塌事故",
          field: "坍塌事故",
          field1: "ssc-dzsh/10/collapse.pdf",
          field2: 3,
          plan: null,
          addDate: 1719383556000,
          remarks: "脚手架坍塌导致人员伤亡"
        },
        {
          id: 21,
          name: "淹溺事故",
          field: "淹溺事故",
          field1: "ssc-dzsh/11/drown.docx",
          field2: 2,
          plan: { name: "水上作业安全培训" },
          addDate: 1719469957000,
          remarks: "污水池清理作业时淹溺"
        },
        {
          id: 22,
          name: "物体打击事故",
          field: "物体打击",
          field1: "",
          field2: 0,
          plan: null,
          addDate: 1719556358000,
          remarks: "高空落物导致人员受伤"
        }
      ];

      // Filter data
      let filteredData = allData;
      if (field) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(field.toLowerCase())
        );
      }
      if (field1) {
        filteredData = filteredData.filter(item =>
          item.field.toLowerCase().includes(field1.toLowerCase())
        );
      }

      const totalElements = filteredData.length;
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const content = filteredData.slice(startIndex, endIndex);

      return {
        success: true,
        message: "查询成功",
        t: {
          totalElements,
          content
        }
      };
    }
  }
]);
