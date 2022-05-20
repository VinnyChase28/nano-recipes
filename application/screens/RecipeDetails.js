import React, { Component } from "react";
import {
  ImageBackground,
  Dimensions,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Grid, Row, Col } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import ConfigApp from "../utils/ConfigApp";
import Strings from "../utils/Strings";
import BannerAd from "../components/BannerAd";
import HTML from "react-native-htmlview";
import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import ColorsApp from "../utils/ColorsApp";
import Modal from "react-native-modalbox";
import ItemForm from "../forms/ItemForm";
import ItemRating from "../components/ItemRating";
import ItemComments from "../forms/ItemComments";
import ToastModal from "../components/ToastModal";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

var styles = require("../../assets/files/Styles");
var { height, width } = Dimensions.get("window");

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      mute: false,
      shouldPlay: false,
      isLoading: true,
    };
  }

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  saveRecipes = async (
    recipe_id,
    recipe_title,
    recipe_image,
    category_title,
    chef_title,
    recipe_time,
    recipe_description,
    recipe_ingredients,
    recipe_directions,
    recipe_notes,
    recipe_cals,
    recipe_servings,
    url,
    uid
  ) => {
    try {
      let recipe = {
        userId: uid,
        recipe_id: recipe_id,
        recipe_title: recipe_title,
        recipe_image: recipe_image,
        category_title: category_title,
        chef_title: chef_title,
        recipe_time: recipe_time,
        recipe_description: recipe_description,
        recipe_ingredients: recipe_ingredients,
        recipe_directions: recipe_directions,
        recipe_notes: recipe_notes,
        recipe_cals: recipe_cals,
        url: url,
        recipe_servings: recipe_servings,
      };

      const recipes = (await AsyncStorage.getItem("recipes")) || "[]";
      let recipesFav = JSON.parse(recipes);
      let recipesItems = recipesFav.filter(function (e) {
        return e.recipe_id !== recipe_id && e.userId == uid;
      });
      recipesItems.push(recipe);
      AsyncStorage.setItem("recipes", JSON.stringify(recipesItems)).then(() => {
        Toast.show(Strings.ST53, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: false,
          animation: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  openVideo() {
    this.refs.video.open();
  }

  videoClose() {
    this.refs.video.close();
  }

  closeModal() {
    this.refs.modal3.close();
  }

  VideoPlayer = (recipe_video) => {
    this.props.navigation.navigate("VideoPlayerScreen", {
      VideoLINK: recipe_video,
    });
  };

  render() {
    const { item } = this.state;
    let user = firebase.auth().currentUser;
    const ItemDivider = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    };
    //shorten url for display
    let one = item.url;
    let urlOne = new URL(one);

    if (this.state.item == null) {
      <View style={[styles.spinnerContainer, styles.spinner]}>
        <ActivityIndicator size="large" color="orange" />
      </View>;
    }
    return (
      <Container style={styles.background_general}>
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.0)"]}
          style={{
            position: "absolute",
            top: 0,
            zIndex: 100,
            paddingTop: 45,
            paddingHorizontal: 30,
            width: width,
          }}
        ></LinearGradient>
        <StatusBar barStyle="light-content" />

        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.0)"]}
          style={{
            position: "absolute",
            top: 0,
            zIndex: 130,
            paddingTop: 45,
            paddingHorizontal: 30,
            width: width,
          }}
        >
          <Grid>
            <Col
              style={{
                alignItems: "flex-start",
                alignContent: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                activeOpacity={1}
              >
                <Ionicons
                  name="md-arrow-back"
                  style={{ fontSize: 27, color: "#FFFFFF" }}
                />
              </TouchableOpacity>
            </Col>
            <Col
              style={{
                alignItems: "flex-end",
                alignContent: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={this.saveRecipes.bind(
                  this,
                  item.recipe_id,
                  item.recipe_title,
                  item.recipe_image,
                  item.category_title,
                  item.chef_title,
                  item.recipe_time,
                  item.recipe_description,
                  item.recipe_ingredients,
                  item.recipe_directions,
                  item.recipe_notes,
                  item.recipe_cals,
                  item.recipe_servings,
                  item.url,
                  user.uid
                )}
              >
                <Ionicons
                  name="md-heart"
                  style={{ fontSize: 27, color: "#FFFFFF" }}
                />
              </TouchableOpacity>
            </Col>
          </Grid>
        </LinearGradient>

        <ImageBackground
          source={{ uri: item.recipe_image }}
          style={{
            height: height * 0.4,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 120,
              width: width,
              height: height * 0.4,
            }}
          ></View>
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"]}
            style={{
              height: height * 0.3,
              width: width,
              paddingHorizontal: 20,
              alignItems: "flex-start",
              justifyContent: "flex-end",
              paddingBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <LinearGradient
                colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]}
                start={[0, 0]}
                end={[1, 0]}
                style={{
                  paddingHorizontal: 10,
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 7,
                  backgroundColor: ColorsApp.PRIMARY,
                }}
              >
                <Text style={{ color: "#FFF", fontSize: 11 }}>
                  Recipe tag coming soon
                </Text>
              </LinearGradient>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 11,
                  paddingHorizontal: 10,
                  padding: 5,
                }}
              >
                {Strings.ST41} {urlOne.origin}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#FFF",
                marginBottom: 5,
              }}
            >
              {item.recipe_title}
            </Text>
            <ItemRating itemId={item.recipe_id} starSize={18} starWidth={95} />
          </LinearGradient>
        </ImageBackground>

        <ScrollView>
          <Grid style={{ marginTop: 20, marginBottom: 10 }}>
            <Col
              style={{
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/cooktime.png")}
                style={{ width: 30, height: 30, marginBottom: 7 }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 3,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {Strings.ST16}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.recipe_time + " min"}
              </Text>
            </Col>

            <Col
              style={{
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/servings.png")}
                style={{ width: 30, height: 30, marginBottom: 7 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 3,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {Strings.ST15}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.recipe_servings}
              </Text>
            </Col>

            <Col
              style={{
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/calories.png")}
                style={{ width: 30, height: 30, marginBottom: 7 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 3,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {Strings.ST17}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {/* {item.recipe_cals} */}
                Coming Soon
              </Text>
            </Col>
          </Grid>

          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Collapse isCollapsed={true}>
              <CollapseHeader>
                <LinearGradient
                  colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.collapseStyle}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {Strings.ST21.toUpperCase()}
                  </Text>
                </LinearGradient>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ margin: 10, backgroundColor: "#FFF" }}>
                  <FlatList
                    data={item.recipe_ingredients}
                    renderItem={({ item, index }) => (
                      <Text style={{ padding: 5 }}>{item}</Text>
                    )}
                    ItemSeparatorComponent={ItemDivider}
                    keyExtractor={(index) => index + 1}
                  />
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse isCollapsed={true}>
              <CollapseHeader>
                <LinearGradient
                  colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.collapseStyle}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {Strings.ST22.toUpperCase()}
                  </Text>
                </LinearGradient>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ margin: 10, backgroundColor: "#FFF" }}>
                  <FlatList
                    data={item.recipe_directions}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.container,
                          {
                            // Try setting `flexDirection` to `"row"`.
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            padding: 4,
                          }}
                        >
                          <Text
                            style={{
                              padding: 3,
                              color: "#ff8c00",
                              fontWeight: "bold",
                              fontFamily: "Cochin",
                              fontSize: 30,
                            }}
                          >
                            {index + 1 + " "}
                            {"\n"}
                          </Text>
                          {item}
                        </Text>
                      </View>
                    )}
                    ItemSeparatorComponent={ItemDivider}
                    keyExtractor={(index) => index + 1}
                  />
                </View>
              </CollapseBody>
            </Collapse>
          </View>

          <View
            style={{ height: 1, backgroundColor: "#EEE", width: width }}
          ></View>

          <View style={{ marginBottom: 20, backgroundColor: "#FFF" }}>
            <ListItem icon style={{ borderBottomWidth: 0 }}>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.4)",
                  }}
                >
                  {Strings.ST50.toUpperCase()}
                </Text>
              </Body>
              <Right style={{ borderBottomWidth: 0 }}>
                <TouchableOpacity
                  onPress={() => this.refs.modal3.open()}
                  activeOpacity={1}
                >
                  <View
                    style={{
                      padding: 3,
                      paddingRight: 11,
                      paddingLeft: 11,
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: "rgba(0,0,0,0.3)",
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>
                      {" "}
                      {Strings.ST83.toUpperCase()}{" "}
                      <Ionicons active name="ios-add" />
                    </Text>
                  </View>
                </TouchableOpacity>
              </Right>
            </ListItem>

            <View
              style={{
                height: 1,
                backgroundColor: "#EEE",
                width: width,
                marginBottom: 5,
              }}
            ></View>

            <View style={{ margin: 15, marginTop: 0 }}>
              <ItemComments itemId={item.recipe_id} />
            </View>
            <View style={{ height: height * 0.1 }}></View>
          </View>
        </ScrollView>

        <Modal
          style={[styles.modal, styles.modal3]}
          position={"center"}
          ref="modal3"
          swipeArea={20}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          isDisabled={this.state.isDisabled}
          coverScreen={true}
        >
          <View style={{ marginTop: 8, marginBottom: 8 }}>
            <ItemForm
              itemId={this.state.item.recipe_id}
              closeModal={() => this.closeModal()}
            />
          </View>
        </Modal>

        {/* <BannerAd /> */}
      </Container>
    );
  }
}
