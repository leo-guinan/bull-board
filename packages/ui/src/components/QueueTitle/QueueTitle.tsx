import { AppQueue } from '@leo-guinan/api/typings/app';
import React from 'react';
import s from './QueueTitle.module.css';

interface QueueTitleProps {
  queue: AppQueue;
}
export const QueueTitle = ({ queue }: QueueTitleProps) => (
  <div className={s.queueTitle}>
    <h1 className={s.name}>{queue.name}</h1>
    {!!queue.description && <p className={s.description}>{queue.description}</p>}
  </div>
);
