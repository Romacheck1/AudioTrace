export default function ContentGrid() {
  // Layout constants
  const CONTAINER_WIDTH = 'w-[1200px]';
  
  // Spacing constants
  const CONTENT_TOP_MARGIN = 'mt-16';
  const ROW_GAP = 'mb-[15px]';
  const BOX_GAP = 'gap-6';
  
  // Box styling
  const BOX_CLASSES = 'bg-gray-200 rounded-lg h-96 border border-gray-300 flex-1';

  return (
    <div className={`hidden xl:block ${CONTAINER_WIDTH} mx-auto ${CONTENT_TOP_MARGIN} flex flex-col`}>
      {Array.from({ length: 4 }).map((_, rowIndex) => {
        const isLastRow = rowIndex === 3;
        return (
          <div key={rowIndex} className={`flex flex-row ${BOX_GAP} ${!isLastRow ? ROW_GAP : ''}`}>
            {Array.from({ length: 3 }).map((_, colIndex) => (
              <div key={colIndex} className={BOX_CLASSES}></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

