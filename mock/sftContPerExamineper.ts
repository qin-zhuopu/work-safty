import { defineFakeRoute } from "vite-plugin-fake-server/client";

interface ContPerItem {
  id: string;
  field: string; // 姓名
  field1: string; // 身份证号
  field2: string; // 照片URL
  field3: number; // 证件有效期开始
  field4: string; // 体检报告PDF
  field5: number; // 体检有效期开始
  field6: string; // 操作证PDF
  field7: number; // 操作证有效期开始
  field8: string; // 特种作业证PDF
  field14: string; // 培训记录PDF
  cm: string; // 承包商名称
  examine: string; // 审核节点
  sex: string; // 性别
  birthday: string; // 生日
  status: number; // 状态 (0:待审批, 1:通过, 2:驳回)
  type: string; // 类型
  black?: number; // 黑名单状态 (null/undefined:正常, 0:待审核, 2:已拉黑)
}

const mockData: ContPerItem[] = [
  {
    id: "2164",
    field: "刘建",
    field1: "131126198707090931",
    field2: "ssc-dzsh/1/cc8312c3caaf47708f7b57b1107cc160.jpg",
    field3: 1830268800000,
    field4: "ssc-dzsh/1/543a240997be4611b5b6357aa00a9932.pdf",
    field5: 1784131200000,
    field6: "ssc-dzsh/1/780de16340d747fa9861fe35cb106e69.pdf",
    field7: 1784822400000,
    field8: "ssc-dzsh/1/f7f212d13e414cfc8bab9e2e2336af9a.pdf",
    field14: "ssc-dzsh/1/training.pdf",
    cm: "衡水雁腾建筑工程有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1987-07-09",
    status: 0,
    type: "1"
  },
  {
    id: "2187",
    field: "韩机智",
    field1: "410728197609072577",
    field2: "ssc-dzsh/1/4f81234597d441bf9b29c9b604cc43df.jpg",
    field3: 1798646400000,
    field4: "ssc-dzsh/1/a7a754dcdd694418b5f1a40393d10f73.pdf",
    field5: 1762272000000,
    field6: "ssc-dzsh/1/f227bf06f0484c47a4554390f0a2ad93.pdf",
    field7: 1785686400000,
    field8: "ssc-dzsh/1/605c9806d3ef4259a40d6b4fc8dc5f61.pdf",
    field14: "ssc-dzsh/1/training2.pdf",
    cm: "中科信达建工集团有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1976-09-07",
    status: 0,
    type: "1"
  },
  {
    id: "2208",
    field: "王连帮",
    field1: "131126197510202130",
    field2: "ssc-dzsh/1/01a1636ffa90489381619731685ff91b.pdf",
    field3: 1755532800000,
    field4: "ssc-dzsh/1/c3c930cfa67343c1bf75d71c77dc18a8.pdf",
    field5: 1760630400000,
    field6: "ssc-dzsh/1/a0a569dbad2d47d197ac7ec3d4172c87.pdf",
    field7: 1740412800000,
    field8: "ssc-dzsh/1/0fb97b3f2e134cf8a3a8069b06da06f6.pdf",
    field14: "ssc-dzsh/1/training3.pdf",
    cm: "德州市能达装卸有限公司运河第二分公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1975-10-20",
    status: 0,
    type: "1"
  },
  {
    id: "2338",
    field: "段军营",
    field1: "410728198203073558",
    field2: "ssc-dzsh/1/5310cb9426ac4c989cc3019e5dbb52b3.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/3889134ce7ec434f8b35801cd24be505.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/23c417ffae1446b69d9b7048df6ad15c.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/d27e8bdd1b174db0abcc8c07ecc91128.pdf",
    field14: "ssc-dzsh/1/training4.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1982-03-07",
    status: 0,
    type: "1"
  },
  {
    id: "2339",
    field: "李涛",
    field1: "410728198002063054",
    field2: "ssc-dzsh/1/f1483e3cf8ab452c8261d4563f4b85ca.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/6f156b4bf827428aba62fb968f7264ee.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/ccd1075d1dd340ea841dfe278d996a33.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/85200f9f72d941a49bfb6f5bf8b44dc3.pdf",
    field14: "ssc-dzsh/1/training5.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1980-02-06",
    status: 0,
    type: "1"
  },
  {
    id: "2340",
    field: "陈梦熙",
    field1: "41072819900520251X",
    field2: "ssc-dzsh/1/104630bc31d9478f9af8e677872bdf2a.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/f00224cd7caf4cf68364ded74d2a4f44.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/570901ee918d4e27a6299225615804f5.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/e95b03bdac134e44b52cb36c7edc7e43.pdf",
    field14: "ssc-dzsh/1/training6.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1990-05-20",
    status: 0,
    type: "1"
  },
  {
    id: "2341",
    field: "付少华",
    field1: "410728199901264014",
    field2: "ssc-dzsh/1/f7d00a0eff8a4c42bcb04e0f19c4f92a.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/cce2ec24afa54fe5babc80d2eda8c497.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/01d44cfb19bd494fba500f73c0b0cd58.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/379bb88efc934a688ec79b472316d473.pdf",
    field14: "ssc-dzsh/1/training7.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1999-01-26",
    status: 0,
    type: "1"
  },
  {
    id: "2342",
    field: "高朋",
    field1: "410728198505111011",
    field2: "ssc-dzsh/1/553bb172cf6e4d62a0964cd5588b3403.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/eb297502840a4fcca5c739f95c84dd4f.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/38297eec6a644c4594b61072063628a6.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/5613d3c97bf54f4a8646a9a31c57cbeb.pdf",
    field14: "ssc-dzsh/1/training8.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1985-05-11",
    status: 0,
    type: "1"
  },
  {
    id: "2343",
    field: "韩超达",
    field1: "410728200403199796",
    field2: "ssc-dzsh/1/ea09d3904c554220afcd77726c8fe8f5.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/9a6e91b9f8c743a3902717879e144d99.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/e9ef5e136da24b6d9731c137a0df9942.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/d2f2d8c537d74f5ca8d71127377c8c2e.pdf",
    field14: "ssc-dzsh/1/training9.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "2004-03-19",
    status: 0,
    type: "1"
  },
  {
    id: "2344",
    field: "张鹏飞",
    field1: "410526198808207017",
    field2: "ssc-dzsh/1/281265958d80497d90e100010da5145b.pdf",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/7979b726f1af47dfbb831b9f9281bc95.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/7917c3d09a684452acde85f2188e9a7d.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/81a07da1d73844c784e1af004f22d127.pdf",
    field14: "ssc-dzsh/1/training10.pdf",
    cm: "河南鼎苑建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1988-08-20",
    status: 0,
    type: "1"
  },
  // 添加一些其他状态的数据
  {
    id: "2350",
    field: "赵明",
    field1: "371425199005154312",
    field2: "ssc-dzsh/1/photo1.jpg",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/body1.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/op1.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/special1.pdf",
    field14: "ssc-dzsh/1/tr11.pdf",
    cm: "山东融盛建设有限公司",
    examine: "通过",
    sex: "男",
    birthday: "1990-05-15",
    status: 1,
    type: "1"
  },
  {
    id: "2351",
    field: "孙丽",
    field1: "371425199208123421",
    field2: "ssc-dzsh/1/photo2.jpg",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/body2.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/op2.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/special2.pdf",
    field14: "ssc-dzsh/1/tr12.pdf",
    cm: "山东安然建设工程有限公司",
    examine: "培训中",
    sex: "女",
    birthday: "1992-08-12",
    status: 1,
    type: "1"
  },
  {
    id: "2352",
    field: "周强",
    field1: "371425198807189654",
    field2: "ssc-dzsh/1/photo3.jpg",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/body3.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/op3.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/special3.pdf",
    field14: "ssc-dzsh/1/tr13.pdf",
    cm: "德州汇邦机电设备安装工程有限公司",
    examine: "安全审批",
    sex: "男",
    birthday: "1988-07-18",
    status: 2,
    type: "1"
  },
  {
    id: "2353",
    field: "吴海",
    field1: "371425199511123456",
    field2: "ssc-dzsh/1/photo4.jpg",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/body4.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/op4.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/special4.pdf",
    field14: "ssc-dzsh/1/tr14.pdf",
    cm: "中建八局第一建设有限公司",
    examine: "采购办专工",
    sex: "男",
    birthday: "1995-11-12",
    status: 0,
    type: "1",
    black: 0
  },
  {
    id: "2354",
    field: "郑平",
    field1: "371425199003154378",
    field2: "ssc-dzsh/1/photo5.jpg",
    field3: 1763136000000,
    field4: "ssc-dzsh/1/body5.pdf",
    field5: 1764432000000,
    field6: "ssc-dzsh/1/op5.pdf",
    field7: 1767110400000,
    field8: "ssc-dzsh/1/special5.pdf",
    field14: "ssc-dzsh/1/tr15.pdf",
    cm: "中国化学工程第三建设有限公司",
    examine: "部门审批",
    sex: "男",
    birthday: "1990-03-15",
    status: 0,
    type: "1",
    black: 2
  }
];

export default defineFakeRoute([
  {
    url: "/sft/cont/per/examiners.json",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page) || 0;
      const size = Number(query.size) || 10;
      const cont = query.cont || "";
      const field = query.field || "";
      const examine = query.examine || "";

      // 过滤数据
      const filteredData = mockData.filter(item => {
        if (cont && !item.cm.includes(cont)) return false;
        if (field && !item.field.includes(field)) return false;
        if (examine && !item.examine.includes(examine)) return false;
        return true;
      });

      const totalElements = filteredData.length;
      const startIndex = page * size;
      const content = filteredData.slice(startIndex, startIndex + size);

      return {
        success: true,
        t: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / size),
          size,
          number: page,
          first: page === 0,
          last: startIndex + size >= totalElements,
          empty: content.length === 0,
          pageable: {
            offset: startIndex,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: { empty: true, sorted: false, unsorted: true },
            unpaged: false
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
    }
  }
]);
