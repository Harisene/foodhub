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
      //show: 0,
      total: 0,


      shop_id: this.props.navigation.state.params.shop_id,
      rating: this.props.navigation.state.params.rating,
      shopname: this.props.navigation.state.params.shop_name,
      shop_address: this.props.navigation.state.params.shop_address,
      telephone: this.props.navigation.state.params.telephone,
    }
    this.port = '192.168.1.3';
    //this.port='192.168.0.155'
    this.key;
    this.price;



  }

  componentDidMount() {

    fetch('http://'+this.port+':3000/items', {
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
    //this.setState({ 'show': this.state.count[this.key] })
    this.setState({ 'total': this.state.total + price })

  }

  decrement(price) {
    if(this.state.count[this.key]!=0){
    this.state.count[this.key]--;
   // this.setState({ 'show': this.state.count[this.key] })
    this.setState({ 'total': this.state.total - price })
    }

  }

  data() {

    return this.state.dataSource.map((item, i) => {
      
      return (
        
<ScrollView>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ width: '20%', backgroundColor: 'blue', marginLeft: '2%', marginTop: '2%' }}>

          </View>

          <View style={styles.shop}
           keyExtractor={item => item.item_id}>

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

        </ScrollView>

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
          <View style={{flexDirection:'row'}}>
            <Text style={styles.shopname}>{this.state.shopname}</Text>
            <Text style={styles.rating} >{this.state.rating}</Text>
            <Icon style={styles.rating_icon} name="star" size={20} color='black' />
            </View>
            <Text>{this.state.shop_address}</Text>
            <Text>{this.state.telephone}</Text>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <Text style={{ fontWeight: 'bold' }}> TOTAL Rs. </Text>

              <Text style={{ fontWeight: 'bold' }}> {this.state.total}</Text>
            
             

            </View>
            <TouchableOpacity
              style={{marginTop:-27,marginLeft:'80%'}}
               onPress={() => {
                  this.props.navigation.navigate("cart", { quantity_array: this.state.count }),
                    this.props.navigation.navigate("cart", { shopname: this.state.shopname }),
                    this.props.navigation.navigate("cart", { dataSource: this.state.dataSource }),
                    this.props.navigation.navigate("cart", { total: this.state.total }),
                    this.props.navigation.navigate("cart",{shop_address:this.state.shop_address}),
                    this.props.navigation.navigate("cart",{telephone:this.state.telephone})
                }}>

                <Icon name="cart" size={40} color='black' />

              </TouchableOpacity>

          </View>
     
         <View style={{height:400}}>
              {this.data()}
              </View>
         

    
      

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

  rating:{
    fontWeight:'bold',
    marginTop:'4%',
    marginLeft:'2%'
  },
  rating_icon:{
    fontWeight:'bold',
    marginTop:'4%',
    marginLeft:'1%'
  },



  shop: {
    width: '60%',
    height:80,
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