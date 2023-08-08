import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

const Task = (props) => {

    const { text, onUpdate, onDelete } = props;
    
    const handleUpdate = () => {
    onUpdate();
  }

   const handleDelete = async () => {
    await onDelete(text);
  }
    return (
         <View style={styles.item}>
    <View style={styles.itemLeft}>
      <View style={styles.square}></View>
      <Text style={styles.itemText}>{text}</Text>
    </View>   

    {/*<View style={styles.circular}></View> */}

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleUpdate}>
        <Image source={require('../src/assets/updateIcon.png')}
         style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.updateButton} onPress={handleDelete}>
        <Image source={require('../src/assets/deleteIcon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 15,
    marginRight: 15,
  },

  itemText: {
    maxWidth: '75%',
  },

  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteButton: {
    marginRight: 10,
  },

  icon: {
    margin: 4,
    height: 20,
    width: 20,
  },
});


export default Task;