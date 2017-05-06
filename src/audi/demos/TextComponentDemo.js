import React from 'react';
import Text from '../components/Text/Text';

const TextComponentDemo = () => (
  <section className="TextComponentDemo">
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
    <Text crazy>
      Crazy Text
    </Text>
  </section>
);

export default TextComponentDemo;
