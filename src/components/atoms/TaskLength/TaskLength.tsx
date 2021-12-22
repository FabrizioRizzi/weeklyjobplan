import React, { useEffect, useMemo, useState } from 'react';
import './TaskLength.scss';

export interface TaskLengthProps {
  length: number;
  day?: boolean;
}

const Task: React.FC<TaskLengthProps> = ({ length, day }: TaskLengthProps) => {
  const [hours, setHours] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('');
  const hoursLength = useMemo(() => `${Math.floor(length / 60)}:${length % 60 < 10 ? `0${length % 60}` : length % 60}`, [length]);
  const dayLength = 480;
  const backgroundColor = '#ccc';

  useEffect(() => {
    if (day && length <= dayLength) {
      setBorderColor('#11a811');
    } else if (day && length > dayLength) {
      setBorderColor('#ff0000');
    } else if (length < 60) {
      setBorderColor('#999');
    } else if (length < 120) {
      setBorderColor('#ffb100');
    } else {
      setBorderColor('#ff0000');
    }
  }, [day, length, dayLength]);

  const toggleHours = () => {
    setHours(!hours);
  };

  return (
    length < dayLength / 2
      ? (
        <div
          onClick={toggleHours}
          className="TaskLength__Length"
          style={{
            borderColor,
            backgroundColor,
            backgroundImage: `linear-gradient(${90 + (360 * (length / dayLength))}deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)`,
          }}
        >
          {hours ? hoursLength : length}
        </div>
      )
      : (
        <div
          onClick={toggleHours}
          className="TaskLength__Length"
          style={{
            borderColor,
            backgroundColor,
            backgroundImage: `linear-gradient(${(360 * ((length < dayLength ? length : dayLength) / dayLength)) - 90}deg, transparent 50%, ${backgroundColor} 50%), linear-gradient(90deg, white 50%, transparent 50%)`,
          }}
        >
          {hours ? hoursLength : length}
        </div>
      ));
};

export default React.memo(Task);
