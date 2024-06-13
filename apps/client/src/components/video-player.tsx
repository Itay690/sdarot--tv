import React, { ComponentProps } from 'react';
import { Player } from 'video-react';

type Props = ComponentProps<typeof Player>;

export const VideoPlayer: React.FC<Props> = (props) => {
  return <Player width={350} height={200} playsInline {...props} />;
};
