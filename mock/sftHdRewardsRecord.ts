import { defineFakeRoute } from "vite-plugin-fake-server/client";

function generateResponse(query: Record<string, string>) {
  const page = parseInt(query.page || "1");
  const size = parseInt(query.size || "10");
  const hdName = query.hdName || "";
  const sysUserName = query.sysUserName || "";

  const allData = [
    {
      content: '"红丝带"奖励',
      filledDate: 1681198600603,
      filledName: "李辉",
      hiddenDanger: {
        id: 1,
        name: "液氯贮槽罐区单元液氯泄漏隐患"
      },
      sysUserName: "张三",
      type: "奖励",
      opinion: "及时发现隐患，给予奖励"
    },
    {
      content: "安全检查优秀奖励",
      filledDate: 1681200000000,
      filledName: "王芳",
      hiddenDanger: {
        id: 2,
        name: "氯乙烯聚合单元管道隐患"
      },
      sysUserName: "李四",
      type: "奖励",
      opinion: "安全工作表现突出"
    },
    {
      content: "违规操作处罚",
      filledDate: 1681205000000,
      filledName: "赵强",
      hiddenDanger: {
        id: 3,
        name: "聚氯乙烯气柜区单元"
      },
      sysUserName: "王五",
      type: "处罚",
      opinion: "未按规定佩戴防护用品"
    },
    {
      content: "隐患整改及时奖励",
      filledDate: 1681210000000,
      filledName: "孙丽",
      hiddenDanger: {
        id: 4,
        name: "氯乙烯贮槽罐区单元"
      },
      sysUserName: "赵六",
      type: "奖励",
      opinion: "整改及时彻底"
    },
    {
      content: "安全培训优秀奖励",
      filledDate: 1681215000000,
      filledName: "周明",
      hiddenDanger: {
        id: 5,
        name: "电石料仓和罩棚单元"
      },
      sysUserName: "孙七",
      type: "奖励",
      opinion: "培训成绩优异"
    },
    {
      content: "漏检处罚",
      filledDate: 1681220000000,
      filledName: "吴华",
      hiddenDanger: {
        id: 6,
        name: "产品罐区单元"
      },
      sysUserName: "周八",
      type: "处罚",
      opinion: "未按规定巡检"
    },
    {
      content: "应急处置得当奖励",
      filledDate: 1681225000000,
      filledName: "郑平",
      hiddenDanger: {
        id: 7,
        name: "EDC罐区单元"
      },
      sysUserName: "吴九",
      type: "奖励",
      opinion: "应急处理及时有效"
    },
    {
      content: "安全建议采纳奖励",
      filledDate: 1681230000000,
      filledName: "冯伟",
      hiddenDanger: {
        id: 8,
        name: "VCM装置单元"
      },
      sysUserName: "郑十",
      type: "奖励",
      opinion: "提出有效安全建议"
    },
    {
      content: "违章作业处罚",
      filledDate: 1681235000000,
      filledName: "陈静",
      hiddenDanger: {
        id: 9,
        name: "聚氯乙烯装置单元"
      },
      sysUserName: "冯十一",
      type: "处罚",
      opinion: "违章指挥作业"
    },
    {
      content: "年度安全标兵奖励",
      filledDate: 1681240000000,
      filledName: "楚飞",
      hiddenDanger: {
        id: 10,
        name: "氯乙烯成品罐区单元"
      },
      sysUserName: "陈十二",
      type: "奖励",
      opinion: "年度安全工作表现优秀"
    },
    {
      content: "隐患上报及时奖励",
      filledDate: 1681245000000,
      filledName: "卫强",
      hiddenDanger: {
        id: 11,
        name: "氯乙烯中间罐区单元"
      },
      sysUserName: "楚十三",
      type: "奖励",
      opinion: "及时发现并上报隐患"
    },
    {
      content: "未持证上岗处罚",
      filledDate: 1681250000000,
      filledName: "蒋敏",
      hiddenDanger: {
        id: 12,
        name: "EDC中间罐区单元"
      },
      sysUserName: "卫十四",
      type: "处罚",
      opinion: "特种作业未持证上岗"
    },
    {
      content: "安全创新奖励",
      filledDate: 1681255000000,
      filledName: "沈磊",
      hiddenDanger: {
        id: 13,
        name: "过氧化氢主装置稀品工段"
      },
      sysUserName: "蒋十五",
      type: "奖励",
      opinion: "安全技术创新"
    },
    {
      content: "巡检不到位处罚",
      filledDate: 1681260000000,
      filledName: "韩勇",
      hiddenDanger: {
        id: 14,
        name: "过氧化氢主装置浓品工段"
      },
      sysUserName: "沈十六",
      type: "处罚",
      opinion: "巡检记录不完整"
    },
    {
      content: "应急救援奖励",
      filledDate: 1681265000000,
      filledName: "杨秀",
      hiddenDanger: {
        id: 15,
        name: "液氯贮槽罐区单元"
      },
      sysUserName: "韩十七",
      type: "奖励",
      opinion: "积极参与应急救援"
    }
  ];

  // 过滤数据
  const filteredData = allData.filter(item => {
    const matchHdName = !hdName || item.hiddenDanger?.name.includes(hdName);
    const matchUserName =
      !sysUserName || item.sysUserName.includes(sysUserName);
    return matchHdName && matchUserName;
  });

  const total = filteredData.length;
  const start = (page - 1) * size;
  const end = start + size;
  const content = filteredData.slice(start, end);

  return {
    success: true,
    t: {
      content,
      totalElements: total,
      totalPages: Math.ceil(total / size)
    }
  };
}

export default defineFakeRoute([
  {
    url: "/sft/hd/rewards/all.json",
    method: "get",
    response: ({ query }: { query: Record<string, string> }) => {
      return generateResponse(query);
    }
  },
  {
    url: "/sft/hd/rewards/all",
    method: "get",
    response: ({ query }: { query: Record<string, string> }) => {
      return generateResponse(query);
    }
  }
]);
