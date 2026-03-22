import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/emerresour/ep/list",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);
      const field = query.field || "";
      const field2 = query.field2 || "";
      const field3 = query.field3 || "";

      const allData = [
        {
          id: 38,
          field: "重大危险源专项预案",
          field1: "专项预案",
          field2: "公司级",
          field3: "未审核",
          bzUserName: "李付健",
          pzUserName: "赵凯",
          sysUserName: "兰俊兵",
          addDate: 1730948630710,
          file1: "ssc-dzsh/1/fbe75af19a0740518f4802016ab22b93.docx"
        },
        {
          id: 37,
          field: "生产安全事故综合预案",
          field1: "综合预案",
          field2: "公司级",
          field3: "已审核",
          bzUserName: "张三",
          pzUserName: "李四",
          sysUserName: "王五",
          addDate: 1730862230710,
          file1: "ssc-dzsh/1/abc123.pdf"
        },
        {
          id: 36,
          field: "液氯泄漏现场处置方案",
          field1: "现场处置方案",
          field2: "车间级",
          field3: "已审核",
          bzUserName: "赵六",
          pzUserName: "孙七",
          sysUserName: "周八",
          addDate: 1730775830710,
          file1: "ssc-dzsh/1/def456.doc"
        },
        {
          id: 35,
          field: "火灾爆炸事故专项预案",
          field1: "专项预案",
          field2: "公司级",
          field3: "驳回",
          bzUserName: "吴九",
          pzUserName: "郑十",
          sysUserName: "冯十一",
          addDate: 1730689430710,
          file1: "ssc-dzsh/1/ghi789.pdf"
        },
        {
          id: 34,
          field: "氯气泄漏专项预案",
          field1: "专项预案",
          field2: "处室级",
          field3: "已审核",
          bzUserName: "陈十二",
          pzUserName: "褚十三",
          sysUserName: "卫十四",
          addDate: 1730603030710,
          file1: "ssc-dzsh/1/jkl012.docx"
        },
        {
          id: 33,
          field: "特种设备事故专项预案",
          field1: "专项预案",
          field2: "车间级",
          field3: "未审核",
          bzUserName: "蒋十五",
          pzUserName: "沈十六",
          sysUserName: "韩十七",
          addDate: 1730516630710,
          file1: "ssc-dzsh/1/mno345.pdf"
        },
        {
          id: 32,
          field: "触电事故现场处置方案",
          field1: "现场处置方案",
          field2: "工段班组岗位级",
          field3: "已审核",
          bzUserName: "杨十八",
          pzUserName: "朱十九",
          sysUserName: "秦二十",
          addDate: 1730430230710,
          file1: "ssc-dzsh/1/pqr678.doc"
        },
        {
          id: 31,
          field: "环境突发事件专项预案",
          field1: "专项预案",
          field2: "公司级",
          field3: "已审核",
          bzUserName: "尤二十一",
          pzUserName: "许二十二",
          sysUserName: "何二十三",
          addDate: 1730343830710,
          file1: "ssc-dzsh/1/stu901.pdf"
        },
        {
          id: 30,
          field: "中毒窒息事故现场处置方案",
          field1: "现场处置方案",
          field2: "车间级",
          field3: "未审核",
          bzUserName: "吕二十四",
          pzUserName: "施二十五",
          sysUserName: "张二十六",
          addDate: 1730257430710,
          file1: "ssc-dzsh/1/vwx234.docx"
        },
        {
          id: 29,
          field: "极端天气专项预案",
          field1: "专项预案",
          field2: "处室级",
          field3: "已审核",
          bzUserName: "孔二十七",
          pzUserName: "曹二十八",
          sysUserName: "严二十九",
          addDate: 1730171030710,
          file1: "ssc-dzsh/1/yza567.pdf"
        },
        {
          id: 28,
          field: "化学品泄漏现场处置方案",
          field1: "现场处置方案",
          field2: "工段班组岗位级",
          field3: "驳回",
          bzUserName: "华三十",
          pzUserName: "金三十一",
          sysUserName: "魏三十二",
          addDate: 1730084630710,
          file1: "ssc-dzsh/1/bcd890.doc"
        },
        {
          id: 27,
          field: "压力容器爆炸专项预案",
          field1: "专项预案",
          field2: "车间级",
          field3: "已审核",
          bzUserName: "陶三十三",
          pzUserName: "姜三十四",
          sysUserName: "戚三十五",
          addDate: 1729998230710,
          file1: "ssc-dzsh/1/efg123.pdf"
        },
        {
          id: 26,
          field: "高处坠落现场处置方案",
          field1: "现场处置方案",
          field2: "工段班组岗位级",
          field3: "未审核",
          bzUserName: "谢三十六",
          pzUserName: "邹三十七",
          sysUserName: "喻三十八",
          addDate: 1729911830710,
          file1: "ssc-dzsh/1/hij456.docx"
        },
        {
          id: 25,
          field: "机械伤害现场处置方案",
          field1: "现场处置方案",
          field2: "车间级",
          field3: "已审核",
          bzUserName: "柏三十九",
          pzUserName: "窦四十",
          sysUserName: "云四十一",
          addDate: 1729825430710,
          file1: "ssc-dzsh/1/klm789.pdf"
        }
      ];

      let filteredData = allData;
      if (field) {
        filteredData = filteredData.filter(item => item.field.includes(field));
      }
      if (field2) {
        filteredData = filteredData.filter(item => item.field2 === field2);
      }
      if (field3) {
        filteredData = filteredData.filter(item => item.field3 === field3);
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
          first: page === 0,
          last: end >= filteredData.length,
          numberOfElements: content.length,
          empty: content.length === 0
        }
      };
    }
  },
  {
    url: "/sft/emerresour/ep/del/:id",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  },
  {
    url: "/sft/emerresour/ep/delAll",
    method: "get",
    response: () => {
      return {
        success: true,
        message: "删除成功"
      };
    }
  }
]);
