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
    name: 'Tomato Early Blight',
    description: 'This is a fungal disease that causes dark spots with rings on the lower leaves, stems, and fruits. To manage it, you should:\n\n' +
      'Remove and dispose of infected leaves and fruits as soon as you notice them.\n' +
      'Apply a fungicide spray every 7 to 10 days, starting from when the first symptoms appear or when the weather is favorable for the disease. You can use copper or sulfur-based fungicides, or biofungicides such as Serenade1.\n' +
      'Mulch the soil around the plants to prevent spores from splashing onto the foliage.\n' +
      'Water the plants at the base and avoid wetting the leaves.\n' +
      'Rotate your tomato crops every two years and avoid planting them near other nightshade plants, such as potatoes, peppers, and eggplants.'
  },
  {
    id: 2,
    name: 'Late blight',
    description: 'This is a fungal disease that causes brown or black spots on the leaves, stems, and fruits, and a white fuzzy growth on the underside of the leaves. To manage it, you should:\n\n' +
      'Remove and destroy infected plants as soon as you notice them. Do not compost them, as the spores can survive and infect other plants.\n' +
      'Apply a fungicide spray every 5 to 7 days, starting from when the first symptoms appear or when the weather is cool and humid. You can use copper or chlorothalonil-based fungicides, or biofungicides such as Regalia2.\n' +
      'Avoid overhead watering and provide good air circulation around the plants.\n' +
      'Plant resistant varieties, such as Mountain Magic, Defiant, and Plum Regal3.'
  },
  {
    id: 3,
    name: 'Tomato Septoria Leaf Spot',
    description: 'This is a fungal disease that causes small, brown, round spots on the leaves, especially on the lower ones. To manage it, you should:\n\n' +
      'Prune the lower leaves of the plants to increase air flow and reduce humidity.\n' +
      'Apply a fungicide spray every 7 to 10 days, starting from when the first symptoms appear or when the weather is wet and warm. You can use copper, sulfur, or mancozeb-based fungicides, or biofungicides such as Serenade4.\n' +
      'Water the plants at the base and avoid wetting the leaves.\n' +
      'Rotate your tomato crops every three years and remove any weeds or volunteer tomato plants that may harbor the disease.'
  },
  {
    id: 4,
    name: 'Tomato Yellow Leaf Curl Virus',
    description: 'This is a viral disease that causes the leaves to curl, turn yellow, and become distorted. It is transmitted by whiteflies, which are tiny insects that feed on the sap of the plants. To manage it, you should:\n\n' +
      'Monitor your plants regularly for signs of whiteflies and virus infection. Look for whiteflies on the underside of the leaves and yellowing and curling of the leaves.\n' +
      'Use yellow sticky traps to catch and monitor whiteflies. Place them near the plants, but not touching them.\n' +
      'Apply an insecticide spray every 7 to 10 days, starting from when you see whiteflies or virus symptoms. You can use neem oil, pyrethrin, or insecticidal soap5.\n' +
      'Cover your plants with a fine mesh netting or row cover to prevent whiteflies from reaching them. Make sure the netting does not touch the plants, as whiteflies can feed through it.\n' +
      'Plant resistant varieties, such as Tygress, Shanty, and Bella Rosa.'
  },
  {
    id: 5,
    name: 'Healthy',
    description: 'Spot of come to ever hand as lady meet on'
  },
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
          <View style={styles.rect6}>
            <Image
              source={require('../assets/images/potato.png')}
              resizeMode='cover'
              style={styles.plantImage}
            ></Image>
          </View>
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
          showsVerticalScrollIndicator={true}
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
    fontFamily: '',
    color: '#195F57',
    bottom: 7
  },
  mangoAppleOrange: {
    fontFamily: '',
    color: '#195F57',
    bottom: 3,
    marginLeft: 1
  },
  fungens: {
    fontFamily: '',
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
    marginLeft: 17,
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
