import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { format, addDays } from "date-fns";

const CalendarNew = ({ selectedDate, onSelectDate }) => {
  const [dates, setDates] = useState([]);

  const generateDates = () => {
    const newDates = [];
    for (let i = 0; i < 10; i++) {
      const date = addDays(new Date(), i);
      newDates.push(date);
    }
    setDates(newDates);
  };

  useEffect(() => {
    generateDates();
  }, []); // Run only once when the component mounts

  const handleDatePress = (date) => {
    onSelectDate(date);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal:20}}>
      {dates.map((date, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleDatePress(date)}
          style={[
            styles.dateButton,
            {
              backgroundColor:
                format(date, "MMMM dd, yyyy") ===
                format(selectedDate, "MMMM dd, yyyy")
                  ? "#000000"
                  : "#FCCD00",
            },
          ]}
        >
          <Text style={styles.dateText}>{format(date, "MMMM dd")}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  dateText: {
    color: "white",
  },
});

export default CalendarNew;
