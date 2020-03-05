import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';

import { dateFormat } from '../../utils/date';
import { BaseCard } from '../common/BaseCard';

type Props = {
  fileName: string;
  md: matter.GrayMatterFile<any>;
};

export const PostCard: React.FC<Props> = props => {
  const meta = props.md.data;
  const formattedDate = meta.date ? dateFormat(meta.date) : "2000-01-01";
  return (
    <Link href={"/post/" + props.fileName}>
      <BaseCard clickable={true}>
        <h1>{meta.title}</h1>
        <p>tags: {meta.tags ? meta.tags : "未設定"}</p>
        <p>author: {meta.author ? meta.author : "なし"}</p>
        <p>date: {formattedDate}</p>
      </BaseCard>
    </Link>
  );
};
