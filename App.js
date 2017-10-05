import { Container, Header, Content, Footer, Title, Button } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import config from './config';

export default class LayoutExample extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', emoji: '' };
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
  }

  componentWillMount() {
    this.setState({
      text: '',
      bgColor: '#FF6F69',
      emoji: ''
    });
  }

  onPressLearnMore() {
    var data = {
      "documents": [
        {
          "language": "en",
          "id": "sdfasdf",
          "text": this.state.text
        }
      ]
    };

    return fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': config.KEY,
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var backgroundColor = this.backgroundMood(Math.round(responseJson.documents[0].score * 10) / 10);
        

        this.setState({ bgColor: backgroundColor });

        if ((Math.round(responseJson.documents[0].score * 10) / 10) <= .4 || (Math.round(responseJson.documents[0].score * 10) / 10) == 0) {
          this.setState({ emoji: '🙁' });
        }
        if ((Math.round(responseJson.documents[0].score * 10) / 10) >= .6) {
          this.setState({ emoji: '😃' });
        }
        if ((Math.round(responseJson.documents[0].score * 10) / 10) == .5) {
          this.setState({ emoji: '😐' });
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  backgroundMood(value) {
    var returnColor;
    if (value == 0) {
      return '#7F1437';
    }
    if (value == .1) {
      return '#7F1437';
    }
    if (value == .2) {
      return '#B01C41';
    }
    if (value == .3) {
      return '#CC2C66';
    }
    if (value == .7) {
      return '#208946';
    }
    if (value == .8) {
      return '#2E9C5F';
    }
    if (value == .9) {
      return '#31C774';
    }
    if (value == 1) {
      return '#29EB94';
    }
    else {
      return '#3D81DF';
    }

  }

  render() {
    return (
      <Container style={{ backgroundColor: this.state.bgColor, flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center' }}>

        <Content style={{flex: 1}}>
          <Text style={styles.title}>Sentiment</Text>
          <View style={styles.textBorderStyle}>
            <TextInput
              style={styles.textarea}
              onChangeText={(text) => this.setState({ text })}
            />
          </View>
          <Button bordered light
            onPress={this.onPressLearnMore}
            style={styles.submit}
          >
            <Text style={{color: 'white', textAlign: 'center', flex: 1 }}>Submit</Text>
          </Button>
          <View style={styles.emoji}>
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 90}}>
            {this.state.emoji}
            </Text>
          </View>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    padding: 50,
    fontFamily: 'Courier',
  },
  textBorderStyle: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 10,
    height: 120,
    width: 300,
    backgroundColor: 'white',
  },
  textarea: {
    fontFamily: 'Courier',
    fontSize: 15,
    padding: 20,
    color: 'black'
  },
  submit: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  emoji: {
    padding: 10
  }
});
