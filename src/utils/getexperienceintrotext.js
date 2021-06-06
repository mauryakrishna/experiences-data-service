import { Node } from 'slate';

const FEATURED_TEXT_LENGTH = 140;

const serialize = nodes => {
  let nodeString = []
  let text = ""
  for(const node of nodes || []) {
    nodeString.push(Node.string(node))
    text = nodeString.join(" ")
    if(text.length>FEATURED_TEXT_LENGTH) {
      text = `${text.slice(0, FEATURED_TEXT_LENGTH).trim()}...`
      break;
    }
  }
  return text;
}

export default serialize;