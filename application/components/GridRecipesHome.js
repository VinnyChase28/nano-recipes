import React, { PureComponent } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Footer,
  Icon,
  Item,
  Input,
  FooterTab,
  Button,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Thumbnail,
} from "native-base";
import Icono from "react-native-vector-icons/Ionicons";
import SwiperFlatList from "react-native-swiper-flatlist";
import ConfigApp from "../utils/ConfigApp";
import AppPreLoader from "./AppPreLoader";
import GridView from "react-native-super-grid";
import Strings from "../utils/Strings";
import { LinearGradient } from "expo-linear-gradient";
import ColorsApp from "../utils/ColorsApp";

var styles = require("../../assets/files/Styles");
var { height, width } = Dimensions.get("window");
import { SUPABASE_KEY } from "@env";

class GridRecipesHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    return fetch(
      "https://fodlmtsqwocmyxtgpqiw.supabase.co/rest/v1/recipes?&select=*",
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Range: "0-9",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            recipes: responseJson,
          },

          function () {
            console.log(responseJson);
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RecipeDetails = (item) => {
    this.props.navigation.navigate("RecipeDetailsScreen", { item });
  };

  render() {
    return (
      <List>
        <FlatList
          data={this.state.recipes}
          refreshing="false"
          renderItem={({ item }) => (
            <ListItem
              style={{
                paddingLeft: 0,
                marginLeft: 0,
                backgroundColor: "#FFF",
                opacity: 1,
                borderColor: "rgba(0,0,0,0.05)",
                borderBottomWidth: 1,
              }}
              onPress={() => this.RecipeDetails(item)}
            >
              <Thumbnail
                size={80}
                source={{ uri: item.recipe_image }}
                style={{ paddingLeft: 10, marginLeft: 10, borderRadius: 10 }}
              />
              <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}
                >
                  {item.recipe_title}
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Image
                    source={require("../../assets/images/cooktime.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 12,
                      marginRight: -8,
                    }}
                  />
                  <Text style={{ fontSize: 12, color: "#9e9e9e" }}>
                    {item.recipe_time}
                  </Text>
                  <Image
                    source={require("../../assets/images/calories.png")}
                    style={{ width: 15, height: 15, marginRight: -8 }}
                  />
                  <Text style={{ fontSize: 12, color: "#9e9e9e" }}>
                    {item.recipe_cals}
                  </Text>
                </View>
              </Body>
              <Right>
                <Text note>
                  <Icon name="ios-arrow-forward" style={{ fontSize: 16 }} />
                </Text>
              </Right>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    );
  }
}

export default withNavigation(GridRecipesHome);
