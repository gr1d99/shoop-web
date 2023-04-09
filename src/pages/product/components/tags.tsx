import React from 'react';

const ProductTags = ({ tags }: { tags: string[] }) => {
  return (
    <div>
      {tags.map((tag, index) => {
        return <span key={`${tag}-${index}`}>{tag}</span>;
      })}
    </div>
  );
};

export { ProductTags };
