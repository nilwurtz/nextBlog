import { useEffect, useRef, useState } from 'react';

export const useStep = (text: string, stepTime: number) => {
  const [length, setLength] = useState(0);

  const lengthRef = useRef(length);
  useEffect(() => {
    lengthRef.current = length;
  }, [length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLength(lengthRef.current === text.length ? lengthRef.current : lengthRef.current + 1);
    }, stepTime);
    return (): void => clearInterval(timer);
  }, []);

  return text.slice(0, length);
};
