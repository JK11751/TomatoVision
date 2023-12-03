import React from 'react';
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

const DATA = [
  {
    id: 1,
    name: 'Tomato Leaf Bacterial spot',
    description: 'This disease is caused by bacteria that infect the leaves, stems, and fruits of tomato plants. It causes small, dark, water-soaked spots that may coalesce into larger lesions. The infected tissue may fall out, leaving holes in the leaves or fruits. To manage this disease, use pathogen-free seeds and transplants, avoid overhead irrigation, prune lower leaves, and apply copper-based fungicides as a preventive measure.'
  },
  {
    id: 2,
    name: 'Tomato Leaf Early blight',
    description: 'This disease is caused by a fungus that attacks the lower leaves, stems, and fruits of tomato plants. It causes brown spots with concentric rings that resemble a target. The infected leaves may turn yellow and drop off, exposing the fruits to sunscald. To manage this disease, remove and destroy infected plant debris, rotate crops, mulch the soil, water at the base of the plants, and apply fungicides as a preventive or curative treatment.'
  },
  {
    id: 3,
    name: 'Tomato Leaf Healthy',
    description: 'This is not a disease, but a desirable condition for tomato plants. Healthy tomato plants have green, vigorous foliage, strong stems, and abundant fruits. To maintain healthy tomato plants, provide adequate sunlight, water, nutrients, and air circulation, and protect them from pests and diseases.'
  },
  {
    id: 4,
    name: 'Tomato Leaf Late blight',
    description: 'This disease is caused by a fungus-like organism that infects the leaves, stems, and fruits of tomato plants. It causes gray, water-soaked lesions that turn brown and necrotic. The infected tissue may be covered with white, fuzzy growth. The disease can spread rapidly and kill the entire plant. To manage this disease, use resistant varieties, avoid planting tomatoes near potatoes, remove and destroy infected plants, and apply fungicides as a preventive or curative treatment.'
  },
  {
    id: 5,
    name: 'Tomato Leaf mold',
    description: 'This disease is caused by a fungus that infects the upper surface of the leaves of tomato plants. It causes yellow or green spots that turn brown and moldy. The infected leaves may curl and drop off. The disease is favored by high humidity and low light. To manage this disease, increase air circulation, prune lower leaves, and apply fungicides as a preventive or curative treatment.'
  },
  {
    id: 6,
    name: 'Not disease',
    description: 'This is a default class for images other than tomato leaf diseases.'
  },
  {
    id: 7,
    name: 'Tomato Septoria leaf spot',
    description: 'This disease is caused by a fungus that infects the lower leaves of tomato plants. It causes small, circular, brown spots with dark margins and light centers. The infected leaves may turn yellow and drop off, reducing the photosynthesis and yield of the plant. To manage this disease, remove and destroy infected plant debris, rotate crops, mulch the soil, water at the base of the plants, and apply fungicides as a preventive or curative treatment.'
  },
  {
    id: 8,
    name: 'Tomato Leaf Spider mites',
    description: 'These are not a disease, but a type of pest that feeds on the sap of tomato plants. They cause tiny, yellow or white speckles on the leaves, which may turn brown and dry. The infested leaves may also have fine webbing on the underside. Spider mites can reduce the vigor and yield of the plant. To manage spider mites, use resistant varieties, avoid excessive nitrogen fertilization, spray the plants with water or insecticidal soap, and release predatory mites or other natural enemies.'
  },
  {
    id: 9,
    name: 'Tomato Leaf Target spot',
    description: 'This disease is caused by a fungus that infects the leaves and fruits of tomato plants. It causes brown spots with concentric rings that resemble a target. The infected leaves may turn yellow and drop off, and the infected fruits may crack and rot. The disease is favored by warm and wet conditions. To manage this disease, use resistant varieties, remove and destroy infected plant debris, rotate crops, mulch the soil, water at the base of the plants, and apply fungicides as a preventive or curative treatment.'
  },
  {
    id: 10,
    name: 'Tomato yellow leaf curl virus',
    description: 'This disease is caused by a virus that is transmitted by whiteflies. It causes the leaves of tomato plants to curl upward and turn yellow, and the fruits to be small and deformed. The infected plants may be stunted and unproductive. The disease is difficult to control once it occurs. To manage this disease, use resistant varieties, control whiteflies, remove and destroy infected plants, and cover the plants with insect-proof nets.'
  },
  {
    id: 11,
    name: 'Tomato mosaic virus',
    description: 'This disease is caused by a virus that is transmitted by contact with infected plants, seeds, or tools. It causes the leaves of tomato plants to be mottled with yellow and green patches, and the fruits to be distorted and discolored. The infected plants may be stunted and unproductive. The disease is difficult to control once it occurs. To manage this disease, use virus-free seeds and transplants, sanitize tools, remove and destroy infected plants, and avoid smoking near the plants.'
  }
];


const DiseaseListScreen = () => {
  const navigation = useNavigation();
  const renderPlantDisease = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.rect3}
        onPress={() => {
          navigation.navigate('DetailedScreen', { disease: item });
        }}
      >
        <View style={styles.rect6Row}>
          {/*
          <View style={styles.rect6}>
            <Image
              source={require('../assets/images/potato.png')}
              resizeMode='cover'
              style={styles.plantImage}
            ></Image>
          </View>
      */}
          <View style={styles.potatoEralyBrightColumn}>
          <Text style={styles.potatoEralyBright}>{item.name}</Text>
            <Text style={styles.mangoAppleOrange}>{item.species}</Text>
          </View>
          <Image
            source={require('../assets/images/next.png')}
            resizeMode='contain'
            style={styles.image4}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rect2Stack}>
        <View style={styles.rect2}></View>

        <FlatList
          data={DATA}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          renderItem={renderPlantDisease}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.image3Stack}>
        <Image
          source={require('../assets/images/blob1.png')}
          resizeMode='contain'
          style={styles.image3}
        ></Image>
        <View style={styles.rect}>
          <View style={styles.otherColumnRow}>
            <View style={styles.otherColumn}>
              <Text style={styles.other}>Categories</Text>
              <Text style={styles.pestsDiseases}>Pests &amp; Diseases</Text>
            </View>
            <Image
              source={require('../assets/images/agriculture.png')}
              resizeMode='contain'
              style={styles.image2}
            ></Image>
          </View>
          <Text style={styles.loremIpsum}>Browse through tomato plant leaf diseases.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  rect2: {
    top: 0,
    left: 0,
    width: 230,
    height: 453,
    position: 'absolute',
    backgroundColor: '#5BB59B',
    borderRadius: 27
  },
  rect3: {
    top: 15,
    left: 120,
    width: 323,
    height: 99,
    backgroundColor: 'white',
    borderRadius: 27,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    marginTop: 20,
    shadowRadius: 10
  },
  rect6: {
    width: 97,
    height: 76,
    backgroundColor: 'green',
    borderRadius: 12
  },
  plantImage: {
    borderRadius: 12,
    width: 97,
    height: 76
  },
  potatoEralyBright: {
    color: '#195F57',
    fontSize:20,
    bottom: 7
  },
  mangoAppleOrange: {
    color: '#195F57',
    fontSize:18,
    bottom: 3,
    marginLeft: 1
  },
  fungens: {
    color: '#195F57',
    marginTop: 14,
    marginLeft: 2
  },
  potatoEralyBrightColumn: {
    width: 137,
    marginLeft: 17,
    marginTop: 10,
    marginBottom: 2
  },
  image4: {
    width: 29,
    height: 58,
    marginLeft: 110,
    marginTop: 10
  },
  rect6Row: {
    height: 76,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 13,
    marginRight: 13
  },
  rect4: {
    top: 143,
    left: 135,
    width: 308,
    height: 99,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 27,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  rect5: {
    top: 268,
    left: 135,
    width: 308,
    height: 99,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 27,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  rect2Stack: {
    width: 450,
    height: 453,
    marginTop: 230,
    marginLeft: -109
  },
  image3: {
    top: 0,
    left: 17,
    width: 490,
    height: 287,
    position: 'absolute'
  },
  rect: {
    top: 111,
    width: 293,
    height: 114,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    left: 0,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  other: {
    fontFamily: '',
    color: '#195F57',
    fontSize: 18,
    marginTop: -1,
    right: 25
  },
  pestsDiseases: {
    fontFamily: '',
    color: '#195F57',
    marginTop: 5,
    right: 25
  },
  otherColumn: {
    width: 107,
    marginBottom: 21
  },
  image2: {
    width: 71,
    height: 63,
    marginLeft: 47,
    marginTop: 1
  },
  otherColumnRow: {
    height: 64,
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 44,
    marginRight: 24
  },
  loremIpsum: {
    fontFamily: '',
    color: '#195F57',
    marginTop: 4,
    marginLeft: 20
  },
  image3Stack: {
    width: 507,
    height: 287,
    marginTop: -754,
    marginLeft: 33
  }
});

export default DiseaseListScreen;
