import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Button, Input } from 'semantic-ui-react';
import { getAPIData, handleChangeTwitterUser } from '../store/actions/app';
import Tweet from './Tweet.jsx';

function Tweets(props) {
  if (props.markovs.length > 0) {
    let markovs = props.markovs.map((markov, i) => {return <Tweet markov={markov} key={i}/>}).reverse()
    return(
      <Segment.Group>
        {markovs}
      </Segment.Group>
    );
  } else {
    return(
      <Segment.Group>
        <div>There are not yet any Markov Chains Stored...</div>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  markovs: state.app.markovs
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);