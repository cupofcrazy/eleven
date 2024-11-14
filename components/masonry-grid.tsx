import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode[];
  columnWidth?: number;
  gap?: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  children, 
  columnWidth = 180, 
  gap = 8 
}) => {
  const [columns, setColumns] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newColumns = Math.floor((containerWidth + gap) / (columnWidth + gap));
        setColumns(Math.max(1, newColumns));
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columnWidth, gap]);

  const columnWrapper: { [key: string]: ReactNode[] } = {};
  const result: ReactNode[] = [];

  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  React.Children.forEach(children, (child, index) => {
    const columnIndex = index % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={index} style={{ marginBottom: `${gap}px` }}>
        {child}
      </div>
    );
  });

  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: i > 0 ? `${gap}px` : '0',
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ display: 'flex' }}>
      {result}
    </div>
  );
};