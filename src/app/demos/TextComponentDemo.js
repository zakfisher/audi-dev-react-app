import React from 'react';
import Text from '../components/Text/Text';

const TextComponentDemo = () => (
  <section className="TextComponentDemo" onClick={() => console.log('real component')}>
    <Text small>
      Small Text
    </Text>
    <br/>
    <Text medium>
      Medium Text
    </Text>
    <br/>
    <Text large>
      Large Text
    </Text>
    <br/>
    <Text huge>
      Huge Text
    </Text>
    <br/>
    <Text crazy>
      Crazy Text
    </Text>
  </section>
);

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.TextComponentDemo = TextComponentDemo;
