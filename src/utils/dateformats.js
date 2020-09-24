import { format, formatRelative, formatDistanceStrict, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';

import { EXPERIENCE_CURSOR_FORMAT, EXPERIENCE_PUBLISHDATE_FORMAT } from '../config/constants';

const wrapperUtcToZonedTime = (dateObject, timeZone) => { 
  return utcToZonedTime(dateObject, timeZone);
};
/**
 * The formatting proided by below functions will be used directly without any further processing
 */
export const cursorFormat = (dateObject) => { 
  if (!dateObject) {
    throw new Error(`Date object required. Passed ${dateObject}`);
  }

  return format(dateObject, EXPERIENCE_CURSOR_FORMAT);
};

/**
 * for now its defaulting to enGB, will be thought to include other locale when supporting them.
 */
export const createdAtFormat = (createdAtDate) => { 
  const date = utcToZonedTime(createdAtDate);
  const basedate = utcToZonedTime(new Date());
  return formatDistanceStrict(new Date(date), basedate, { addSuffix: true, locale: enGB });
};

/** 
 * for publisheddate format, made a different method so as to support different locale
*/
export const publishDateFormat = (publishdate) => { 
  const date = utcToZonedTime(publishdate);
  return format(date, EXPERIENCE_PUBLISHDATE_FORMAT);
};