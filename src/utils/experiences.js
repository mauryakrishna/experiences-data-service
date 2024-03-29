import slugify from 'slugify';

import { SLUG_MAX_LENGTH } from '../config/constants';

slugify.extend({
  '>': 'gt',
  '<': 'lt',
  '*': 'star',
  '&': 'amp',
  '^': 'carat'
});

// the below should output a slug string which pass /^[a-z0-9]+(?:-[a-z0-9]+)*$/i
export const getSlug = (title) => {
  let slug = slugify(title, { strict: true, lower: true }); // remove: /[*+~=.()'"`#!:@]/g,

  // no consecutive double dashes
  slug = slug
     // replace dobule dash with single
    .replace(/--/g, '-')
    // - at end should not be
    .replace(/-$/g, '')

  const sluglen = slug.length;

  if (slug && sluglen > SLUG_MAX_LENGTH) {
    slug = slug.substr(0, SLUG_MAX_LENGTH);
  }
  // workaround | should never be the case with strict: true
  else if(sluglen == 0) { 
    slug = 'all-special-chars';
  }

  return slug; 
}

export const getSlugKey = () => { 
  return Math.random().toString(36).slice(2);
}
