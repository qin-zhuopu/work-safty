import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emergency/drill/list",
    method: "get",
    response: ({ query }: { query: { page: string; size: string } }) => {
      const page = parseInt(query.page || "1") - 1; // 前端从1开始，后端从0开始
      const size = parseInt(query.size || "10");

      const allData = [
        {
          id: 27,
          title: "乙炔泵跳停应急演练",
          content: "乙炔泵跳停应急演练",
          planTime: "2024-01",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 29,
          title: "合成压缩机跳停应急演练",
          content: "合成压缩机跳停应急演练",
          planTime: "2024-02",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 52,
          title: "单体储槽泄漏中毒窒息应急演练-合成",
          content: "单体储槽泄漏中毒窒息应急演练-合成",
          planTime: "2024-02",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 56,
          title: "液氯储槽出口管道事故应急预案演练",
          content:
            "德州实华化⼯有限公司液氯储槽出⼝管道泄漏，泄漏量较⼤扩散，模拟警戒疏散撤⼈、事故汇报、紧急倒料、上报公司调度事故应急处置程序。事故响应从⼯段、⻋间、企业逐步升级后，在公司应急指挥部指挥处置下，进⾏应急警戒疏散、⼯艺处置等过程。",
          planTime: "2024-03",
          remarks: "现场⻛向⻛速以 DCS ⻛向仪为准",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 53,
          title: "单体储槽泄漏中毒窒息应急演练-合成",
          content: "单体储槽泄漏中毒窒息应急演练-合成",
          planTime: "2024-03",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 31,
          title: "空压机跳停应急演练",
          content: "空压机跳停应急演练",
          planTime: "2024-04",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 54,
          title: "单体储槽泄漏中毒窒息应急演练-合成",
          content: "单体储槽泄漏中毒窒息应急演练-合成",
          planTime: "2024-06",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 33,
          title: "聚合冷库制冷系统故障应急演练",
          content: "聚合冷库制冷系统故障应急演练",
          planTime: "2024-06",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 35,
          title: "车辆伤害（电石铲车）现场处置方案",
          content: "车辆伤害（电石铲车）现场处置方案",
          planTime: "2024-06",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        },
        {
          id: 37,
          title: "乙炔四楼1号发生器小加料储斗着火应急演练",
          content: "乙炔四楼1号发生器小加料储斗着火应急演练",
          planTime: "2024-06",
          remarks: "聚氯乙烯车间",
          drillType: { id: 2, name: "实战演练" }
        }
      ];

      const totalElements = allData.length;
      const totalPages = Math.ceil(totalElements / size);
      const start = page * size;
      const end = start + size;
      const content = allData.slice(start, end);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages,
          number: page,
          size,
          first: page === 0,
          last: page >= totalPages - 1,
          empty: false,
          numberOfElements: content.length,
          pageable: {
            offset: start,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: { empty: false, sorted: true, unsorted: false }
          },
          sort: { empty: false, sorted: true, unsorted: false }
        }
      };
    }
  }
]);
