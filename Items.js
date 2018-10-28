import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Loading from './Loading.js';


export default class Items extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      isLoading: true,
      count: [0, 0, 0, 0, 0],
      show: 0,
      total: 0,





      shop_id: this.props.navigation.state.params.shop_id,
      shopname: this.props.navigation.state.params.shop_name,
      shop_address: this.props.navigation.state.params.shop_address,
      telephone: this.props.navigation.state.params.telephone,
    }
    this.port = '192.168.1.3';

    this.key;
    this.price;



  }

  componentDidMount() {

    fetch('http://' + this.port + ':3000/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shop_id: this.state.shop_id })

    }).then((response) => (response.json()))
      .then((responseData) => {

        this.setState({
          dataSource: responseData,
          isLoading: false

        })
        console.log(this.state.dataSource);
      })
      .catch((err) => { console.log(err); });

  }

  increment(price) {
    this.state.count[this.key]++;
    this.setState({ 'show': this.state.count[this.key] })
    this.setState({ 'total': this.state.total + price })

  }

  decrement(price) {
    this.state.count[this.key]--;
    this.setState({ 'show': this.state.count[this.key] })
    this.setState({ 'total': this.state.total - price })

  }

  data() {

    return this.state.dataSource.map((item, i) => {
      return (

        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '20%', backgroundColor: 'blue', marginLeft: '2%', marginTop: '2%' }}>

          </View>

          <View style={styles.shop}
            key={i}>

            <Text>
              {item.item_name}
            </Text>
            <Text>
              Rs.{item.price}
            </Text>



            <View style={{ flexDirection: 'row' }}>


              <TouchableOpacity
                onPress={() => { this.key = i, this.increment(item.price) }}

              >


                <Icon name="plus" size={30} color='black' />
              </TouchableOpacity>

              <Text>
                {this.state.count[i]}
              </Text>


              <TouchableOpacity
                onPress={() => { this.key = i, this.decrement(item.price) }}

              >

                <Icon name="minus" size={30} color='black' />

              </TouchableOpacity>


            </View>

          </View>

        </View>

      )
    }
    )


  }


  render() {

    if (this.state.isLoading == true) {
      return <Loading />
    }
    else {

      return (



        <View style={styles.container}>
          <View style={styles.yellow_bar}>
            <Text style={styles.shopname}>{this.state.shopname}</Text>
            <Text>{this.state.shop_address}</Text>
            <Text>{this.state.telephone}</Text>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <Text style={{ fontWeight: 'bold' }}> TOTAL Rs. </Text>

              <Text style={{ fontWeight: 'bold' }}> {this.state.total}</Text>

            </View>

          </View>
          <View style={{height:200}}>
            <ScrollView>
           
              {this.data()}
           
            </ScrollView>

         </View>
          <TouchableOpacity
            style={styles.register}
            onPress={() => {
              this.props.navigation.navigate("cart", { quantity_array: this.state.count }),
                this.props.navigation.navigate("cart", { shopname: this.state.shopname }),
                this.props.navigation.navigate("cart", { dataSource: this.state.dataSource }),
                this.props.navigation.navigate("cart", { total: this.state.total })
            }}>
            <Text style={styles.login_text}>LOGIN</Text>
          </TouchableOpacity>

        </View>


      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent:'center',
    //alignItems:'center'

  },

  yellow_bar: {
    backgroundColor: '#f4d538',
    height: '20%',

  },

  shopname: {
    fontWeight: 'bold',
    fontSize: 30,

  },


  shop: {
    width: '60%',
    marginTop: '2%',
    marginLeft: '2%',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomColor: 'gray',

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