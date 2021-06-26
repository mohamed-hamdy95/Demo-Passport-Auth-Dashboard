import { useRef, useCallback, useState } from 'react';

export default function useLazyLoading({ loading, initialItemsCount, increaseBy, listLength }) {
  const [itemsCount, setItemsCount] = useState(initialItemsCount);

  const observer = useRef();

  const lastElementRef = useCallback(
    node => {
      if (loading || itemsCount >= listLength) return;
      if (observer?.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries?.[0]?.isIntersecting) {
          setItemsCount(st => st + increaseBy);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, increaseBy, itemsCount, listLength],
  );

  return { lastElementRef, itemsCount };
}
