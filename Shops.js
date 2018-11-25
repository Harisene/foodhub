import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Picker, TextInput,KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';



export default class Shops extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      data: [],
      LocationData: [],
      pickervalue: '',
      pickerfood: '',
      foodData: []

    }
    this.foodname = null
    this.port = '192.168.1.3'
    //this.port='192.168.0.155'
  }


  componentDidMount() {

    fetch('http://' + this.port + ':3000/shopdetails')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson,
          data: responseJson,
          //LocationData:responseJson
        })
        // console.log(responseJson);
      })

      .catch((error) => {
        console.log(error)

      });






  }

  shopLocation(shoplocation) {

    fetch('http://' + this.port + ':3000/shopLocation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shopLocation: shoplocation })

    }).then((response) => (response.json()))
      .then((responseData) => {

        this.setState({
          dataSource: responseData,

        })
        console.log(this.state.dataSource);
      })
      .catch((err) => { console.log(err); });


  }

  getButton = () => {


    fetch('http://' + this.port + ':3000/foodtype', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ foodName: this.foodname })
    }).then((response) => (response.json()))
      .then((responseData) => {

        this.setState({
          LocationData: responseData,

        })
        console.log(responseData);
      })
      .catch((err) => { console.log(err); });

  }

  searchFilterFunction = text => {
    const newData = this.state.data.filter(item => {
      const itemData = `${item.shop_name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    if (newData == [])
      this.setState({ dataSource: this.state.data });
    else
      this.setState({ dataSource: newData });
  };





  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '2%', borderRadius: 30, }}>


        <TouchableOpacity
          style={styles.shop}
          onPress={() => {
            this.props.navigation.navigate("items", { shop_id: item.shop_id }),
            this.props.navigation.navigate("items", { shop_name: item.shop_name }),
            this.props.navigation.navigate("items", { rating: item.rating }),
            this.props.navigation.navigate("items", { shop_address: item.address }),
            this.props.navigation.navigate("items", { telephone: item.contact_no })
          }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '2%' }}>
              {item.shop_name}
            </Text>
            <Text style={styles.rating} >{item.rating}</Text>

            <Icon style={styles.rating_icon} name="star" size={15} color='black' />
          </View>
          <Text style={{ marginLeft: '2%' }}>
            {item.address}
          </Text>
        </TouchableOpacity>
      </View>
    )


  }

  render() {

    return (
     
      <View style={styles.container}>
 
        <View style={styles.yellow_bar}>

          <Text style={styles.title}> Select Your Favourite Shop</Text>


          <View style={styles.search_view}>


            <Picker style={styles.picker}
              selectedValue={this.state.pickervalue}
              onValueChange={(itemvalue, itemIndex) => (this.setState({ pickervalue: itemvalue }), this.shopLocation(itemvalue))}>
              <Picker.Item label="Select by Location" value="----" />
              <Picker.Item label="Colombo" value="Colombo" />
              <Picker.Item label="Athurugiriya" value="Athurugiriya" />
              <Picker.Item label="Galle" value="Galle" />
              <Picker.Item label="Gampaha" value="Gampaha" />
            </Picker>

          </View>

          <View>
            <TextInput
              style={styles.search_shop}
              onChangeText={(text) => this.searchFilterFunction(text)}
              value={this.state.text}
              placeholder='Search by Shop name'
              placeholderTextColor='black'
              underlineColorAndroid={'rgba(0,0,0,0)'}

            >


            </TextInput>




          </View>
        </View>
        <KeyboardAvoidingView  behavior='padding'>   
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '20%', backgroundColor: 'blue', marginLeft: '2%', marginTop: '2%' }}>

          </View>
          <FlatList
            style={styles.data}
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={item => item.shop_id}
          >


          </FlatList>



        </View>
        </KeyboardAvoidingView>  

      </View>
    
    

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,



  },


  yellow_bar: {
    backgroundColor: '#f4d538',
    height: '30%',

  },

  title: {
    marginTop: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },

  search_view: {
    marginTop: '3%',
    backgroundColor: 'white',
    marginHorizontal: '10%',
    width: '80%',
    height: '27%',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center'
  },
  rating:{
    fontWeight:'bold',
    marginTop:'1%',
    marginLeft:'2%'
  },
  rating_icon:{
    fontWeight:'bold',
    marginTop:'2%',
    marginLeft:'1%'
  },


  picker: {
    width: '80%',
    paddingLeft: '20%',

  },

  search_shop:
  {
    backgroundColor: 'white',
    marginTop: '5%',
    width: '80%',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    marginLeft: '10%',
    paddingHorizontal: '10%',
  },

  data: {
    marginTop: '2%',
    marginLeft: '2%',
    width: '80%',

  },

  login_button: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(53,172,240)',
    marginLeft: '10%',

  },

  shop: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderBottomColor: 'gray',

  },


  selectlocation_text: {
    fontSize: 16,
    marginTop: 3.5


  },
  register: {
    width: '80%',
    height: 45,
    borderRadius: 20,
    backgroundColor: 'rgb(53,172,240)',
    marginTop: 20,
    marginLeft: '10%',
  },

});
