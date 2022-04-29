import { SearchSetting } from "@/components/search/Conditions";

const searchSetting: SearchSetting = [
  {
    kind: "date",
    field: "date1",
    label: "날짜:",
    placeholder: "날짜를 입력하시오",
  },
  {
    kind: "date",
    field: "startDate",
    label: "기간:",
    placeholder: "시작일 입력",
    date: new Date(2022, 0, 1),
  },
  {
    kind: "date",
    field: "endDate",
    label: "~",
    placeholder: "종료일 입력",
    date: new Date(2022, 11, 31),
    inline: true,
  },
];

export default searchSetting;
