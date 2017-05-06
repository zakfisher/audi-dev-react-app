import React from 'react';
// import './MissingPage.sass';

const MissingPage = props => {
  console.log('missing', props);
  return (
    <section className="MissingPage">
      <h1>404</h1>
      <p>{"Unfortunately, we could not find the page you're looking for."}</p>
    </section>
  );
};

export default MissingPage;
