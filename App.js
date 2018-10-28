import {createStackNavigator} from 'react-navigation';

import Login from './Login'
import Signin from './Signin'
import Shop from './Shops'
import Items from './Items'
import Cart from './Cart'
import After_Cart from './After_Cart'
//import Maps from './Map'


export default createStackNavigator({
 // login: {screen: Login},
  //signin:{screen: Signin},
 shop:{screen: Shop},
 items:{screen: Items},
  cart:{screen: Cart},
  after_cart:{screen: After_Cart},
  //map:{screen: Maps },

  })

