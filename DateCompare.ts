/**
 * Determines whether a given datetime string represents a post from the previous calendar day.
 *
 * This function is used in a script that scans Instagram posts and reposts content
 * from the previous day to Mastodon. It helps filter out posts by comparing the post's
 * timestamp with yesterday's date.
 *
 * The comparison is done by:
 * - Parsing the input ISO 8601 datetime string into a `Date` object.
 * - Formatting both the post date and yesterday's date as `yyyy-mm-dd` strings
 *   using the `en-CA` locale for consistency.
 * - Checking if the formatted dates match.
 *
 * @param {string} datetimeAttr - An ISO 8601 datetime string (e.g., from the `datetime` attribute of a `<time>` tag).
 * @returns {boolean} - Returns `true` if the post was published yesterday; otherwise, `false`.
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
