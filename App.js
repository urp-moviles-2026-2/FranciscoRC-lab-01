import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';



import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

function TareaItem({ tarea, onEliminar }) {
  const renderRightActions = () => (
    <Pressable style={styles.deleteButton} onPress={()=> onEliminar(tarea.id)}>
      <Text style={styles.deleteButtonText}>Eliminar</Text>
    </Pressable>
  )
  
  return (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      overrideRight = {false}
    >
      <View style ={styles.card}>
        <Text>{tarea.texto}</Text>
      </View>
    </ReanimatedSwipeable>
  );
}

export default function App() {
  const [textoTarea, setTextoTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    const textoNuevo = textoTarea.trim();
    if (!textoNuevo) return;

    const nuevaTarea = {
      id: Date.now().toString(),
      texto: textoNuevo,
    };

    setTareas(actuales => [...actuales, nuevaTarea]);
    setTextoTarea('');
  }
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} justifyContent="center" alignItems="center">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />

            <View>
              <TextInput
                placeholder="Escribe una tarea"
                value={textoTarea}
                onChangeText={setTextoTarea}
              />
              <Pressable onPress={agregarTarea}>
                <Text>Agregar Tarea</Text>
              </Pressable>
            </View>

            <FlatList
              data={tareas}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TareaItem
                  tarea={item}
                  onEliminar={(id) => {
                    setTareas(actuales => actuales.filter(t => t.id !== id));
                  }}
                />
              )}
            />  
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: '90%',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  } 
})
