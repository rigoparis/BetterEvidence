import React, {useMemo} from 'react';

import DOTS from './dots.svg';
import EMF from './emf.svg';
import UV from './uv.svg';
import GHOSTORBS from './ghost-orb.svg';
import SPIRITBOX from './spirit-box.svg';
import FREEZING from './thermometer.svg';
import WRITINGBOOK from './ghost-writing.svg';

const index = {
  DOTS,
  EMF,
  UV,
  GHOSTORBS,
  SPIRITBOX,
  FREEZING,
  WRITINGBOOK,
};

function Icon({keyword, size}) {
  const Icon = useMemo(() => index[keyword], [keyword]);
  return <>{Icon && <Icon width={size} height={size} />}</>;
}

export default Icon;
