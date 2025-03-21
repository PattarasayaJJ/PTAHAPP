import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet , Image} from "react-native";

const CustomAlertModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
             <Image
                        source={require("../img/oclock.png")} 
                        style={styles.image}
                      />
          <Text style={styles.message}>
            หากออกก่อนทำครบทุกด่านเวลาจะเริ่มนับใหม่  คุณแน่ใจหรือไม่?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>ออก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width:"85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    fontFamily:"Kanit",
    padding:15

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom:15
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ff6b6b",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
    fontFamily:"Kanit"

  },
  confirmText: {
    fontSize: 16,
    color: "white",
    fontFamily:"Kanit"

  },
  image: {
    width: 180,
    height: 130,
    marginVertical: 10,
  },
});

export default CustomAlertModal;
