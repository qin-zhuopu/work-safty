import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/train/pc/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            creater: "王占彪",
            endTime: 1774886400000,
            exam: 0,
            field1Str: "日常教育",
            field3: "刘鑫",
            fieldStr: "培训+考核",
            id: 883,
            learn: 0,
            name: "双重预防专项培训",
            planType: "双重预防专项培训",
            score: 0.0,
            startTime: 1773849600000,
            status: "未完成",
            sysDeptName: "HSE管理部"
          },
          {
            creater: "刘晓颖",
            endTime: 1774800000000,
            exam: 0,
            field1Str: "日常教育",
            field3: "高嘉泽",
            fieldStr: "培训+考核",
            id: 882,
            learn: 0,
            name: "两重点一重大专项培训",
            planType: "两重点一重大专项培训",
            score: 0.0,
            startTime: 1773763200000,
            status: "未完成",
            sysDeptName: "HSE管理部"
          },
          {
            creater: "德州实华化工有限公司",
            endTime: 1774454400000,
            exam: 1,
            field1Str: "日常教育",
            field3: "刘晓颖",
            fieldStr: "培训+考核",
            id: 878,
            learn: 1,
            name: "3月安全月警示教育视频",
            planType: "3月安全月警示教育视频",
            score: 100.0,
            startTime: 1773590400000,
            status: "已完成",
            sysDeptName: "德州实华化工有限公司"
          },
          {
            creater: "刘晓颖",
            endTime: 1774281600000,
            exam: 1,
            field1Str: "日常教育",
            field3: "刘晓颖",
            fieldStr: "培训+考核",
            id: 867,
            learn: 1,
            name: "3月警示教育学习",
            planType: "3月警示教育",
            score: 100.0,
            startTime: 1772985600000,
            status: "已完成",
            sysDeptName: "HSE管理部"
          },
          {
            creater: "德州实华化工有限公司",
            endTime: 1774886400000,
            exam: 1,
            field1Str: "日常教育",
            field3: "庄洪瑞",
            fieldStr: "培训+考核",
            id: 864,
            learn: 1,
            name: "危险化学品企业特殊作业管理GB-30871",
            planType: "危险化学品企业特殊作业管理GB-30871",
            score: 100.0,
            startTime: 1772208000000,
            status: "已完成",
            sysDeptName: "HSE管理部"
          },
          {
            creater: "白海斌",
            endTime: 1774022400000,
            exam: 1,
            field1Str: "日常教育",
            field3: "田红振",
            fieldStr: "培训+考核",
            id: 861,
            learn: 1,
            name: "安全用电教育培训",
            planType: "安全用电教育培训",
            score: 100.0,
            startTime: 1771603200000,
            status: "已完成",
            sysDeptName: "电气工段"
          },
          {
            creater: "王占彪",
            endTime: 1773504000000,
            exam: 1,
            field1Str: "日常教育",
            field3: "赵娟",
            fieldStr: "培训+考核",
            id: 856,
            learn: 1,
            name: "职业健康管理制度和操作规程培训",
            planType: "职业健康管理制度和操作规程培训",
            score: 100.0,
            startTime: 1771948800000,
            status: "已完成",
            sysDeptName: "HSE管理部"
          },
          {
            creater: "德州实华化工有限公司",
            endTime: 1772899200000,
            exam: 1,
            field1Str: "日常教育",
            field3: "李宝瑞",
            fieldStr: "培训+考核",
            id: 854,
            learn: 1,
            name: "2026年开工第一课培训",
            planType: "2026年开工第一课",
            score: 80.0,
            startTime: 1771862400000,
            status: "已完成",
            sysDeptName: "德州实华化工有限公司"
          }
        ]
      };
    }
  }
]);
