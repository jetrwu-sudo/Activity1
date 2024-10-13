import React, { useState } from 'react';
import { Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Button } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'mag study sa react', key: '0' },
    { text: 'mumata ug malibang', key: '1' },
  ]);
  const [text, setText] = useState('');
  const [editKey, setEditKey] = useState(null);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  const submitHandler = () => {
    if (text.length > 3) {
      if (editKey) {
        
        setTodos(prevTodos => {
          return prevTodos.map(todo => 
            todo.key === editKey ? { ...todo, text } : todo
          );
        });
        setEditKey(null); 
      } else {
        
        setTodos(prevTodos => {
          return [
            { text, key: Math.random().toString() },
            ...prevTodos
          ];
        });
      }
      setText(''); 
    } else {
      Alert.alert(
        'OOPS',
        'Your todo is too short! Make it at least 4 characters.',
        [{ text: 'Understood', onPress: () => console.log('alert closed') }]
      );
    }
  };

  const editHandler = (key) => {
    const todoToEdit = todos.find(todo => todo.key === key);
    if (todoToEdit) {
      setText(todoToEdit.text); 
      setEditKey(key); 
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Todos</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="New todo..."
            onChangeText={setText}
            value={text} 
          />
          <Button onPress={submitHandler} title={editKey ? "Update Todo" : "Add Todo"} color="coral" />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => editHandler(item.key)}>
                  <View style={styles.todoItem}>
                    <Text style={styles.todoText}>{item.text}</Text>
                    <Button title="Delete" onPress={() => pressHandler(item.key)} color="red" />
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
  todoItem: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
  },
});
