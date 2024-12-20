import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const HomeScreen = ({ navigation }: any) => {
  const { tasks, setTasks, updateTask, deleteTask, changeLanguage } = useTaskContext();
  const { t } = useTranslation();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  const fetchTasks = async (pageNumber: number) => {
    if (isEndReached) return; 

    setLoading(true); 
    try {
      const response = await api.get(`/todos?page=${pageNumber}`);
      if (response.data.length === 0) {
        setIsEndReached(true); 
      } else {
        setTasks((prevTasks) => [...prevTasks, ...response.data]); 
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(page); 
  }, [page]);

  const loadMoreTasks = () => {
    if (!loading && !isEndReached) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageSelector}>
        <Button title="English" onPress={() => changeLanguage('en')} />
        <Button title="Español" onPress={() => changeLanguage('es')} />
      </View>

      <View style={styles.taskListContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  task: item,
                  onTaskUpdate: updateTask,
                  onTaskDelete: deleteTask,
                })
              }
            >
              <Text style={styles.item}>{item.title}</Text>
            </TouchableOpacity>
          )}
          onEndReached={loadMoreTasks}
          onEndReachedThreshold={0.1} 
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
            ) : null
          }
        />
      </View>

      <View style={styles.addButtonContainer}>
        <Button
          title={t('addTask')}
          onPress={() =>
            navigation.navigate('Details', {
              task: null,
              onTaskUpdate: updateTask,
              onTaskDelete: deleteTask,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'space-between' },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  taskListContainer: {
    flex: 1, 
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  item: {
    fontSize: 18,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButtonContainer: {
    marginTop: 16, 
  },
});

export default HomeScreen;
