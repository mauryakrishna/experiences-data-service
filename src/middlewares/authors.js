import { SHOW_TO_USER_DATEFORMAT } from '../config/constants';

// the below middleware checks for null title and assign them a string 'Untitled';
const appendUntitled = (experiences) => { 
  if (experiences) { 
    experiences = experiences.map((experience) => { 
      if (!experience.title) { 
        experience.title = `Untitled experience`;
        experience.slug = `untitled`;
      }
      return experience;
    });
  }
  return experiences;
}

const authorsMiddleware = {
  Query: {
    getAuthor: async (resolve, parent, args, context, info) => { 
      const result = await resolve(parent, args, context, info);
      result.author.experiences = appendUntitled(result.author.experiences);
      return result;
    }
  }
};

export default authorsMiddleware;