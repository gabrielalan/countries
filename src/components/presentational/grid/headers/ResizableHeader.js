import React, { useRef, useState } from 'react';
import { classNames } from '../../../../functions/elementHelpers';

const dragGhostInvisibleImage = new Image();
dragGhostInvisibleImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

const getStyleValue = (element, property) => window
  .getComputedStyle(element)
  .getPropertyValue(property);

/**
 * This component represents the resizable headers
 * Once the user finishes to resize the header via DnD
 * it calls the callback onResize, to let the grid container
 * know the size for the column has changed.
 * 
 * It's really agnostic regarding the children or grid data.
 */
export default function ResizableHeader({ children, onResize, initialWidth }) {
  const div = useRef(undefined);
  const [width, setWidth] = useState(initialWidth);
  const [initials, setInitials] = useState({ width: initialWidth });

  const setResizedWidth = x => setWidth(initials.width + (x - initials.x));

  /**
   * Firefox has a known bug that makes screenX/clientX/pageX always 0
   * So the resize won't work for Firefox. The solution would be to use
   * onDragOver event, but that brings a lot of side-effects and is not a 
   * very performatic workaround.
   */
  const onDrag = e => e.pageX > 0 && setResizedWidth(e.pageX);

  const onDragEnd = () => {
    onResize(width);
    setInitials({ width });
  };

  const onDragStart = e => {
    e.dataTransfer.setData('text', ''); // required in some browsers
    e.dataTransfer.setDragImage(dragGhostInvisibleImage, 0, 0);
    
    const padLeft = getStyleValue(div.current, 'padding-left');
    const padRight = getStyleValue(div.current, 'padding-right');

    setInitials({
      x: e.pageX,
      width: div.current.getBoundingClientRect().width - (parseInt(padLeft) + parseInt(padRight))
    });
  };

  return <div ref={div} className={classNames({ 'grid__row__column': true, 'grid__row__column--isResizing': !!initials.x })} style={{ width }}>
    {children}
    <span
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      className="grid__row__column__resizer"
      draggable />
  </div>;
}