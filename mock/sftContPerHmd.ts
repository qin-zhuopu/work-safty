import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/per/hmd/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 2400,
              field: "管金峰",
              field1: "372431197304278233",
              field10:
                "2025 年 11 月 27日18点左右，仓储物流办监护人施工现场监护时，发现贵公司施工人员管金峰在登高车移动过程中未系挂安全带，被监护人及时发现并制止。该行为违反了中化集团保命规则，鉴于以上，我公司现要求：将该员工清除出厂加入黑名单",
              field10Date: 1767140072011,
              cm: {
                field: "山东高速德建集团有限公司"
              }
            },
            {
              id: 1946,
              field: "王建强",
              field1: "37240119731020411X",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788422,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1945,
              field: "尹国强",
              field1: "371402199106037013",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788419,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1944,
              field: "张德明",
              field1: "372401197305154512",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788416,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1943,
              field: "李刚",
              field1: "371402198712054517",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788413,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1942,
              field: "王志强",
              field1: "372401197908106318",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788410,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1941,
              field: "刘建国",
              field1: "371402198503227019",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788407,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1940,
              field: "赵永刚",
              field1: "372401197602019521",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788404,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1939,
              field: "孙建军",
              field1: "371402198810123722",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788401,
              cm: {
                field: "山东融盛建设有限公司"
              }
            },
            {
              id: 1938,
              field: "周德海",
              field1: "372401197112154823",
              field10: "承包商进入黑名单：4月30日承包商队伍施工时违反保命规则",
              field10Date: 1767671788398,
              cm: {
                field: "山东融盛建设有限公司"
              }
            }
          ],
          totalElements: 160
        }
      };
    }
  },
  {
    url: "/sft/cont/per/remove/:id",
    method: "get",
    response: (_params: { params: { id: string } }) => {
      return {
        success: true,
        message: "移出成功"
      };
    }
  }
]);
