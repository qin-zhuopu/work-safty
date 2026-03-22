import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/cont/manage/hmd/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 246,
              field: "淮安东信发管道工程有限公司",
              field1: "供应链管理部",
              field4: "提报",
              field5: "91320826MA25WPQ97H",
              field10:
                "第2条企业资质上传：建筑业企业资质证书类。第3条：授权委托书未盖公章及法人章；第4请上传建筑企业安全生产许可证。第5-7条质量、环境职业健康认证范围未体现施工类；第15未提供建筑施工企业主要负责人安全生产考核合格证书。未提供经公司HSE认证培训合格证书，第16项未提供建筑安装类项目经理证书（建造师注册证书），未提供经公司HSE认证培训合格证书；17项未提供建筑施工企业综合类专职安全生产管理人员建安C证或应急管理局颁发的安全生产管理人员证书，未提供经公司HSE认证培训合格证书；",
              addDate: 1770882993735,
              deleteFlag: 1,
              status: 1
            },
            {
              id: 245,
              field: "山东德建集团有限公司",
              field1: "设备动力部",
              field4: "提报",
              field5: "91371400167355412A",
              field10:
                "第1条：营业执照未更新年检记录；第2条：建筑业企业资质证书即将到期，需及时续期；第3条：安全生产许可证副本缺失。",
              addDate: 1770882993000,
              deleteFlag: 1,
              status: 1
            },
            {
              id: 244,
              field: "江苏华阳建设安装工程有限公司",
              field1: "生产技术部",
              field4: "审核",
              field5: "91320100123456789X",
              field10:
                "第5条：质量管理体系认证范围不包含安装工程；第8条：特种作业人员证书部分过期未更新。",
              addDate: 1770882992000,
              deleteFlag: 0,
              status: 1
            },
            {
              id: 243,
              field: "中化二建集团有限公司",
              field1: "安全环保部",
              field4: "提报",
              field5: "91140000123456789Y",
              field10:
                "第10条：近三年发生过一起安全生产事故，需提供事故调查报告及整改措施；第12条：HSE管理体系文件不完整。",
              addDate: 1770882991000,
              deleteFlag: 1,
              status: 1
            },
            {
              id: 242,
              field: "河北省安装工程有限公司",
              field1: "工程管理部",
              field4: "通过",
              field5: "91130000123456789Z",
              field10: "所有审查项目均已通过，资料齐全，符合入网要求。",
              addDate: 1770882990000,
              deleteFlag: 0,
              status: 0
            }
          ],
          totalElements: 5
        }
      };
    }
  }
]);
