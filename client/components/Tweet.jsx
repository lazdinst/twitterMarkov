import React from 'react';
import { Container, Segment, Button, Input } from 'semantic-ui-react';

export default function Tweet(props) {
  return(
    <Segment>
      {props.markov}
    </Segment>
  );
}