import { format, parseISO } from 'date-fns';
import { TimeHTMLAttributes } from 'react';

interface Props extends TimeHTMLAttributes<HTMLTimeElement> {}

export default function Date({ dateTime, ...props }: Props) {
  return (
    <time {...props} dateTime={dateTime}>
      {format(parseISO(dateTime), 'LLLL d, yyyy')}
    </time>
  );
}
