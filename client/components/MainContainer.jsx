import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Segment, Button, Input, Message } from 'semantic-ui-react';

import { setTweetsByUser, setTwitterUser, setTweetText, setnGramTable, addNewMarkovTweet, resetMarkovs } from '../store/actions/app';

import Tweets from './Tweets.jsx';

class MainContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      twitterUser: 'realDonaldTrump',
      successVisibility: false,
      failureVisibility: false,
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
        this.handleSuccessMessage();
      })
      .catch((err) => {
        console.log('(Client) Failure: Retrieving Tweets from ', twitterUser);
        this.handleFailureMessage();
        console.log(err);
      });
  }

  handleSuccessMessage() {
    this.setState({successVisibility: true});
    setTimeout(() => { this.setState({successVisibility: false});}, 3000);
  }

  handleFailureMessage() {
    this.setState({failureVisibility: true});
    setTimeout(() => { this.setState({failureVisibility: false});}, 3000);
  }

  generateNGrams() {
    var tweetText = this.props.tweetText;
    var nGramOrder = this.props.nGramOrder;
    var nGrams = {};

    //Generate nGram Table with possible following characters
    //Repeated character followings increase probability of the charater appearing
    for( let i = 0; i <= tweetText.length - nGramOrder; i++) {
      var gram = tweetText.substring(i, i + nGramOrder);
      //If the nGram table does not contain the selected gram of length nGramOrder
      //Add a property with key gram and set to empty array
      if (!nGrams[gram]) {
        nGrams[gram] = [];
      }
      //Push character into array as a possibility
      nGrams[gram].push(tweetText.charAt(i + nGramOrder));
    }
    //Add nGram Table to Redux Store
    this.props.setnGramTable(nGrams);
  }

  generateMarkov() {
    var tweetText = this.props.tweetText;
    var nGramOrder = this.props.nGramOrder;
    var nGrams = this.props.nGrams;
    var tweets = this.props.tweets;
    var randomIndex, randomBeginining, currentGram, result;

    //Randomly select a starting work from array of Tweets
    for( let i = 0; i < tweets.length; i++) {
      randomIndex = Math.floor(Math.random() * tweets.length);
      randomBeginining = tweets[randomIndex].split(' ')[0];   
      if(nGrams[randomBeginining]) {
        currentGram = randomBeginining;
        result = currentGram;
        break;
      }
      //If tweets do have a starting word with length of nGramOrder
      //Extract substring with length of order
      if( i === tweets.length - 1) {
        currentGram = tweetText.substring(0, nGramOrder);
        result = currentGram;
      }
    }

    //Generate a Markov of length
    var markovLength = 240;
    for(var i = 0; i < markovLength; i++) {
      //Refrence possible following characters
      var possibilities = nGrams[currentGram];
      //Randomly Select a possible character
      randomIndex = Math.floor(Math.random() * possibilities.length);
      //Add the selected Character to result
      var next = possibilities[randomIndex];
      result += next;
      var len = result.length;
      currentGram = result.substring(len - nGramOrder, len);
    }

    //Add result to Redux Store
    this.props.addNewMarkovTweet(result);
  }

  render () {
    return (
      <Container text style={{ marginTop: '4em' }} >
        <Input type='text' onChange={this.handleChange.bind(this)} placeholder='realDonaldTrump' >
          <input />
          <Button onClick={this.handleClick.bind(this)} icon='twitter'/>
          <Button onClick={this.generateMarkov.bind(this)} content='Generate Markov' />
          <Button onClick={this.props.resetMarkovs} icon='trash'/>
        </Input>
        <Message floating success hidden={!this.state.successVisibility}>
          Retrieved Tweets from @<strong>{this.props.twitterUser}</strong>!
        </Message>
        <Message floating negative hidden={!this.state.failureVisibility}>
          Opps! Twitter sent us an Error. Most likely that user doesn't exist.
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
  addNewMarkovTweet,
  resetMarkovs
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);