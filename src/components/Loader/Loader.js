import React from 'react';
import SVG from '../SVG/SVG';
import audio from '../../svg/loaders/audio.svg';
import ballTriangle from '../../svg/loaders/ball-triangle.svg';
import bars from '../../svg/loaders/bars.svg';
import circles from '../../svg/loaders/circles.svg';
import grid from '../../svg/loaders/grid.svg';
import hearts from '../../svg/loaders/hearts.svg';
import oval from '../../svg/loaders/oval.svg';
import puff from '../../svg/loaders/puff.svg';
import rings from '../../svg/loaders/rings.svg';
import spinningCircles from '../../svg/loaders/spinning-circles.svg';
import tailSpin from '../../svg/loaders/tail-spin.svg';
import threeDots from '../../svg/loaders/three-dots.svg';
import './Loader.sass';

const LOADERS = {
  audio,
  ballTriangle,
  bars,
  circles,
  grid,
  hearts,
  oval,
  puff,
  rings,
  spinningCircles,
  tailSpin,
  threeDots
};

const NAMES = Object.keys(LOADERS);

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Loader = props => {
  // Randomize loader
  const randomIndex = random(0, NAMES.length - 1);
  const name = NAMES[randomIndex];
  return (<SVG file={LOADERS[name]} name={`Loader ${name}SVG`}/>);
}

export default Loader;
