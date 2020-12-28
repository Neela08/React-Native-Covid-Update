//https://bitwisey.com/project1/staticData.json
import React, { Component } from 'react';
import { SafeAreaView, ActivityIndicator, FlatList, Text, View ,StyleSheet} from 'react-native';
import { Card,CardItem } from 'react-native-elements';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 12,marginTop: 50,fontSize: 30 }}>
	  <Text style={styles.title}>Daily Covid Status</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
			<View>
			
			<Card borderRadius={20}>
			<Text style={styles.header}>{item.country}</Text>
			<Text>Total cases  {item.cases}</Text>
			<Text>Today Cases  {item.todayCases}</Text>
			<Text>Total Deaths {item.deaths}</Text>
			<Text>Today Deaths {item.todayDeaths}</Text>
			<Text>Total Recovered  {item.recovered}</Text>
			<Text>Total Active  {item.active}</Text>
			</Card>
			
			
			</View>
        
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
	title:{
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color:'#ff0066',
	fontSize:28
	},
  header: {
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
	color:'#ff0066'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});