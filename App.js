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
      overshootRight = {false}
    >
      <View style ={styles.card}>
        <Text style={styles.cardText}>{tarea.texto}</Text>
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
    
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}> 
                <StatusBar style="dark"/>

                <View style={styles.header}>
                  <Text style={styles.headerTitle}> Tareas </Text>
                </View>

                <View style={styles.formCard}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Escribe una tarea"
                      value={textoTarea}
                      onChangeText={setTextoTarea}
                    />
                  </View>
                    <Pressable style={styles.addButton} onPress={agregarTarea}>
                      <Text style={styles.addButtonText}> + Agregar Tarea </Text>
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

            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', 
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff', 
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e1b4b',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#19720d',
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    minHeight: 56,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#b91c1c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 86,
    borderRadius: 20,
    marginLeft: 10,
    gap: 4,
  },
  deleteButtonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 12,
    fontWeight: '700',
  },
})
