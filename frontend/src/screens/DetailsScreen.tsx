import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

const DetailsScreen = ({ route, navigation }: any) => {
  const { task, onTaskUpdate, onTaskDelete } = route.params;
  const { addTask, language } = useTaskContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language); 
  }, [language, i18n]);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [loading, setLoading] = useState<boolean>(false);

  const updateTask = async () => {
    if (!task) return;
    setLoading(true);
    try {
      setTimeout(async () => {
        await api.patch(`/todos/${task.id}`, { title, description });
        const updatedTask = { ...task, title, description };
        onTaskUpdate(updatedTask); 
        Alert.alert(t('success'), t('taskUpdated')); 
        navigation.goBack();
        setLoading(false); 
      }, 1000); 
    } catch (error) {
      console.error(error);
      Alert.alert(t('error'), t('updateFailed'));
      setLoading(false); 
    }
  };

  const createTask = async () => {
    if (!title || !description) {
      alert(t('provideBothFields'));
      return;
    }

    const newTask = { title, description, id: Math.random() };

    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await api.post('/todos', newTask);
        addTask(response.data); 
        Alert.alert(t('success'), t('taskCreated'));
        navigation.goBack();
        setLoading(false); 
      }, 1000); 
    } catch (error) {
      console.error(error);
      Alert.alert(t('error'), t('createFailed'));
      setLoading(false); 
    }
  };

  const deleteTask = async () => {
    Alert.alert(
      t('areYouSure'),
      t('deleteWarning'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            setLoading(true); 
            try {
              setTimeout(async () => {
                await api.delete(`/todos/${task.id}`);
                onTaskDelete(task.id); 
                Alert.alert(t('success'), t('taskDeleted')); 
                navigation.goBack();
                setLoading(false); 
              }, 1000); 
            } catch (error) {
              console.error(error);
              Alert.alert(t('error'), t('deleteFailed'));
              setLoading(false); 
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('title')}:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>{t('description')}:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
      ) : task ? (
        <>
          <Button title={t('saveChanges')} onPress={updateTask} disabled={loading} />
          <View style={styles.buttonSpacer} />
          <Button title={t('deleteTask')} onPress={deleteTask} color="red" />
        </>
      ) : (
        <Button title={t('createTask')} onPress={createTask} disabled={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonSpacer: {
    marginVertical: 10,
  },
});

export default DetailsScreen;
