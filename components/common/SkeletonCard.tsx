import type { FC } from 'react';
import clsx from 'clsx';

const SkeletonCard: FC = ({ isLoading = true }: { isLoading?: boolean }) => {
  return (
    <div className="bg-white rounded-md p-4 w-full mx-auto">
      <div className={clsx('flex space-x-4', {'animate-pulse':isLoading})}>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
