import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/risk/special/list.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: {
          content: [
            {
              id: 4,
              taskName: "2025危险化学品危险源企业安全专项检查督导",
              taskStartTime: 1743436800000,
              taskEndTime: 1764432000000,
              taskTypeName: "危险化学品重大危险源企业安全专项检查督导",
              taskContent: "危险化学品重大危险源企业2025年专项督查核查",
              deleted: "0",
              specialUuid: "a8de03f0-4c3e-43fe-a139-0e4ed34edd35",
              createDate: 1741290934000,
              updateDate: 1741294772000,
              receiveDate: 1743573819186,
              company: {
                id: 1,
                name: "德州实华化工有限公司"
              }
            },
            {
              id: 3,
              taskName: "2025年氯气生产企业专家指导服务",
              taskStartTime: 1739721600000,
              taskEndTime: 1759161600000,
              taskTypeName: "高危细分领域安全风险专项治理",
              taskContent: "2025年高危细分领域安全风险专项治理",
              deleted: "0",
              specialUuid: "8cf292eb-a9e3-4638-b117-f13c750e6683",
              createDate: 1741290778000,
              updateDate: 1741290794000,
              receiveDate: 1743573819186,
              company: {
                id: 1,
                name: "德州实华化工有限公司"
              }
            },
            {
              id: 5,
              taskName: "2025年过氧化氢专家指导服务",
              taskStartTime: 1739721600000,
              taskEndTime: 1761840000000,
              taskTypeName: "高危细分领域安全风险专项治理",
              taskContent: "2025年高危细分领域安全风险专项治理",
              deleted: "0",
              specialUuid: "aeb10ba6-040b-49af-8978-982bb52555a5",
              createDate: 1741290334000,
              updateDate: 1741290458000,
              receiveDate: 1743573819186,
              company: {
                id: 1,
                name: "德州实华化工有限公司"
              }
            },
            {
              id: 2,
              taskName: "2024危险化学品危险源企业安全专项检查督导",
              taskStartTime: 1711900800000,
              taskEndTime: 1732896000000,
              taskTypeName: "危险化学品重大危险源企业安全专项检查督导",
              taskContent: "危险化学品重大危险源企业2024年专项督查核查",
              deleted: "0",
              specialUuid: "d95a3933-ad2e-4586-bd7d-21056306e781",
              createDate: 1714260827000,
              updateDate: 1714260827000,
              receiveDate: 1716975323604,
              company: {
                id: 1,
                name: "德州实华化工有限公司"
              }
            },
            {
              id: 6,
              taskName: "2024年氯碱企业安全风险专项治理",
              taskStartTime: 1711900800000,
              taskEndTime: 1732896000000,
              taskTypeName: "高危细分领域安全风险专项治理",
              taskContent: "2024年高危细分领域安全风险专项治理",
              deleted: "1",
              specialUuid: "e95a3933-ad2e-4586-bd7d-21056306e782",
              createDate: 1714260827000,
              updateDate: 1714260827000,
              receiveDate: 1716975323604,
              company: {
                id: 1,
                name: "德州实华化工有限公司"
              }
            }
          ],
          totalElements: 5,
          totalPages: 1,
          number: 0,
          size: 10
        }
      };
    }
  }
]);
