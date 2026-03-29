import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulOptions } from '../helpers/contentfulRichText';
import '../components/styles/Blog.css';

export default function BlogPost({ content }) {
  return <>{documentToReactComponents(content, contentfulOptions)}</>;
}
