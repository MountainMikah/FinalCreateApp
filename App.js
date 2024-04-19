import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

/*
 * The main purpose of this app, is to be not only a character creator for DnD, but also to (potentially)
 * save existing characters into the app, to be reloaded at a later point in time
 * Todo:
 * 1. Create base character sheet
 * 2. Save existing character
 * 3. Load a saved character into the sheet
 * 
 * Each of these steps can be broken down, and doesn't cover the HOW,
 *  but generally outlines the PURPOSE and FUNCTIONALITY of what the app is supposed to do
 */

export default function App() {
    const [chosenName, setChosenName] = useState(null);
    const [chosenRace, setChosenRace] = useState(null);

    const [strengthStat, setStrength] = useState(null);
    const [dexterityStat, setDexterity] = useState(null);
    const [constitutionStat, setConstitution] = useState(null);
    const [intelligenceStat, setIntelligence] = useState(null);
    const [wisdomStat, setWisdom] = useState(null);
    const [charismaStat, setCharisma] = useState(null);

    const [notesAndEquip, setNotesAndEquip] = useState(null);

    const [saveCharacter, setSaveCharacter] = useState([]);

    const [raceImage, setRaceImage] = useState('https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

    const [toStoreArray, setToStoreArray] = useState([]);
    const [getBackArray, setGetBackArray] = useState([]);

    const fantasyRace = [
        { key: '1', value: 'Human' },
        { key: '2', value: 'Dwarf' },
        { key: '3', value: 'Elf' },
        { key: '4', value: 'Halfling' },
        { key: '5', value: 'Half-Orc' },
        { key: '6', value: 'Tiefling' },
        { key: '7', value: 'Gnome' },
        { key: '8', value: 'Dragon-Born' }
    ];

    useEffect(() => {
        // Load and play the audio from a URI
        const playSoundFromURI = async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync({ uri: 'https://opengameart.org/sites/default/files/The_Old_Tower_Inn.mp3' });
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error playing sound:', error);
            }
        };

        // Call the playSoundFromURI function
        playSoundFromURI();

        // Unload the audio when the component unmounts
        return () => {
            soundObject.unloadAsync();
        };
    }, []);


    const storeCharacter = async () => {
        console.log({ strengthStat })
        console.log({ dexterityStat })
        console.log({ constitutionStat })
        console.log({ intelligenceStat })
        console.log({ wisdomStat })
        console.log({ charismaStat })
        console.log({ chosenName })
        console.log({ chosenRace })
        console.log({ raceImage })
        console.log({ notesAndEquip })
        setToStoreArray([chosenName, chosenRace, raceImage, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, notesAndEquip])
        putInStorage = JSON.stringify(toStoreArray);
        console.log({ putInStorage })
        putKey = { chosenName }
        await AsyncStorage.setItem( putKey.toString() , putInStorage);
    };

    const loadCharacter = async () => {
        retrieveKey = { chosenName }
        getFromStorage = await AsyncStorage.getItem( retrieveKey.toString() );
        getFromStorage = JSON.parse(getFromStorage)
        console.log('trying to put into variables')
        setGetBackArray([...getFromStorage])
        setChosenName(getBackArray[0])
        setChosenRace(getBackArray[1])
        setRaceImage(getBackArray[2])
        setStrength(getBackArray[3])
        setDexterity(getBackArray[4])
        setConstitution(getBackArray[5])
        setIntelligence(getBackArray[6])
        setWisdom(getBackArray[7])
        setCharisma(getBackArray[8])
        setNotesAndEquip(getBackArray[9])
        console.log('does it run through')
    };

    useEffect(() => {
        console.log("Check if trying to change image");
        switch (chosenRace) {
            case 'Human':
                console.log("Human Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/1_3.png')
                break;
            case 'Dwarf':
                console.log("Dwarf Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/wr4swtxgvcw.jpg')
                break;
            case 'Elf':
                console.log("Elf Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/2022-09-21_sara_opengameart-in-my-style_preview.jpg')
                break;
            case 'Halfling':
                console.log("Halfling Check");
                setRaceImage('https://as1.ftcdn.net/v2/jpg/05/41/81/66/1000_F_541816699_an6nmT7eFJUMTnOxeq6K6XxwEuyGj1c0.webp')
                break;
            case 'Half-Orc':
                console.log("Half-orc Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/Orc_web.jpg')
                break;
            case 'Tiefling':
                console.log("Tiefling Check");
                setRaceImage('https://cdn.pixabay.com/photo/2024/03/25/15/29/ai-generated-8654985_1280.jpg')
                break;
            case 'Gnome':
                console.log("Gnome Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/gnome.jpg')
                break;
            case 'Dragon-Born':
                console.log("Dragon-Born Check");
                setRaceImage('https://opengameart.org/sites/default/files/styles/medium/public/art_04cropped_0.png')
                break;
            default:
                console.log("Default Check");
                setRaceImage('https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
                break;
        }
    }, [chosenRace]);

    const handleSTRChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setStrength(numericValue);
    }; 
    const handleDEXChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setDexterity(numericValue);
    };
    const handleCONChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setConstitution(numericValue);
    };
    const handleINTChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setIntelligence(numericValue);
    };
    const handleWISChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setWisdom(numericValue);
    };
    const handleCHAChange = (text) => {
        // Allow only numbers 
        const numericValue = text.replace(/[^0-9]/g, "");
        setCharisma(numericValue);
    }; 

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
        >
      <View style={styles.container}>
          <View style={styles.Mainbox}>
                    <TextInput style={styles.fillBox}
                        placeholder="Character Name"
                        value={chosenName}
                        onChangeText={(newName => setChosenName(newName))}
              />
              <SelectList
                  setSelected={(val) => setChosenRace(val)}
                  data={fantasyRace}
                  save="value"
                  placeholder="Select Your Race"
                  boxStyles={{ width: 160, margin: 3, }}
              />
              <View style={styles.statBoxes}>
                        <TextInput style={styles.stats}
                            placeholder="STR"
                            value={strengthStat}
                            keyboardType="number-pad"
                            enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleSTRChange} 
                            onChange={(newSTRStat => setStrength(newSTRStat))}
                  />
                        <TextInput style={styles.stats}
                            placeholder="DEX"
                            value={dexterityStat}
                            keyboardType="number-pad"
                            enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleDEXChange}
                            onChange={(newDEXStat => setDexterity(newDEXStat))}
                  />
                  <TextInput style={styles.stats}
                      placeholder="CON"
                      value={constitutionStat}
                      keyboardType="number-pad"
                      enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleCONChange}
                            onChange={(newCONStat => setConstitution(newCONStat))}
                  />
                  <TextInput style={styles.stats}
                      placeholder="INT"
                      value={intelligenceStat}
                      keyboardType="number-pad"
                      enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleINTChange}
                            onChange={(newINTStat => setIntelligence(newINTStat))}
                  />
                  <TextInput style={styles.stats}
                      placeholder="WIS"
                      value={wisdomStat}
                      keyboardType="number-pad"
                      enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleWISChange}
                            onChange={(newWISStat => setWisdom(newWISStat))}
                  />
                  <TextInput style={styles.stats}
                      placeholder="CHA"
                      value={charismaStat}
                      keyboardType="number-pad"
                      enterKeyHint='done'
                            maxLength={2}
                            onChangeText={handleCHAChange}
                            onChange={(newCHAStat => setCharisma(newCHAStat))}
                  />
              </View>
              <View style={styles.imageBox}>
                  <Image
                      style={styles.img}
                      source={raceImage}
                  />
              </View>
              <View style={styles.notesBox}>
                        <TextInput style={styles.fillNotesbox}
                            placeholder="Notes or Equipment"
                            value={notesAndEquip}
                            multiline={true}
                            onChangeText={(newDescript => setNotesAndEquip(newDescript))}
                  />
                    </View>
                    <Button
                        title="Save Character"
                        onPress={() => storeCharacter()} />
                    <Button
                        title="Load Character"
                        onPress={() => loadCharacter()} />
          </View>
      <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    Mainbox: {
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 2,
        width: '85%',
        height: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    fillBox: {
        height: 39,
        width: 145,
        margin: 6,
        borderWidth: 1,
        padding: 5,
    },
    statBoxes: {
        width: '33%',
    },
    stats: {
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 2,
        margin: 6,
        height: 45,
        width: 45,
    },
    imageBox: {
        width: '40%',
    },
    img: {
        flex: 1,
        width: '100%',
    },
    notesBox: {
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 2,
        width: '95%',
        height: '45%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 6,
    },
    fillNotesBox: {
        height: "50%",
        width: 145,
    },
});
