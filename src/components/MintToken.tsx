import { type FC } from 'react';

import MintTokenData from './MintTokenData';

interface Props {
  address: string;
  id: number;
  sold: boolean;
}

const MintToken: FC<Props> = (props) => {
  return <MintTokenData id={props.id} sold={props.sold} />;
};

export default MintToken;
