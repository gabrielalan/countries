/**
 * This is the most basic type of cell used on grids
 * It turns everything into strings so no error will be thrown
 * when the children is some kind of object not accepted by React
 */
export default function TextCell({ children }) {
  return children && children.toString();
}