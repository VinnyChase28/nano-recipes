import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Thumbnail,
  Button,
  Body,
  Right,
  Switch,
} from "native-base";
import Strings from "../utils/Strings";
import ColorsApp from "../utils/ColorsApp";
import { SimpleLineIcons } from "@expo/vector-icons";

var styles = require("../../assets/files/Styles");
var { height, width } = Dimensions.get("window");

export default class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <View style={styles.container_menu}>
        <View style={styles.sideMenu}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ flex: 1, width: 220, height: 220 }}
            resizeMode="contain"
          />
        </View>

        <ScrollView>
          <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("RecipesCategoriesScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="tag" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST2.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          {/* <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("SearchScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="magnifier" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST4.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem> */}

          <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("FavoritesScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="heart" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST6.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("ContactUsScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="user" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>CONTACT US</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("SettingsScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="settings" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST7.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem
            style={styles.item_menu}
            onPress={this.navigateToScreen("LogoutScreen")}
            icon
          >
            <Left style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="login" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST8.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <SimpleLineIcons name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>
        </ScrollView>
      </View>
    );
  }
}
