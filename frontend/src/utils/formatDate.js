export function formatDate(date) {
  const formatDate = new Date(date);
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const day = formatDate.getDate();
  return `${year}-${month}-${day}`;
}
