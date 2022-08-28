export const zcode = [
  {
    name: "서울특별시",
    zcode: 11,
  },
  {
    name: "부산광역시",
    zcode: 26,
  },
  {
    name: "대구광역시",
    zcode: 27,
  },
  {
    name: "인천광역시",
    zcode: 28,
  },
  {
    name: "광주광역시",
    zcode: 29,
  },
  {
    name: "대전광역시",
    zcode: 30,
  },
  {
    name: "울산광역시",
    zcode: 31,
  },
  {
    name: "세종특별자치시",
    zcode: 36,
  },
  {
    name: "경기도",
    zcode: 41,
  },
  {
    name: "강원도",
    zcode: 42,
  },
  {
    name: "충청북도",
    zcode: 43,
  },
  {
    name: "충청남도",
    zcode: 44,
  },
  {
    name: "전라북도",
    zcode: 45,
  },
  {
    name: "전라남도",
    zcode: 46,
  },
  {
    name: "경상북도",
    zcode: 47,
  },
  {
    name: "경상남도",
    zcode: 48,
  },
  {
    name: "제주특별자치도",
    zcode: 50,
  },
];

export const kindDetail = {
  A001: "관공서",
  A002: "주민센터",
  A003: "공공기관",
  A004: "지자체시설",
  B001: "공영주차장",
  B002: "공원주차장",
  B003: "환승주차장",
  B004: "일반주차장",
  C001: "고속도로 휴게소",
  C002: "지방도로 휴게소",
  C003: "쉼터",
  D001: "공원",
  D002: "전시관",
  D003: "민속마을",
  D004: "생태공원",
  D005: "홍보관",
  D006: "관광안내소",
  D007: "관광지",
  D008: "박물관",
  D009: "유적지",
  E001: "마트(쇼핑몰)",
  E002: "백화점",
  E003: "숙박시설",
  E004: "골프장(CC)",
  E005: "카페",
  E006: "음식점",
  E007: "주유소",
  E008: "영화관",
  F001: "서비스센터",
  F002: "정비소",
  G001: "군부대",
  G002: "야영장",
  G003: "공중전화부스",
  G004: "기타",
  G005: "오피스텔",
  G006: "단독주택",
  H001: "아파트",
  H002: "빌라",
  H003: "사업장(사옥)",
  H004: "기숙사",
  H005: "연립주택",
  I001: "병원",
  I002: "종교시설",
  I003: "보건소",
  I004: "경찰서",
  I005: "도서관",
  I006: "복지관",
  I007: "수련원",
  I008: "금융기관",
  J001: "학교",
  J002: "교육원",
  J003: "학원",
  J004: "공연장",
  J005: "관람장",
  J006: "동식물원",
  J007: "경기장",
};

export const stat = {
  0: "알수없음",
  1: "통신이상",
  2: "사용가능",
  3: "충전중",
  4: "운영중지",
  5: "점검중",
  9: "상태미확인",
};

export const chargerType = {
  "01": "DC차데모",
  "02": "AC완속",
  "03": "DC차데모+AC3상",
  "04": "DC콤보",
  "05": "DC차데모+DC콤보",
  "06": "DC차데모+AC3상+DC콤보",
  "07": "AC3상",
  89: "H2",
};

export function groupBy(data, key) {
  return data.reduce(function (carry, el) {
    var group = el[key];
    if (carry[group] === undefined) {
      carry[group] = [];
    }
    carry[group].push(el);
    return carry;
  }, {});
}
