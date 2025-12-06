import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import TaskItem from "../components/TaskItem";

export default function AddTask() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [oKtasks, setOkTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [taskId, setTaskId] = useState(null)

  function handleAddTask() {
    const text = taskText.trim();

    if (!text) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTaskText("");
  }

  function handleEditTaks() {
    const text = taskText.trim();

    if (!text) {
      return;
    }

    setTasks((currentTasks) => {
      const item = currentTasks.find(({id}) => id == taskId)
      item.text = taskText
      return currentTasks
    })

    setIsEdit(false)
    setTaskText("");
  }


  function onRemoveItem(idItem) {
    setTasks(tasks => {
      return tasks.filter(({id}) => id != idItem)
    })
  }

  function onEdit(item) {
    setTaskText(item.text)
    setTaskId(item.id)
    setIsEdit(true)
  }

  function onComplete(item) {
    setTasks(tasks => {
      return tasks.filter(({id}) => id != item.id)
    })
    setOkTasks((currentTasks) => [item, ...currentTasks]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar tarefa</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nova tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o que você precisa fazer"
            placeholderTextColor="#98A0A8"
            value={taskText}
            onChangeText={setTaskText}
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
          />

          <Pressable style={styles.button} onPress={isEdit ? handleEditTaks : handleAddTask}>
            <Text style={styles.buttonText}>{ isEdit ? "Alterar" : "Adicionar" } </Text>
          </Pressable>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Minhas tarefas: {tasks.length}</Text>

          <ScrollView>
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => <TaskItem item={item} onComplete={onComplete} onRemoveItem={onRemoveItem} onEdit={onEdit} />}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma tarefa adicionada ainda.
                </Text>
              }
            />
          </ScrollView>
        </View>


        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Concluídas: {oKtasks.length}</Text>

          <ScrollView>
            <FlatList
              data={oKtasks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => <TaskItem item={item} />}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma tarefa concluida.
                </Text>
              }
            />
          </ScrollView>
          
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021123", // mesma paleta do texto do TaskItem
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  form: {
    gap: 12,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#021123",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#98A0A8", // mesma cor do card da TaskItem
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#021123",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  listTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  listContent: {
    gap: 8,
  },
  separator: {
    height: 8,
  },
  emptyText: {
    color: "#98A0A8",
    fontSize: 14,
    marginTop: 8,
  },
});
