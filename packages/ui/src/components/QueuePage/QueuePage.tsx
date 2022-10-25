import React, {useState} from 'react';
import { Store } from '../../hooks/useStore';
import { JobCard } from '../JobCard/JobCard';
import { QueueActions } from '../QueueActions/QueueActions';
import { StatusMenu } from '../StatusMenu/StatusMenu';
import s from './QueuePage.module.css';
import { AppQueue } from '@leo-guinan/api/typings/app';
import { Pagination } from '../Pagination/Pagination';

export const QueuePage = ({
  selectedStatus,
  actions,
  queue,
}: {
  queue: AppQueue | undefined;
  actions: Store['actions'];
  selectedStatus: Store['selectedStatuses'];
}) => {
  if (!queue) {
    return <section>Queue Not found</section>;
  }

  const [currentFilter, setCurrentFilter] = useState("")

  const filteredQueue = currentFilter ? {...queue, jobs: queue.jobs.filter((job)=> job.name === currentFilter) } : queue;

  return (
    <section>
      <div className={s.stickyHeader}>
        <StatusMenu queue={filteredQueue} actions={actions} setFilter={setCurrentFilter} />
        <div className={s.actionContainer}>
          <div>
            {filteredQueue.jobs.length > 0 && !queue.readOnlyMode && (
              <QueueActions
                queue={filteredQueue}
                actions={actions}
                status={selectedStatus[queue.name]}
                allowRetries={queue.allowRetries}
              />
            )}
          </div>
          <Pagination pageCount={queue.pagination.pageCount} />
        </div>
      </div>
      {filteredQueue.jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          status={selectedStatus[queue.name]}
          actions={{
            cleanJob: actions.cleanJob(queue?.name)(job),
            promoteJob: actions.promoteJob(queue?.name)(job),
            retryJob: actions.retryJob(queue?.name)(job),
            getJobLogs: actions.getJobLogs(queue?.name)(job),
          }}
          readOnlyMode={queue?.readOnlyMode}
          allowRetries={queue?.allowRetries}
        />
      ))}
    </section>
  );
};
