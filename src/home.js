import React, {useState, useEffect} from 'react';
import { Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import Parse from 'parse/react-native';

import Task from '../components/Task';

function HomeScreen() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  useEffect(() => {
  const fetchTasks = async () => {
    const query = new Parse.Query('Task');
    const results = await query.find();
    setTaskItems(results.map(result => result.get('text')));
    //getTasks(); //call the getTasks function after fetching the tasks from the server
  };
  fetchTasks();
}, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task === '') {
      return;
    }
    setTaskItems([...taskItems, task])
    setTask('');

    //Creating a new Task object 
    const Task = Parse.Object.extend('Task');
    const newTask = new Task();

    newTask.set('text', task);

    //Save the new Task object to the server
    newTask.save().then(
      (result) => {
        console.log('Task was saved successfully:', result);
      },
      (error) => {
        console.error('Task was not saved:', error);
      }
    );
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

const getTasks = async () => {
  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);
  if (showHistory) {
    // Only retrieve tasks created before today if history is requested
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query.lessThan('createdAt', today);
  } else {
    // Only retrieve tasks created today if task is requested
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    query.greaterThanOrEqualTo('createdAt', today);
    query.lessThan('createdAt', tomorrow);
  }
  const results = await query.find();
  console.log(results);
  setTaskItems(results.map((task) => task.get('text')));
  setShowHistory(!showHistory);
}

const displayTask = async () => {
  setShowHistory(!showHistory);
  if (showHistory) {
    // Show history
    await getTasks();
  } else {
    // Show current tasks
    const today = new Date().toLocaleDateString();
    const currentTasks = taskItems.filter(
      task => task.createdAt && task.createdAt.toLocaleDateString() === today
    );
    if (currentTasks.length > 0) {
      setTaskItems(currentTasks.map(task => task.get('text')));
    } else {
      await getTasks();
    }
  }
};


// useEffect(() => {
// getTasks();
// }, []);

const updateTask = async (index) => {
  const Task = Parse.Object.extend('Task');
  const query = new Parse.Query(Task);
  const results = await query.find();
  const taskObject = results[index]; // retrieve the task object using the index of the task item
  taskObject.set('text', 'Research on React Native GiftedChat and Sockets.io'); // update the task's text property
  taskObject.save().then(
    (result) => {
      console.log('Task was updated successfully:', result);
      const updatedItems = [...taskItems];
      updatedItems[index] = result.get('text'); //update the task item in the taskItems array
      setTaskItems(updatedItems);
    },
    (error) => {
      console.error('Task was not updated:', error);
    }
  );
};

const handleDeleteTask = async (taskToDelete) => {
    const Task = Parse.Object.extend('Task');
    const query = new Parse.Query(Task);
    query.equalTo('text', taskToDelete);
    const result = await query.first();
    if (result) {
      await result.destroy();
      setTaskItems(taskItems.filter(item => item !== taskToDelete));
    }
    console.log('Task deleted')
  };

const today = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Today's task */}

      <View style={styles.tasksWrapper}>
      <View style={styles.taskHead}>
        <Text style={styles.sectionTitle}>Today's task</Text>
      <Text style={styles.date}>{today}</Text>

        {/* Read tasks button */}
        
        <TouchableOpacity onPress={displayTask}>
        <View style={styles.addWrapperHistory}>
        <Text style={styles.readButtonText}>{showHistory ? "Tasks" : "History"}</Text>
        </View>          
        </TouchableOpacity>
      </View>
      
      <View style={styles.line} />

        <View style={styles.items}>
          {/* This is where the tasks will go */}
         
           {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task 
                  text={item} 
                  onUpdate={() => updateTask(index)} 
                   onDelete={handleDeleteTask}
                  />
                </TouchableOpacity>
              );
            })
          }
         
          </View>
        </View>

        {/* Write tasks */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
          >
          <TextInput style={styles.input} placeholder={'Write a task'} 
          onChangeText={text => setTask(text)}
          value={task}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <View style={styles.addText}>
                    <Text style={styles.textStyle}> + </Text>
              </View>      
            </View>          
          </TouchableOpacity>

        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED', 
  },
  
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

    input: {
      padding: 15,
      paddingHorizontal: 15,
      width: 250,
      backgroundColor: 'white',
      borderRadius: 60,
      borderWidth: 1.5,
      borderColor: 'black',

    },
    
     date: {
    fontSize: 18,
    // marginBottom: 10,
  },

    addWrapper:{
      width: 60,
      height: 60,
      backgroundColor: 'blue',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },

    addWrapperHistory: {
      width: 60,
      height: 60,
      backgroundColor: 'blue',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      left: 290,
      top: -60
    },

    taskHead: {
      marginTop: -60,
      //backgroundColor: 'red',
      height: 45,
    },

    line: {
    height: 1.5,
    backgroundColor: 'black',
    marginTop: 20,
    width: '100%',
    marginBottom: -18,
    },

    addText: {
      height: 45,
      width: '50%',
      //backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },

    textStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      //fontWeight: '100'
    },

    readButtonText: {
      color: 'white',
      fontWeight: 'bold',
      padding: 2.5
    }

});

export default HomeScreen;