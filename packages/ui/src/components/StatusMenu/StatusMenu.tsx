import React from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import s from './StatusMenu.module.css';
import {AppQueue} from '@bull-board/api/typings/app';
import {STATUS_LIST} from '../../constants/status-list';
import {STATUSES} from '@bull-board/api/src/constants/statuses';
import {Store} from '../../hooks/useStore';
import {QueueDropdownActions} from '../QueueDropdownActions/QueueDropdownActions';
import {Filter} from '../Filter/Filter';

export const StatusMenu = ({queue, actions, setFilter}: { queue: AppQueue; actions: Store['actions']; setFilter: (jobName: string)=>void; }) => {
    const {url} = useRouteMatch();

    const jobNames = [...new Set(queue.jobs.map((job) => job.name))].map((jobName) => ({
        text: jobName,
        value: jobName,
    }));

    // eslint-disable-next-line no-console
    console.log(jobNames);

    return (
        <div className={s.statusMenu}>
            {STATUS_LIST.map((status) => {
                const isLatest = status === STATUSES.latest;
                const displayStatus = status.toLocaleUpperCase();
                return (
                    <NavLink
                        to={`${url}${isLatest ? '' : `?status=${status}`}`}
                        activeClassName={s.active}
                        isActive={(_path, {search}) => {
                            const query = new URLSearchParams(search);
                            return query.get('status') === status || (isLatest && query.get('status') === null);
                        }}
                        key={`${queue.name}-${status}`}
                    >
                        <span title={displayStatus}>{displayStatus}</span>
                        {queue.counts[status] > 0 && <span className={s.badge}>{queue.counts[status]}</span>}
                    </NavLink>
                );
            })}
            {jobNames.length > 0 && (
                <Filter jobNames={jobNames} onSelect={setFilter}/>
            )}
            {!queue.readOnlyMode && (
                <div>
                    <QueueDropdownActions queue={queue} actions={actions}/>
                </div>
            )}
        </div>
    );
};
