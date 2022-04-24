import jsSHA from 'jssha';

export default function hash(message: string) {
  const shaObj = new jsSHA('SHA-256', 'TEXT');
  shaObj.update(message);
  return shaObj.getHash('HEX');
}
