// import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PassengerPicker = ({
  label,
  value,
  setValue
}: {
  label: any;
  value: { adult: number; child: number; infant: number };
  setValue: any;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSave = () => {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Text style={[styles.inputValue, !value && styles.placeholder]}>
            
            {value ? (`${value.adult} adult, ${value.child} child, ${value.infant} infant`) : 'Tarih seçiniz'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Number of Passengers</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 16, paddingTop: 2 }}>
                <Text style={{alignSelf: 'center'}}>Adult <Text style={styles.placeholder}>(12+)</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <TouchableOpacity onPress={() => value.adult > 0 && setValue({ ...value, adult: value.adult - 1 })}>
                    <FontAwesome6 name="minus" size={24} color={value.adult > 0 ? 'black' : 'rgba(0,0,0,0.5)'} />
                </TouchableOpacity>
                <Text style={[styles.passengerNumber, value.adult > 0 && styles.passengerNumberActive]}>{value.adult}</Text>
                <TouchableOpacity onPress={() => setValue({ ...value, adult: value.adult + 1 })} disabled={value.adult === 9}>
                    <FontAwesome6 name="plus" size={24} color={value.adult !== 9 ? 'black' : 'rgba(0,0,0,0.5)'} style={{fontWeight: '700'}} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 16 }}>
                <Text style={{alignSelf: 'center'}}>Child <Text style={styles.placeholder}>(2-12)</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <TouchableOpacity onPress={() => value.child > 0 && setValue({ ...value, child: value.child - 1 })}>
                    <FontAwesome6 name="minus" size={24} color={value.child > 0 ? 'black' : 'rgba(0,0,0,0.5)'} />
                </TouchableOpacity>
                <Text style={[styles.passengerNumber, value.child > 0 && styles.passengerNumberActive]}>{value.child}</Text>
                <TouchableOpacity onPress={() => setValue({ ...value, child: value.child + 1 })} disabled={value.child === 9}>
                    <FontAwesome6 name="plus" size={24} color={value.child !== 9 ? 'black' : 'rgba(0,0,0,0.5)'} style={{fontWeight: '700'}} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, paddingBottom: 2 }}>
                <Text style={{alignSelf: 'center'}}>Infant <Text style={styles.placeholder}>(0-2)</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <TouchableOpacity onPress={() => value.infant > 0 && setValue({ ...value, infant: value.infant - 1 })}>
                    <FontAwesome6 name="minus" size={24} color={value.infant > 0 ? 'black' : 'rgba(0,0,0,0.5)'} />
                </TouchableOpacity>
                <Text style={[styles.passengerNumber, value.infant > 0 && styles.passengerNumberActive]}>{value.infant}</Text>
                <TouchableOpacity onPress={() => setValue({ ...value, infant: value.infant + 1 })} disabled={value.infant === 9}>
                    <FontAwesome6 name="plus" size={24} color={value.infant !== 9 ? 'black' : 'rgba(0,0,0,0.5)'} style={{fontWeight: '700'}} />
                </TouchableOpacity>
                </View>
                
            </View>
          </View>

          {/* <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSave()}
          >
            <Text style={styles.saveText}>Kaydet</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  chevron: {
    fontSize: 24,
    color: "#9CA3AF",
    fontWeight: "300",
  },
  inputButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  openButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  inputValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
  placeholder: {
    color: "#9CA3AF",
    fontWeight: "400",
  },
  passengerNumber: {
    fontSize: 32,
    color: "rgba(0, 0, 0, 0.4)",
    fontWeight: "700",
    minWidth: 20,
    textAlign: "center",
  },
  passengerNumberActive:{
    color: "#4285f4",
  },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
  close: { fontSize: 22 },
  rangeText: {
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  }
});

export default PassengerPicker;
