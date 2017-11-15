import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Button, Input } from 'semantic-ui-react';
import { getAPIData, handleChangeTwitterUser } from '../store/actions/app';
import axios from 'axios';

class MainContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      twitterUser: null
    };
  }

  handleChange(e) {
    this.setState({
      twitterUser: e.target.value
    });
  }

  handleClick(){
    let data = {user: this.state.twitterUser};
    axios.post('/tweets', data)
      .then((data) => {
        console.log('(Client) Success: Retrieving Tweets from ', data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render () {
    return (
      <Container text style={{ marginTop: '4em' }} >
        <Input type='text' onChange={this.handleChange.bind(this)} placeholder='Enter Twitter Handle...' >
          <input />
          <Button onClick={this.handleClick.bind(this)} icon='twitter'/>
        </Input>
        <Segment.Group>
          <Tweets />
        </Segment.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  twitterUser: state.app.twitterUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAPIData,
  handleChangeTwitterUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);