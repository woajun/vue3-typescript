import SearchSetting from "@/components/search/SearchSetting";

const searchSetting: SearchSetting = {
  searchUrl: "/api/sample",
  conditions: [
    {
      kind: "codePopup",
      field: "dep",
      label: "부서",
      value: "502010",
      firstResultVisible: true,
      firstResultDefault: "운영본부 차량지원팀 일상파트",
    },
    {
      kind: "radio",
      field: "useFor",
      label: "사용구분",
      value: "all",
      options: [
        { description: "전체", value: "all" },
        { description: "사업용", value: "business" },
        { description: "사무용", value: "office" },
      ],
    },
    {
      kind: "codePopup",
      field: "code",
      label: "정수코드",
      value: "",
      firstResultVisible: true,
      firstResultDefault: "",
    },
    {
      kind: "date",
      field: "standDate",
      label: "기준일자",
      value: new Date(2017, 2, 31),
    },
    {
      kind: "radio",
      field: "findFor",
      label: "조회구분",
      value: "amount",
      options: [
        { description: "정수별", value: "amount" },
        { description: "물품별", value: "product" },
      ],
    },
  ],
};
export default searchSetting;
