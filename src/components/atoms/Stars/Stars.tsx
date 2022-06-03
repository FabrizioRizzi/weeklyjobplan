import React from 'react';
import { Star } from 'react-feather';

interface StarsProps {
  priority: 0 | 1 | 2;
}

const Stars = ({ priority }: StarsProps) => (
  <div className="stars">
    <Star />
    {priority >= 1 && <Star />}
    {priority === 2 && <Star />}
  </div>
);

export default React.memo(Stars);
