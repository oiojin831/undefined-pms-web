const resources = [
  {
    id: "dmyk101",
    name: "d101"
  },
  {
    id: "dmyk102",
    name: "d102"
  },
  {
    id: "dmyk103",
    name: "d103"
  },
  {
    id: "dmyk104",
    name: "d104"
  },
  {
    id: "dmyk201",
    name: "d201"
  },
  {
    id: "dmyk202",
    name: "d202"
  },
  {
    id: "dmyk203",
    name: "d203"
  },
  {
    id: "dmyk204",
    name: "d204"
  },
  {
    id: "dmyk300",
    name: "d300"
  },
  {
    id: "sinsaB01",
    name: "sb01"
  },
  {
    id: "sinsaB02",
    name: "sb02"
  },
  {
    id: "sinsaB03",
    name: "sb03"
  },
  {
    id: "sinsa101",
    name: "s101"
  },
  {
    id: "jhonor101A",
    name: "j101A"
  },
  {
    id: "jhonor101B",
    name: "j101B"
  },
  {
    id: "jhonor101C",
    name: "j101C"
  },
  {
    id: "jhonor101D",
    name: "j101D"
  },
  {
    id: "jhonor201A",
    name: "j201A"
  },
  {
    id: "jhonor201B",
    name: "j201B"
  },
  {
    id: "jhonor201C",
    name: "j201C"
  },
  {
    id: "jhonor201D",
    name: "j201D"
  },
  {
    id: "jhonor202A",
    name: "j202A"
  },
  {
    id: "jhonor202B",
    name: "j202B"
  },
  {
    id: "jhonor202C",
    name: "j202C"
  },
  {
    id: "jhonor202D",
    name: "j202D"
  },
  {
    id: "jhonor301A",
    name: "j301A"
  },
  {
    id: "jhonor301B",
    name: "j301B"
  },
  {
    id: "jhonor301C",
    name: "j301C"
  },
  {
    id: "jhonor301D",
    name: "j301D"
  },
  {
    id: "jhonor302X",
    name: "j302X"
  },
  {
    id: "jhonor302A",
    name: "j302A"
  },
  {
    id: "jhonor302B",
    name: "j302B"
  },
  {
    id: "jhonor302C",
    name: "j302C"
  },
  {
    id: "jhonor302D",
    name: "j302D"
  }
];

const dmykOptions = [
  { label: "dmyk101", value: "dmyk101" },
  { label: "dmyk102", value: "dmyk102" },
  { label: "dmyk103", value: "dmyk103" },
  { label: "dmyk104", value: "dmyk104" },
  { label: "dmyk201", value: "dmyk201" },
  { label: "dmyk202", value: "dmyk202" },
  { label: "dmyk203", value: "dmyk203" },
  { label: "dmyk204", value: "dmyk204" },
  { label: "dmyk300", value: "dmyk300" }
];
const sinsaOptions = [
  { label: "sinsa101", value: "sinsa101" },
  { label: "sinsaB01", value: "sinsaB01" },
  { label: "sinsaB02", value: "sinsaB02" },
  { label: "sinsaB03", value: "sinsaB03" }
];
const jhonorOptions = [
  { label: "jhonor101A", value: "jhonor101A" },
  { label: "jhonor101B", value: "jhonor101B" },
  { label: "jhonor101C", value: "jhonor101C" },
  { label: "jhonor101D", value: "jhonor101D" },
  { label: "jhonor201A", value: "jhonor201A" },
  { label: "jhonor201B", value: "jhonor201B" },
  { label: "jhonor201C", value: "jhonor201C" },
  { label: "jhonor201D", value: "jhonor201D" },
  { label: "jhonor202A", value: "jhonor202A" },
  { label: "jhonor202B", value: "jhonor202B" },
  { label: "jhonor202C", value: "jhonor202C" },
  { label: "jhonor202D", value: "jhonor202D" },
  { label: "jhonor301A", value: "jhonor301A" },
  { label: "jhonor301B", value: "jhonor301B" },
  { label: "jhonor301C", value: "jhonor301C" },
  { label: "jhonor301D", value: "jhonor301D" },
  { label: "jhonor302X", value: "jhonor302X" },
  { label: "jhonor302A", value: "jhonor302A" },
  { label: "jhonor302B", value: "jhonor302B" },
  { label: "jhonor302C", value: "jhonor302C" },
  { label: "jhonor302D", value: "jhonor302D" }
];

const jhonorData = {
  jhonor101A: {
    beds: {
      single: 2
    },
    passcode: "5437*",
    wifi: "77777777"
  },
  jhonor101B: {
    beds: {
      single: 1,
      queen: 1
    },
    passcode: "2403*",
    wifi: "77777777"
  },
  jhonor101C: {
    beds: {
      single: 1,
      queen: 1
    },
    passcode: "3479*",
    wifi: "77777777"
  },
  jhonor101D: {
    beds: { queen: 1 },
    passcode: "9893*",
    wifi: "77777777"
  },
  jhonor201A: {
    beds: {
      single: 2,
      bunk: 1
    },
    passcode: "5216*",
    wifi: "77777777"
  },
  jhonor201B: {
    beds: {
      single: 2
    },
    passcode: "6593*",
    wifi: "77777777"
  },
  jhonor201C: {
    beds: {
      queen: 1
    },
    passcode: "1269*",
    wifi: "77777777"
  },
  jhonor201D: {
    beds: { bunk: 1 },
    passcode: "7508*",
    wifi: "77777777"
  },
  jhonor202A: {
    beds: {
      queen: 1
    },
    passcode: "2674*",
    wifi: "77777777"
  },
  jhonor202B: {
    beds: {
      bunk: 2
    },
    passcode: "8086*",
    wifi: "77777777"
  },
  jhonor202C: {
    beds: {
      single: 2,
      bunk: 1
    },
    passcode: "0359*",
    wifi: "77777777"
  },
  jhonor202D: {
    beds: { single: 1, bunk: 1 },
    passcode: "1410*",
    wifi: "77777777"
  },
  jhonor301A: {
    beds: {
      single: 2,
      bunk: 1
    },
    passcode: "5272*",
    wifi: "77777777"
  },
  jhonor301B: {
    beds: {
      single: 2
    },
    passcode: "8625*",
    wifi: "77777777"
  },
  jhonor301C: {
    beds: {
      queen: 1
    },
    passcode: "7505*",
    wifi: "77777777"
  },
  jhonor301D: {
    beds: { bunk: 1 },
    passcode: "0430*",
    wifi: "77777777"
  },
  jhonor302A: {
    beds: {
      queen: 1
    },
    passcode: "6236*",
    wifi: "77777777"
  },
  jhonor302B: {
    beds: {
      bunk: 1
    },
    passcode: "1774*",
    wifi: "77777777"
  },
  jhonor302C: {
    beds: {
      single: 2,
      bunk: 1
    },
    passcode: "3120*",
    wifi: "77777777"
  },
  jhonor302D: {
    beds: { single: 1, bunk: 1 },
    passcode: "0288*",
    wifi: "77777777"
  },
  jhonor302X: {
    beds: { single: 3, bunk: 3, queen: 1 },
    passcode: "0302*",
    wifi: "77777777"
  }
};
export { resources, dmykOptions, sinsaOptions, jhonorOptions, jhonorData };
