import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useSession } from "../../ctx";
import { useState } from "react";

export default function Main() {
  const { session, signOut, isLoading, tasks, addTask, deleteTask } = useSession();
  const [newTask, setNewTask] = useState('');

  const userSession = session ? JSON.parse(session) : null;

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando sesión...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>App Autenticada</Text>

        {userSession && (
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
            <Text style={styles.emailText}>Sesión iniciada como: {userSession.email}</Text>
            <Text style={styles.timestamp}>Inicio de sesión: {new Date(userSession.timestamp).toLocaleString()}</Text>
          </View>
        )}

        <View style={styles.todoSection}>
          <Text style={styles.todoTitle}>Mis Tareas ({tasks.length})</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nueva tarea..."
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTask}
              disabled={!newTask.trim()}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>No hay tareas pendientes</Text>
          ) : (
            <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={signOut} // Aquí se llama a la función signOut
          disabled={isLoading}
        >
          <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  todoSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 250,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});