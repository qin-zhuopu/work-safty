import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/train/plantype/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 783,
              name: "双重预防专项培训",
              addDate: 1773886508203
            },
            {
              id: 782,
              name: "两重点一重大专项培训",
              addDate: 1773886428000
            },
            {
              id: 781,
              name: "泰安分公司制盐工段三级培训教育（班组）",
              addDate: 1773886345000
            },
            {
              id: 780,
              name: "泰安分公司制盐工段三级培训教育（车间）",
              addDate: 1773886262000
            },
            {
              id: 779,
              name: "排污许可管理要求的试题",
              addDate: 1773886180000
            },
            {
              id: 778,
              name: "受限空间作业人员培训",
              addDate: 1773886097000
            },
            {
              id: 777,
              name: "安全管理人员培训",
              addDate: 1773886014000
            },
            {
              id: 776,
              name: "新员工入职培训",
              addDate: 1773885931000
            },
            {
              id: 775,
              name: "特种作业人员培训",
              addDate: 1773885848000
            },
            {
              id: 774,
              name: "全员安全培训",
              addDate: 1773885765000
            }
          ],
          totalElements: 10
        }
      };
    }
  }
]);
