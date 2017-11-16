import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Segment, Button, Input, Message } from 'semantic-ui-react';

import { setTweetsByUser, setTwitterUser, setTweetText, setnGramTable, addNewMarkovTweet } from '../store/actions/app';

import Tweets from './Tweets.jsx';

class MainContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      twitterUser: 'realDonaldTrump',
      visibility: false
    };
  }

  handleChange(e) {
    this.setState({
      twitterUser: e.target.value
    });
  }

  handleClick(){
    let twitterUser = {user: this.state.twitterUser};
    this.props.setTwitterUser(this.state.twitterUser);
    axios.post('/tweets', twitterUser)
      .then((tweets) => {
        console.log('(Client) Success: Retrieving Tweets from ', twitterUser);
        this.props.setTweetsByUser(tweets.data);
        this.props.setTweetText(tweets.data.join(" "));
        this.generateNGrams();
        this.handleMessage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleMessage() {
    this.setState({visibility: true});
    setTimeout(() => { this.setState({visibility: false});}, 3000);
  }

  generateNGrams() {
    var tweetText = this.props.tweetText;
    var nGramOrder = this.props.nGramOrder;
    var nGrams = {};

    for( let i = 0; i <= tweetText.length - nGramOrder; i++) {
      var gram = tweetText.substring(i, i + nGramOrder);
      if (!nGrams[gram]) {
        nGrams[gram] = [];
      }
      nGrams[gram].push(tweetText.charAt(i + nGramOrder));
    }
    this.props.setnGramTable(nGrams);
  }

  generateMarkov() {
    var tweetText = this.props.tweetText;
    var nGramOrder = this.props.nGramOrder;
    var nGrams = this.props.nGrams;
    var tweets = this.props.tweets;
    var randomIndex, randomBeginining, currentGram, result;
    //Choose a Random Tweet


    for( let i = 0; i < tweets.length; i++) {
      randomIndex = Math.floor(Math.random() * tweets.length);
      randomBeginining = tweets[randomIndex].split(' ')[0];   
      if(nGrams[randomBeginining]) {
        console.log(randomBeginining);
        currentGram = randomBeginining;
        result = currentGram;
        break;
      }
      if( i === tweets.length - 1) {
        currentGram = tweetText.substring(0, nGramOrder);
        result = currentGram;
      }
    }

    // var randomIndex = Math.floor(Math.random() * tweets.length);
    // var randomBeginining = tweets[randomIndex].split(' ')[0];

    // while(!nGrams[randomBeginining]) {
    //   randomIndex = Math.floor(Math.random() * tweets.length);
    //   randomBeginining = tweets[randomIndex].split(' ')[0];
    // }

    // var currentGram = randomBeginining;
    // var result = currentGram;

    //TODO: Grab Random Word from text
    // var currentGram = tweetText.substring(0, nGramOrder);
    // var result = currentGram;

    for(var i = 0; i < 240; i++) {
      var possibilities = nGrams[currentGram];
      var randomIndex = Math.floor(Math.random() * possibilities.length);
      var next = possibilities[randomIndex];
      result += next;
      var len = result.length;
      currentGram = result.substring(len - nGramOrder, len);
    }
    console.log(result);
    this.props.addNewMarkovTweet(result);
  }

  render () {
    return (
      <Container text style={{ marginTop: '4em' }} >
        <Input type='text' onChange={this.handleChange.bind(this)} placeholder='realDonaldTrump' >
          <input />
          <Button onClick={this.handleClick.bind(this)} icon='twitter'/>
          <Button onClick={this.generateMarkov.bind(this)} content='Markov' />
        </Input>
        <Message floating hidden={!this.state.visibility}>
          Retrieved Tweets from @<strong>{this.props.twitterUser}</strong>!
        </Message>
        <Tweets />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  twitterUser: state.app.twitterUser,
  tweets: state.app.tweets,
  nGramOrder: state.app.nGramOrder,
  tweetText: state.app.tweetText,
  nGrams: state.app.nGrams,
  markovs: state.app.markovs
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setTweetsByUser,
  setTweetText,
  setTwitterUser,
  setnGramTable,
  addNewMarkovTweet
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);