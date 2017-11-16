import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Button, Input, Icon } from 'semantic-ui-react';
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
      <div style={{paddingTop: "1rem"}}>
        <ul>
          <li>Enter a Twitter Handle</li>
          <li>Click <Icon name="twitter"/> retrieve Tweets</li>
          <li>Click "Generate Markov" to watch the magic happen...</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  markovs: state.app.markovs
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);