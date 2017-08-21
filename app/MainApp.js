/*
NOTES: 
create event: control-point

*/
import React from 'react';
import {ScrollView, 
	View, 
	Text, 
	Image,
	StyleSheet 	} from 'react-native';
import TestView from './views/TestView';
import Feed from './views/EventFeed/Feed';
import EventInfo from './views/EventInfo/EventInfo';
import Connections from './views/Connections/Connection';
import Settings from './views/Settings/Settings';
import { StackNavigator, TabNavigator, DrawerNavigator,DrawerItems} from 'react-navigation';
import { Icon } from 'react-native-elements'
import Constants  from './MokUI/UIConstants';
//TODO: remove
import UserProfile from './views/Profile/Profile';

const MainTabs = TabNavigator({
		EventFeed: {
			screen: Feed,
			navigationOptions:{
				tabBarLabel:'Event Feed',
				tabBarIcon: ({tintColor}) => <Icon name="list" size={28} color={tintColor}/>,
			}
		},	
		UserProfile: { 
			screen: UserProfile,
			navigationOptions:{
				tabBarLabel:"User profile",
				tabBarIcon: ({tintColor}) => <Icon name="person-pin" size={28} color={tintColor}/>,
			}
		},
		 SearchEvent:{ 
			//will be the tinder cards according 
			screen: TestView,
			navigationOptions:{
				tabBarLabel:"Around me",
				tabBarIcon: ({tintColor}) => <Icon name="adjust" size={28} color={tintColor}/>,
			},
		}, 
	},	{
		tabBarOptions:{
			activeTintColor: Constants.color2,
			showIcon:true
		}
	});


export const MokApp = DrawerNavigator({
	MainTabs:{
		screen: MainTabs,
		title: 'Home',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="home" color={tintColor}/>),
			drawerLabel:'Home'
		}
	}, Connections:{ 
		//this will have follower and following
		screen: Connections,
		title: 'Connections',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="group" color={tintColor}/>),
		}

	}, Profile: {
		//will be able to edit the profile
		screen: TestView,
		title: 'Profile',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="account-circle" color={tintColor}/>)
		}		
	}, Settings:{
		screen: Settings,
		title: 'Settings',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="settings" color={tintColor}/>),
		}
	},Logout:{
		screen: TestView,
		title: 'Log out',
		navigationOptions:{
			drawerIcon:({tintColor})=> (<Icon name="exit-to-app" color={tintColor}/>),
		}
	}
},{
	contentComponent:props => drawerMenu({props}),
     contentOptions: {
     style: {
       flex: 1,
       paddingTop: 15,
      }
   	}

  });

let drawerMenu = ({props}) =>{
	return (<ScrollView style={{backgroundColor:'white'}}>
		<View style={styles.container}> 
			<View style={{justifyContent:'center',flex:1, alignItems:'center'}}>
				<Image style={{width: 100, height: 100, borderRadius:50, borderColor:'white', borderWidth:2,alignItems: 'center',justifyContent:'center'}}  
				source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
				<Text style={{justifyContent:'center',marginTop:10,fontSize:20}}> Faceook image </Text>
			</View>
		</View>
		<DrawerItems {...props} /></ScrollView>);

};


const styles = StyleSheet.create({

	container:{
		height: 150,
    	justifyContent: 'center',
    	alignItems: 'center',
    	flex:1,
    	marginTop:30,

	}
});





