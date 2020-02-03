import '../common';
import { a, b } from './tree-shaking';

a(); // tree-shaking中的b方法未被调用，将被shaking掉
if (false) {
  b();
}
console.log('search');
