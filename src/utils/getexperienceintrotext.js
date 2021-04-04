import { Node } from 'slate';

const FEATURED_TEXT_LENGTH = 200;

const serialize = nodes => {
  let text = ""
  for(const node of nodes) {
    text += Node.string(node)
    if(text.length>FEATURED_TEXT_LENGTH) {
      text = `${text.slice(0, FEATURED_TEXT_LENGTH).trim()}...`
      break;
    }
  }
  return text;
}

export default serialize;