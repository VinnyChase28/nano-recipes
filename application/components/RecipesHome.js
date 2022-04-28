import React, {PureComponent} from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ImageBackground, Dimensions, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from './AppPreLoader';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import ItemRating from './ItemRating';

var {height, width} = Dimensions.get('window');

class RecipesHome extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      recipes:[]
    };
    this._carousel = {};
  }

    componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_recipes.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             recipes: responseJson.filter((e, index) => { return e.recipe_featured == 'Yes' }),
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

  RecipeDetails = (item) => {
    this.props.navigation.navigate('RecipeDetailsScreen', {item});
  };

    _renderItem ({item, index}) {
        return (
            <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{flex: 1, marginRight: 10}}>
    <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.recipe_image}} style={{ height: 100,  width: width*0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
    </ImageBackground>
    <View style={{ padding: 6,  width: width*0.7, borderColor: '#EEE', borderTopWidth: 0, borderWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
    <Text numberOfLines={1} style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{item.recipe_title}</Text>
    <View style={{flexDirection: 'column', marginBottom: 5}}>
    <Text style={{ fontSize: 13, color: '#a4a4a4', marginBottom: 5}}>{item.category_title}</Text>
    <ItemRating itemId={item.recipe_id} starSize={15} starWidth={75}  />
    </View>

    </View>
    </TouchableOpacity>
        );
    }

	render () {
    
		return (

            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.recipes}
              renderItem={({item}) =>
                <TouchableOpacity onPress={() => this.RecipeDetails(item)} activeOpacity={1} style={{flex: 1, marginRight: 10}}>
    <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.recipe_image}} style={{ height: 100,  width: width*0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
    </ImageBackground>
    <View style={{ padding: 6,  width: width*0.7, borderColor: '#EEE', borderTopWidth: 0, borderWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
    <Text numberOfLines={1} style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{item.recipe_title}</Text>
    <View style={{flexDirection: 'column', marginBottom: 5}}>
    <Text style={{ fontSize: 13, color: '#a4a4a4', marginBottom: 5}}>{item.category_title}</Text>
    <ItemRating itemId={item.recipe_id} starSize={15} starWidth={75}  />
    </View>

    </View>
    </TouchableOpacity>

              }
              sliderWidth={width}
              itemWidth={width*0.7}
          layout={'default'}
          firstItem={1}
          loop={true}
          activeSlideOffset={2}
            />

		)
	}
}

export default withNavigation(RecipesHome);
