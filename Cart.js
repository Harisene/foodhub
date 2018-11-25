import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity,NavigationActions } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default class Cart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      total: this.props.navigation.state.params.total,
     
      dataSource: this.props.navigation.state.params.dataSource,
      count: this.props.navigation.state.params.quantity_array,
      shopname: this.props.navigation.state.params.shopname,
     
      shop_address: this.props.navigation.state.params.shop_address,
      telephone: this.props.navigation.state.params.telephone,
      //show: 0,
      //key: this.props.navigation.state.params.key,
    }
   
    this.key;
    this.total= this.props.navigation.getParam('total');

  }

  componentDidMount(){

    this.setState({ 'total': this.state.total })



  }


  increment(price) {
    this.state.count[this.key]++;
   // this.setState({ 'show': this.state.count[this.key] })
    this.setState({ 'total': this.state.total + price })

  }

  decrement(price) {
    if (this.state.count[this.key] != 0) {
      this.state.count[this.key]--;
     // this.setState({ 'show': this.state.count[this.key] })
      this.setState({ 'total': this.state.total - price })
    }
  }
  delete_item(price) {

    this.setState({ 'total': this.state.total - this.state.count[this.key] * price })
    this.state.count[this.key] = 0;
    //this.setState({ 'show': this.state.count[this.key] })


  }

  data() {

    return this.state.dataSource.map((item, i) => {

      if (this.state.count[i] != 0)
        return (
          <ScrollView>
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
                    <EvilIcons name="plus" size={20} color="black" />


                  </TouchableOpacity>

                  <Text>
                    {this.state.count[i]}
                  </Text>


                  <TouchableOpacity
                    onPress={() => { this.key = i, this.decrement(item.price) }}

                  >
                    <EvilIcons name="minus" size={20} color="black" />


                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.key = i, this.delete_item(item.price) }}
                  >
                    <MaterialIcons name="delete" size={20} color="black" />


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

    return (
      <View style={styles.container}>

        <View style={styles.yellow_bar}>

          <Text style={{ fontWeight: 'bold', fontSize: 30, }}> Cart </Text>
          <Text style={{ fontWeight: 'bold', marginLeft: '50%', marginTop: '5%' }}>Total Rs. {this.state.total}</Text>
         
        </View>
        <View >
          {this.data()}
        </View>

        <TouchableOpacity
          style={styles.register}
          onPress={() => {
            this.props.navigation.navigate("next_item", { quantity_array: this.state.count }),
            this.props.navigation.navigate("next_item", { shopname: this.state.shopname }),           
            this.props.navigation.navigate("next_item", { dataSource: this.state.dataSource }),
            this.props.navigation.navigate("next_item", { total: this.state.total }),
            this.props.navigation.navigate("next_item",{shop_address:this.state.shop_address}),
            this.props.navigation.navigate("next_item",{telephone:this.state.telephone})
            //this.setState({ 'total': null })}
            }}>
          <Text style={styles.add_more}>ADD MORE ITEMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.register}
          onPress={() => { this.props.navigation.navigate("map") }}>
          <Text style={styles.check_out}>CHECK OUT</Text>
          
        </TouchableOpacity>
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
    height: '10%',
    flexDirection: 'row'

  },


  shop: {
    width: '60%',
    height: 80,
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
    backgroundColor: '#f4d538',
    marginTop: 20,
    marginLeft: '10%',
  },

  add_more:{
   marginLeft:'33%',
   marginTop:'3%',
    alignItems:'center',   
    fontWeight:'bold'
  },

  check_out:{
    marginLeft:'36%',
    marginTop:'3%',
     alignItems:'center',   
     fontWeight:'bold'
   }



});
