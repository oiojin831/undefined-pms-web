import { DateTime } from "luxon";
export const formatDate = date => date.toISO().substring(0, 10);

export const now = DateTime.utc().setZone("Asia/Seoul");
const tmr = now.plus({ days: 1 });
const yesterday = now.minus({ days: 1 });

export const formattedNow = now.toFormat("yyyy-MM-dd");
export const formattedTmr = tmr.toFormat("yyyy-MM-dd");
export const formattedYesterday = yesterday.toFormat("yyyy-MM-dd");

export const fromISOtoString = dateFromCalendar =>
  DateTime.fromISO(dateFromCalendar, { zone: "Asia/Seoul" }).toFormat(
    "yyyy-MM-dd"
  );

export const compare = (a, b) => {
  if (a.roomNumber < b.roomNumber) return -1;
  if (a.roomNumber > b.roomNumber) return 1;
  return 0;
};

export const sortByPlatform = (flag, sort, a, b) => {
  if (sort === "platform") {
    if (flag === "asc") {
      if (a.platform < b.platform) return -1;
      if (a.platform > b.platform) return 1;
    }
    if (flag === "desc") {
      if (a.platform < b.platform) return 1;
      if (a.platform > b.platform) return -1;
    }
  }
  return 0;
};

export const sortByRoomNumber = (flag, sort, a, b) => {
  if (sort === "roomNumber") {
    if (flag === "asc") {
      if (a.roomNumber < b.roomNumber) return -1;
      if (a.roomNumber > b.roomNumber) return 1;
    }
    if (flag === "desc") {
      if (a.roomNumber < b.roomNumber) return 1;
      if (a.roomNumber > b.roomNumber) return -1;
    }
  }
  return 0;
};

export const sortByCheckIn = (flag, sort, a, b) => {
  if (sort === "checkIn") {
    if (flag === "asc") {
      if (a.checkInDate < b.checkInDate) return -1;
      if (a.checkInDate > b.checkInDate) return 1;
    }
    if (flag === "desc") {
      if (a.checkInDate < b.checkInDate) return 1;
      if (a.checkInDate > b.checkInDate) return -1;
    }
  }
  return 0;
};

export const sortByCheckOut = (flag, sort, a, b) => {
  if (sort === "checkOut") {
    if (flag === "asc") {
      if (a.checkOutDate < b.checkOutDate) return -1;
      if (a.checkOutDate > b.checkOutDate) return 1;
    }
    if (flag === "desc") {
      if (a.checkOutDate < b.checkOutDate) return 1;
      if (a.checkOutDate > b.checkOutDate) return -1;
    }
  }
  return 0;
};

export const compareCheckInDate = (a, b) => {
  if (a.checkInDate < b.checkInDate) return -1;
  if (a.checkInDate > b.checkInDate) return 1;
  return 0;
};

export const platformColor = {
  airbnb: "#ed3b85",
  expedia: "#3b53ed",
  booking: "#003366",
  agoda: "#873f92",
  ctrip: "#baed3b",
  cash: "#37d664"
};

export const getDaysArray = (start, end) => {
  const arr = [];
  const dt = start;
  for (dt; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr.map(v => v.toISOString().slice(0, 10));
};

export const filterGuestHouse = (guestHouseName, filter) => {
  if (filter) {
    return filter === guestHouseName;
  }
  // empty string will return everything
  return true;
};

export const filterCheckInOut = (
  today,
  checkInDate,
  checkOutDate,
  paid,
  platform,
  option,
  checkedIn
) => {
  if (option === "notPaid") {
    if (
      platform === "agoda" ||
      platform === "airbnb" ||
      platform === "expedia"
    ) {
      return false;
    }
    return paid === undefined ? true : paid === null ? true : !paid;
  }
  if (option === "checkIn") {
    return checkInDate === today && checkedIn !== true;
  } else if (option === "checkOut") {
    return checkOutDate === today;
  }
  return true;
};

export const paidPriceSelector = (platform, price, paidPrice) => {
  if (platform === "airbnb") {
    return "Airbnb";
  } else if (platform === "agoda") {
    // TODO: add agoda not prepaid logic
    return "Agoda prepaid";
  } else if (paidPrice) {
    return paidPrice;
  }
  return `${price}원`;
};

export const numOfBeds = roomNumber => {
  switch (roomNumber) {
    case "jhonor101A":
      return "single: 2";
    case "jhonor101B":
      return "single: 1, queen: 1";
    case "jhonor101C":
      return "single: 1, queen: 1";
    case "jhonor101D":
      return " queen: 1";
    case "jhonor201A":
      return "single: 2, bunk: 1";
    case "jhonor201B":
      return "single: 2";
    case "jhonor201C":
      return "queen: 1";
    case "jhonor201D":
      return "bunk: 1";
    case "jhonor301A":
      return "single: 2, bunk: 1";
    case "jhonor301B":
      return "single: 2";
    case "jhonor301C":
      return "queen: 1";
    case "jhonor301D":
      return "bunk: 1";
    case "jhonor202A":
      return "queen: 1";
    case "jhonor202B":
      return "bunk: 1";
    case "jhonor202C":
      return "single: 2, bunk: 1";
    case "jhonor202D":
      return "single: 1, bunk: 1";
    case "jhonor302A":
      return "queen: 1";
    case "jhonor302B":
      return "bunk: 1";
    case "jhonor302C":
      return "single: 2, bunk: 1";
    case "jhonor302D":
      return "single: 1, bunk: 1";
    default:
      return {};
  }
};

export const numOfGuests = guests => {
  return guests === 1 ? 2 : guests;
};

export const numOfTowels = (guests, nights) => {
  const num = Math.round(guests * nights * 1.5);
  if (num > 10) {
    return 10;
  } else {
    return num;
  }
};

export const to12From = hours24 => {
  return ((hours24 + 11) % 12) + 1 + (hours24 >= 12 ? "pm" : "am");
};

export const cleaningReducer = today => (cleaning, value, index) => {
  const roomNumber = value.roomNumber;
  if (cleaning[roomNumber] !== undefined) {
    if (value.inFlag) {
      cleaning[roomNumber] = {
        ...cleaning[roomNumber],
        guests: value.guests,
        nights: value.nights,
        checkInTime: value.checkInTime,
        cleaningMemo: cleaning.cleaningMemo
          ? cleaning.cleaningMemo +
            (value.cleaningMemo ? `CheckIn: ${value.cleaningMemo}` : null)
          : value.cleaningMemo
          ? `CheckIn: ${value.cleaningMemo}`
          : null
      };
    } else if (value.outFlag) {
      console.log("value", value.checkOutDate, value.roomNumber);
      cleaning[roomNumber] = {
        ...cleaning[roomNumber],
        checkOutTime: value.checkOutTime,
        cleaningMemo: cleaning.cleaningMemo
          ? cleaning.cleaningMemo +
            (value.cleaningMemo ? `CheckOut: ${value.cleaningMemo}` : null)
          : value.cleaningMemo
          ? `CheckOut: ${value.cleaningMemo}`
          : null
      };
    }
    return cleaning;
  } else {
    cleaning[roomNumber] = value;
    return cleaning;
  }
};
