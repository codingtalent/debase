import type { FC } from 'react';
import Image from 'next/image'

const Loading: FC = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Image
        src="/debase.svg"
        alt="DeBase"
        className="w-28 h-28"
        width={112}
        height={112}
      />
    </div>
  );
};

export default Loading;
