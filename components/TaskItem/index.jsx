import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { IconCheck, IconPencil, IconTrash} from "../Icons"

// Componente que recebe status de conclusão e texto da tarefa
export default function TaskItem( {item, onRemoveItem, onEdit, onComplete}) {
    return (
        <View style={styles.container}>
            {
                !onComplete ? <></> : 
                <Pressable onPress={() => onComplete(item)}> 
                    <IconCheck /> {/* Icone para ação de completar */} 
                </Pressable>
            }
            

            <Text style={styles.text}>
                {item.text}
            </Text>


            <View style={styles.actionContainer}>
                {
                    !onEdit ? <></> : 
                    <Pressable onPress={() => onEdit(item)}>
                        <IconPencil />  {/* Icone para ação de editar */}                 
                    </Pressable>
                }
                {
                    !onRemoveItem ? <></> : 
                    <Pressable onPress={() => onRemoveItem(item.id)}>
                        <IconTrash />   {/* Icone para ação de excluir */}
                    </Pressable>
                }
                
            </View>
        </View>
    )   
}

// Declaração dos estilos usados no card
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#98A0A8",
        paddingHorizontal: 8,
        paddingVertical: 18,
        justifyContent: 'space-between',
        borderRadius: 8,  
    },
    text: {
        color: "#021123",
        fontSize: 18,
           
    },
    actionContainer: {
        flexDirection: "row",
        gap: 10,
        padding: 10
    }    

})
