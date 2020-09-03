import { format, formatDistanceStrict } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';

import { EXPERIENCE_PUBLISHDATE_FORMAT } from '../config/constants';

/**
 * The formatting proided by below functions will be used directly without any further processing
 */
export const cursorFormat = (dateObject) => { 
  if (!dateObject) {
    throw new Error(`Date object required. Passed ${dateObject}`);
  }

  return format(dateObject, EXPERIENCE_PUBLISHDATE_FORMAT);
};

/**
 * for now its defaulting to enGB, will be thought to include other locale when supporting them.
 */
export const createdAtFormat = (createdAtDate) => { 
  const date = utcToZonedTime(createdAtDate);
  const basedate = utcToZonedTime(new Date());
  return formatDistanceStrict(new Date(date), basedate, { addSuffix: true, locale: enGB });
};