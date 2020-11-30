const getGigbyUserId = (cookie, state) => {
  const user = cookie.user;
  const gigs = state.gigs;
  return user && gigs.filter((gig) => gig.contractor_id === user.id);
};

const check = (personA, personB, conversations) => {
  return conversations.filter(
    (conversation) =>
      (personA === conversation.client_id &&
        personB === conversation.contractor_id) ||
      (personB === conversation.client_id &&
        personA === conversation.contractor_id)
  )[0];
};

const getAllOrdersbyContractorId = (cookie, state) => {
  const user = cookie.user;
  const { orders, gigs } = state;
  const ordersWithGigs = [];
  orders.forEach((order) => {
    for (let gig of gigs) {
      if (gig.id === order.gig_id) {
        ordersWithGigs.push({ ...order, gig });
      }
    }
  });

  return (
    user &&
    ordersWithGigs.filter((order) => order.gig.contractor_id === user.id)
  );
};

const getAllOrdersbyClientId = (cookie, state) => {
  const user = cookie.user;
  const { orders, gigs } = state;
  const ordersWithGigs = [];
  orders.forEach((order) => {
    for (let gig of gigs) {
      if (gig.id === order.gig_id) {
        ordersWithGigs.push({ ...order, gig });
      }
    }
  });

  return user && ordersWithGigs.filter((order) => order.client_id === user.id);
};

const getUserById = (id, users) => {
  return users && users.find((user) => user.id === id);
};
const getDateFormat = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date && date.toLocaleDateString(undefined, options);
};
const getDayFormat = (date) => {
  date && date.setSeconds(0);
  return date && date.toLocaleTimeString("en-US");
};

const dateBooked = (date, disabledDate) => {
  return disabledDate.some(
    (occupied) =>
      occupied.getFullYear() === date.getFullYear() &&
      occupied.getMonth() === date.getMonth() &&
      occupied.getDate() === date.getDate()
  );
};

const dispatch = (message, state, setState) => {
  const { type, action, data } = message;
  switch (action) {
    case "CREATE": {
      const newDataArr = [...state[type]];
      newDataArr.push(data);
      const newState = { ...state };
      newState[type] = newDataArr;
      setState(newState);
      break;
    }
    case "UPDATE": {
      const prevDataArr = [...state[type]];
      const newDataArr = prevDataArr.map((item) => {
        return item.id === data.id ? { ...item, ...data } : item;
      });
      const newState = { ...state };
      newState[type] = newDataArr;
      setState(newState);
      break;
    }
    default:
      break;
  }
};

export {
  getGigbyUserId,
  check,
  getAllOrdersbyContractorId,
  getAllOrdersbyClientId,
  getUserById,
  getDateFormat,
  getDayFormat,
  dateBooked,
  dispatch
};
