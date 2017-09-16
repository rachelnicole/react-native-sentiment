import { Container, Header, Content, Footer, Title } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import config from './config';

export default class LayoutExample extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
  }

  componentWillMount() {
    this.setState({ text: '' });
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
      console.log(Math.round( responseJson.documents[0].score * 10 ) / 10)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <Container style={styles.main}>

        <Content>
          <Text style={styles.title}>Sentiment</Text>
          <View style={styles.textBorderStyle}>
            <TextInput
              style={styles.textarea}
              onChangeText={(text) => this.setState({ text })}
            />
          </View>
          <Button
            onPress={this.onPressLearnMore}
            title="Submit"
            style={styles.submit}
            accessibilityLabel="Learn more about this purple button"
          />
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FF6F69'
  },
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
    height: 70,
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
    padding: 30,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
});
