/**
 * Function takes date string and returns
 * whether or not the date is from the previous day.
 * @param datetimeAttr
 * @returns Boolean
 */

export function DateCompare(datetimeAttr: string): boolean {
  let postDate: Date = new Date(datetimeAttr);
  let postDateFormatted = postDate.toLocaleDateString("en-CA");

  let curDate = new Date();
  const yesterday = new Date(curDate);
  yesterday.setDate(curDate.getDate() - 1);
  let yesterdayDate = yesterday.toLocaleDateString("en-CA");

  const isYesterday: boolean = postDateFormatted === yesterdayDate;

  return isYesterday;
}
