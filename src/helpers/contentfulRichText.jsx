import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';

export const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description } = node.data.target.fields;
      const { url, contentType } = node.data.target.fields.file;
      const isPdf = contentType === 'application/pdf';

      return isPdf ? (
        <div>
          <a href={url} download>
            {title}
          </a>
        </div>
      ) : (
        <figure>
          <img src={url} alt={title} loading="lazy" />
          {description && <figcaption>{description}</figcaption>}
        </figure>
      );
    },
  },
};
