const experiencesMiddleware = {
  Query: {
    getAnExperienceForRead: async (resolve, parent, args, context, info)=> {
      const result = await resolve(parent, args, context, info);
      if(!result.title) {
        result.title = "Untitled";
        result.slug = "untitled";
      }
      
      return result;
    }
  }
}

export default experiencesMiddleware