export function DateCompare(datetimeAttr: string): boolean {
  // Get proper format for post date.
  let postDate: Date = new Date(datetimeAttr);
  let postDateFormatted = postDate.toLocaleDateString("en-CA");

  let curDate = new Date();
  const yesterday = new Date(curDate);
  yesterday.setDate(curDate.getDate() - 1);
  let yesterdayDate = yesterday.toLocaleDateString("en-CA");

  const isYesterday: boolean = postDateFormatted === yesterdayDate;
  return isYesterday;
}
