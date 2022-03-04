export const dateDisplayPost = (mongoDate) => {
  let date = new Date(mongoDate);
  let diff = Date.now() - date;
  diff = diff / 1000;
  if (diff < 5) return "Just now";
  if (diff < 60) return `${Math.floor(diff)}s`;
  diff = diff / 60;
  if (diff < 60) return `${Math.floor(diff)}m`;
  diff = diff / 60;
  if (diff < 24) return `${Math.floor(diff)}h`;

  const arr = date.toDateString().split(" ");
  const arr2 = new Date().toDateString().split(" ");
  if (arr[3] !== arr2[3]) return `${arr[1]} ${arr[2]}, ${arr[3]}`;
  return `${arr[1]} ${arr[2]}`;
};

export const timeDateDisplay = (mongoDate) => {
  let date = new Date(mongoDate);
  let arr = date.toDateString().split(" ");
  let da = `${arr[1]} ${arr[2]}, ${arr[3]}`;
  return [date.toLocaleTimeString(), da];
};
