import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// Import words from the JSON file
import words from './data/zh.json';


const getRandomUniqueIntegers = () => {
    const uniqueIntegers = new Set();
    while (uniqueIntegers.size < 10) {
        const randomInt = Math.floor(Math.random() * 1000) + 1;
        uniqueIntegers.add(randomInt); // Set ensures no duplicates
    }
    return Array.from(uniqueIntegers); // Convert the set to an array
}


const App = () => {
  const [counter, setCounter] = useState(0);
  const [cards, setCards] = useState(getRandomUniqueIntegers().map((index) => words.words[index]));
  const [longPressedCard, setLongPressedCard] = useState(null);

  const handleSwipeRight = (cardIndex) => {
    setCounter(counter + 1);
  };

  const handleLongPress = (word) => {
    console.log('Long press:', word);
    swiperRef.current.forceUpdate();
    setLongPressedCard(word); // Set the long-pressed card
  };

  const clearLongPressText = () => {
    setLongPressedCard(null); // Clear the long-pressed card when releasing
  };
  const swiperRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Score: {counter}</Text>
      <Swiper
        ref={swiperRef}
        cards={cards}
        onTapCard={(cardIndex) => console.log('Tapped card:', cardIndex)}
        renderCard={(word) => (
            <TouchableWithoutFeedback
              onLongPress={() => handleLongPress(word)}
              onPressOut={clearLongPressText}
            >
              <View style={styles.card}>
                <Text style={styles.text}>{word.targetWord}</Text>
                {longPressedCard === word && <Text style={styles.reveal}>{word.englishWord}</Text>}
              </View>
            </TouchableWithoutFeedback>
        )}
        onSwipedRight={handleSwipeRight}
        backgroundColor="transparent"
        stackSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        position: 'absolute', // Pin to the top
        top: 40, // Distance from the top of the screen
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        zIndex: 10, // Ensure it stays above other components
    },
    card: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e3e3e3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    reveal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff',
    },
});

export default App;

