import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SegmentedControl = ({ options, selectedIndex, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedIndex === index && styles.segmentActive,
            index === 0 && styles.firstSegment,
            index === options.length - 1 && styles.lastSegment,
          ]}
          onPress={() => onChange(index)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              selectedIndex === index && styles.segmentTextActive,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  firstSegment: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastSegment: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#2563EB',
  },
});

export default SegmentedControl;