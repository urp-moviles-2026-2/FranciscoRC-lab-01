import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';



import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

function TareaItem({ tarea, onEliminar }) {
  return (
  //  <ReanimatedSwipeable
  //     renderRightActions={() => (
  //       /* Tu botón rojo redondeado con ícono de papelera y texto "Eliminar".
  //          Al presionarlo llama a onEliminar(tarea.id) */
  //     )}
  //     overshootRight={false}
  //   >
  //     {/* La tarjeta blanca con el texto de la tarea */}
  //   </ReanimatedSwipeable>
    <View style ={styles.card}>
      <Text>{tarea.texto}</Text>
    </View>
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

    setTareas(actuales => [...tareas, nuevaTarea]);
    setTextoTarea('');
  }
  return (
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
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
