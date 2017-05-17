import React from 'react';
import Text from '../components/Text/Text';

const TextComponentDemo = () => (
  <section className="TextComponentDemo" onClick={() => console.log('real component')}>
    <Text size="small" text="Small Text"/>
    <Text size="medium" text="Medium Text"/>
    <Text size="large" text="Large Text"/>
    <Text size="huge" text="Huge Text"/> 
    <Text size="crazy" text="Crazy Text"/>
  </section>
);

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.TextComponentDemo = TextComponentDemo;
