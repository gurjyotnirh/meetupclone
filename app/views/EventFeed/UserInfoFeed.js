import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import { RoundImage } from '../../MokUI/MokUI';
import Constants from '../../MokUI/UIConstants';
import {List, ListItem, Icon, Button} from 'react-native-elements';
import EventFeedItem from './EventFeedItem';
import {setUserConnections,getUserConnections, openEditProfile, getMyprofile,setUserProfile} from '../../actions'
import {GET_EVENT_INFO,FOLLOW_USER,UNFOLLOW_USER} from '../../api'

export default class UserInfoFeed extends Component {
  _val = 0; 
  _isDataCollected = false;
  _isFollowing = false;

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.state = {
      idOfEventsHostedByUser:this.props.eventsHostedByUser,
      eventsHostedByUser:[],
      refreshing:false,
      isLoading:false

    };

  }

  navigateToConnections(self, followerOrFollowing){
    
      const {props} = self;
        if(self._val == 0){
        this.setState({isLoading:true});          
        self._val++;
        props.dispatch(setUserConnections(followerOrFollowing,props._id)).then(()=>{
          props.dispatch(getUserConnections());  
          this.setState({isLoading:false});
          setTimeout(()=>{self._val = 0; }, 1000);
        });
      }
  }


  follow(){
    this.setState({isLoading:true});

    if(!this._isFollowing){
      axios.post(FOLLOW_USER(this.props.userId,this.props._id)).then((response)=>{
        this.setState({isLoading:false,followButtonText:'following',followButtonColor:Constants.color4});
        this._isFollowing = true;
      }).catch(()=>{
        this.setState({isLoading:false});
      })
    }else{
      axios.post(UNFOLLOW_USER(this.props.userId,this.props._id)).then((response)=>{
        this.setState({isLoading:false,followButtonText:'follow',followButtonColor:Constants.color2});
        this._isFollowing = false;
      }).catch(()=>{
        this.setState({isLoading:false});
      })      
    }

  }



  renderHeader(self) {

    const {props} = self;
    let firstName = props.firstname ? props.firstname : "First" ;
    let lastname = props.lastname ? props.lastname: "Lastname";
    let followingNumber =props.following ? props.following.length : 0;
    let followersNumber = props.followers ? props.followers.length : 0;
    let numberOfEvents = props.eventsHostedByUser ? props.eventsHostedByUser.length : 0;
    let userProfilePic = (props.avatarurl != undefined && props.avatarurl != "new") ? props.avatarurl:"http://www.thedigitalkandy.com/wp-content/uploads/2016/01/facebook-no-profile.png";
    userProfilePic += '?random_number='+ new Date().getTime();
    return (
      <View>
          <View style={{flexDirection:'row',alignItems: 'stretch', paddingBottom:10}}>


            <View >
                <View style={styles.profileInfo}>
                  <RoundImage size={100} source={userProfilePic}/>
                  <Text style={styles.name}>{firstName+" "+lastname}</Text>
                </View>
            </View> 

          <View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
              style={[styles.connectionInfoContainer]} 
              onPress={()=>{self.navigateToConnections(self,"follower")}}>
                <Text style={styles.connectionText}>{followersNumber}</Text>
                <Text style={{color:'grey'}}>Follower</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={[styles.connectionInfoContainer]}
                onPress={()=>{self.navigateToConnections(self,"following")}}>
                <Text style={styles.connectionText}>{followingNumber}</Text>
                <Text style={{color:'grey'}}>Following</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.connectionInfoContainer]}>
                <Text style={styles.connectionText}>{numberOfEvents}</Text>
                <Text style={{color:'grey'}}>Events</Text>
              </TouchableOpacity>
            </View>
            {this.props.isMyProfile && 
              <Button
              small
              icon={{name: 'create'}}
              onPress={()=>{this.props.dispatch(openEditProfile())}}
              backgroundColor={Constants.color2}
              buttonStyle={styles.messageButton}
              title='Edit profile' />}

              <View style={{paddingTop:5}}>
                <ActivityIndicator
                animating={this.state.isLoading}
                size="small"/>
              </View>

            {!this.props.isMyProfile && <Button
              small
              icon={{name: 'message'}}
              onPress={()=>{Linking.openURL("mailto:tushar_chuatni@gmail.com").catch(err => console.log('An error occurred', err));}}
              backgroundColor={Constants.color2}
              buttonStyle={styles.messageButton}
              title='Message' /> &&
              <Button
              small
              backgroundColor={this.state.followButtonColor}
              buttonStyle={styles.followButton}
              onPress={this.handelFollow}
              title={this.state.followButtonText}
              onPress={()=>{this.follow()} } />}

          </View>
          
        </View>
        <View style={[styles.separator,{flex:1}]} /> 
      </View>);
  }

  setFollowing(){

    if(!this.props.followers){
      this._isFollowing = false;
      this.setState({followButtonText:'follow',followButtonColor:Constants.color2});
    }else{
      if(this.props.followers.includes(this.props.userId)){
        this._isFollowing = true;
        this.setState({followButtonText:'following',followButtonColor:Constants.color4});
      }else{
        this.setState({followButtonText:'follow',followButtonColor:Constants.color2});
      }
      
    }
  }   

  componentDidMount(){
    if(this.props.eventsHostedByUser&&(this.props.eventsHostedByUser.length == 0)){
        this.setState({isLoading:false});
    }else{
        this.setState({isLoading:true});
    }


    if(this.props.userId != this.props._id){
      this.setFollowing();
      if(this._isFollowing){
        this.setState({followButtonText:'following',followButtonColor:Constants.color4});
      }else{
        this.setState({followButtonText:'follow',followButtonColor:Constants.color2});
      }
    }
  }



  getUserEventsInfo(){
    var lenghtOfEventsByUser = this.props.eventsHostedByUser ? this.props.eventsHostedByUser.length:0;
    var lenghtofEventsId = this.state.eventsHostedByUser ? this.state.eventsHostedByUser.length : 0;
    
    if((lenghtOfEventsByUser != lenghtofEventsId)&& !this._isDataCollected){
        this._isDataCollected=true;
        
        let getEvents = this.props.eventsHostedByUser ? this.props.eventsHostedByUser.map((eventId, index)=>{    
          return axios.get(GET_EVENT_INFO(eventId, this.props.userId));
        }): [];
        if(getEvents.length == 0){
          this.setState({refreshing:false});
        }
          axios.all(getEvents).then(responses => {
          let temp = responses.map((response) =>{
            if(response.data != null){
              return response.data;
            }
            return {};
          })
          this.setState({eventsHostedByUser:temp,isLoading:false});
        }).catch((error)=>{
        console.log("User info feed error "+error);
        this.setState({isLoading:false});
        });
    }
  }

  reloadProfile(){
    this.setState({refreshing:true});
    
    if(this.props.isMyProfile){
      this.props.dispatch(getMyprofile()).then(()=>{
        this.setState({refreshing:false});
        this._isDataCollected = false;
        this.getUserEventsInfo();
      }).catch(err => {console.log("There was an error updating my profile "+err);})
    }else{
      this.props.dispatch(setUserProfile(this.props._id)).then(()=>{
        this.setState({refreshing:false});
        this.getUserEventsInfo()
      }).catch(err => {console.log("There was an error updating other profile "+err);})
    }
  }

  render() {
  var lenghtOfEventsByUser = this.props.eventsHostedByUser ? this.props.eventsHostedByUser.length:0;
  
  if(lenghtOfEventsByUser != 0){
    this.getUserEventsInfo();
  }

   return(
        <View style={styles.container}>
            <FlatList
             data={this.state.eventsHostedByUser}
             // extraData={this.state} 
             keyExtractor={(item, index) => index}
             renderItem={({item, index})=>(<EventFeedItem key={`entry-${index}`} {...item}/>)}
             ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
             ListHeaderComponent={this.renderHeader(this)}
            onRefresh={()=>{this.reloadProfile()}}
            refreshing={this.state.refreshing}           
           />
        </View>);
  }

}
const MARGIN = 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:Constants.screenHeight,
    backgroundColor: Constants.color1,
    paddingBottom: 10
  },
  eventInfoHeaderImage:{
  	paddingTop:20,
  	alignItems:'flex-end',
  	height:150
  },profileInfo:{
  	alignItems:'flex-start',
  	marginTop:20,
    marginLeft:15
  },name:{
  	fontSize:15,
  	fontWeight:'bold',
  	marginBottom:5
  },infoContainer:{
  	margin:MARGIN, 
  	marginRight:0
  },connectionInfoContainer:{
    marginTop:30,
    alignItems:'center',
    padding:10
  },connectionText:{
    fontWeight:'bold',
    fontSize:20, 
    color:Constants.color4
  },info:{
  	marginTop:10,
  	color:Constants.color3
  },messageButton:{
    height:20,
    borderRadius:5,
    margin:0
  },followButton:{
    height:20,
    borderRadius:5,
    marginTop:5
  },
  userPhotosIcon:{
  	height:70,
  	width:70,
  	marginRight:MARGIN,
  },   
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor:Constants.tableDividerColor,
  }

});

var mapStateToProps = (state) =>{
    return {
      userId: state.auth.user_id
  }
}


module.exports = connect(mapStateToProps)(UserInfoFeed);