export const getChatName = (users, myId) => {
  if (users.length === 2) {
    if (users[0]._id == myId) return users[1].name;
    else return users[0].name;
  } else {
    users = users.filter((u) => u._id !== myId);
    let name = users.map((u) => u.name).join(", ");
    return name || "";
  }
};

export const getChatUsername = (users, myId) => {
  if (users.length === 2) {
    if (users[0]._id === myId) return "@" + users[1].username;
    else return "@" + users[0].username;
  } else {
    return "";
  }
};
