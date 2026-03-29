import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';

export const contentfulOptions = {
  renderNode: {
    [BLOCKS.TABLE]: (node, children) => (
      <div className="table-wrapper">
        <table>{children}</table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th>{children}</th>,
    [BLOCKS.TABLE_CELL]: (node, children) => <td>{children}</td>,
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
