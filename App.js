import {Container, Header, Content, Footer, Title} from 'native-base';
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';


export default class LayoutExample extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  onPressLearnMore() {
    alert('pressd');
  }

  render() {
      return (
          <Container style={styles.main}>

              <Content>
              <Text style={styles.title}>Sentiment</Text>
              <View style={styles.textBorderStyle}>
              <TextInput
                style={styles.textarea}
                placeholder="Add text here..."
                onChangeText={(text) => this.setState({text})}
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
    height: 40,
    width: 300,
    backgroundColor: 'white',
  },
  textarea: {
    fontFamily: 'Courier',
    fontSize: 15,
    padding: 20,
  },
  submit: {
    padding: 30,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
});
