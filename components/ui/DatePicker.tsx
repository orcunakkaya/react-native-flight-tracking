import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const DatePicker = ({
  label,
  value,
  tripType = "oneWay",
  setValue
}: {
  label: any;
  value: any;
  tripType?: "oneWay" | "roundTrip";
  setValue: any;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    value?.startDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    value?.endDate || null
  );

  const formatDate = (date: any) =>
    date
      ? new Date(date).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
        })
      : '';

  const handleDayPress = (day: any) => {
    const selected = day.dateString;

    if (tripType === "oneWay") {
      setSelectedStartDate(selected);
      setSelectedEndDate(null);
    } else {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(selected);
        setSelectedEndDate(null);
      } else if (selected < selectedStartDate) {
        setSelectedStartDate(selected);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(selected);
      }
    }
  };

  const getMarkedDates = () => {
    let marked: any = {};
    if (tripType === "oneWay" && selectedStartDate) {
      marked[selectedStartDate] = {
        selected: true,
        selectedColor: "#2563EB",
      };
    } else if (tripType === "roundTrip" && selectedStartDate) {
      marked[selectedStartDate] = {
        startingDay: true,
        color: "#2563EB",
        textColor: "white",
      };
      if (selectedEndDate) {
        marked[selectedEndDate] = {
          endingDay: true,
          color: "#2563EB",
          textColor: "white",
        };

        // iki tarih arası boyama
        const start = new Date(selectedStartDate);
        const end = new Date(selectedEndDate);
        let current = new Date(start);
        while (current < end) {
          const dateString = current.toISOString().split("T")[0];
          if (
            dateString !== selectedStartDate &&
            dateString !== selectedEndDate
          ) {
            marked[dateString] = { color: "#93C5FD", textColor: "white" };
          }
          current.setDate(current.getDate() + 1);
        }
      }
    }
    return marked;
  };

  const handleSave = () => {
    setValue({ startDate: formatDate(selectedStartDate), endDate: formatDate(selectedEndDate) });
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
            
            {value ? value.startDate + (value.endDate ? ` - ${value.endDate}` : '') : 'Tarih seçiniz'}
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
            <Text style={styles.title}>Tarih Seçimi</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <Calendar
            markingType={tripType === "roundTrip" ? "period" : "dot"}
            markedDates={getMarkedDates()}
            onDayPress={handleDayPress}
            minDate={new Date().toISOString().split("T")[0]} // 🔒 geçmiş tarihleri kapat
            theme={{
              todayTextColor: "#2563EB",
              arrowColor: "#2563EB",
              textDayFontWeight: "500",
              textMonthFontWeight: "700",
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSave()}
          >
            <Text style={styles.saveText}>Kaydet</Text>
          </TouchableOpacity>
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
  openText: { color: "#007bff", fontSize: 16 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
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
  },
  saveButton: {
    backgroundColor: "#e81932",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default DatePicker;
