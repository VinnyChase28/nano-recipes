import React, {Component} from 'react';
import * as firebase from 'firebase';
import { withNavigation } from '@react-navigation/compat';
import {TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';
import Strings from '../utils/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class RecipeFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      recipes: []
    }

  }

  componentDidMount () {
    this.fetchRecipes();
  }

  RecipeDetails = (item) => {
    this.props.navigation.navigate('RecipeDetailsScreen', {item});
  };

ListEmptyView = () => {
    return (
      <ListEmpty/>
    );
  }

removeRecipe = async (recipe_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const recipes = await AsyncStorage.getItem('recipes');
let recipesFav = JSON.parse(recipes);
recipesItems = recipesFav.filter(function(e){ return e.recipe_id !== recipe_id && e.userId == uid })

await AsyncStorage.setItem('recipes', JSON.stringify(recipesItems));

this.setState({ 
...this.state, 
recipes: recipesItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<List>

<FlatList
          data={ this.state.recipes }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.RecipeDetails(item)} >
              <Thumbnail size={80} source={{ uri: ConfigApp.URL+'images/'+item.recipe_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>
                {item.recipe_title}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Image source={require('../../assets/images/cooktime.png')} style={{width: 15, height: 15, marginLeft: 12, marginRight: -8}} />
                <Text style={{ fontSize: 12, color: '#9e9e9e'}}>{item.recipe_time}</Text>
                <Image source={require('../../assets/images/calories.png')} style={{width: 15, height: 15, marginRight: -8}} />
                <Text style={{ fontSize: 12, color: '#9e9e9e'}}>{item.recipe_cals}</Text>
                </View>
              </Body>
              <Right>
                <TouchableOpacity onPress={this.removeRecipe.bind(this, item.recipe_id)} activeOpacity={1}>
                <Text note>
                <Icon name="trash" style={{fontSize: 18}}/>
                </Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this.ListEmptyView}


        /> 

</List>

    )
  }

    async fetchRecipes () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let recipesJSON= await AsyncStorage.getItem('recipes');
      let recipesFav = JSON.parse(recipesJSON);
      recipesItems = recipesFav.filter(function(e){
            return e.userId == uid
        })
      const recipesArray = recipesItems || [];
      this.setState({
        ...this.state,
        recipes: recipesArray
      });
  }

}

export default withNavigation(RecipeFav);
