import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SegmentedControl = ({ options, selectedIndex, onChange, componentStyle }: { options: string[], selectedIndex: number, onChange: (index: number) => void, componentStyle: 'primary' | 'outline' }) => {
  return (
    <View style={[styles.container,
      componentStyle === 'outline' ? styles.containerOutline : styles.containerPrimary
    ]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            index === 0 && styles.firstSegment,
            index === options.length - 1 && styles.lastSegment,
            selectedIndex === index && (componentStyle === 'outline' ? styles.segmentActiveOutline : styles.segmentActivePrimary),
          ]}
          onPress={() => onChange(index)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              componentStyle === 'outline' ? styles.segmentTextOutline : styles.segmentTextPrimary,
              selectedIndex === index && (componentStyle === 'outline' ? styles.segmentTextActiveOutline : styles.segmentTextActivePrimary),
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
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
  },

  containerOutline: {
    backgroundColor: '#F3F4F6',
  },
  containerPrimary: {
    backgroundColor: '#FFFFFF',
  },

  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  firstSegment: {
    borderRadius: 8,
  },
  lastSegment: {
    borderRadius: 8,
  },
 segmentText: {
    fontSize: 15,
    fontWeight: '600',
  },

  segmentActiveOutline: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
  },

  segmentActivePrimary: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
  },

  segmentTextOutline: {
    color: '#6B7280',
  },
  segmentTextActiveOutline: {
    color: '#2563EB',
  },

  segmentTextPrimary: {
    color: '#94A3B8',
  },
  segmentTextActivePrimary: {
    color: '#FFFFFF',
  },
});

export default SegmentedControl;