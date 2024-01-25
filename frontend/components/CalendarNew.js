import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { format, addDays, startOfWeek } from "date-fns";
import moment from 'moment';
const CalendarNew = ({ selectedDate, onSelectDate }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentMonth, setCurrentMonth] = useState()

  const generateDates = () => {
    const newDates = [];
    const startDate = new Date();
    for (let i = 0; i < 10; i++) {
      const date = addDays(startDate, i);
      newDates.push(date);
    }
    setDates(newDates);
  };

  useEffect(() => {
    generateDates();
  }, []);
  const getCurrentMonth = () => {
    const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM')
    setCurrentMonth(month)
  }

  useEffect(() => {
    getCurrentMonth()
  }, [scrollPosition])

  const handleDatePress = (date) => {
    onSelectDate(date);
  };

  return (
    <>
    <View style={styles.month}><Text style={styles.monthText}>{currentMonth}</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    : "#fff",
              },
            ]}
          >
            <Text style={styles.dateText}>{format(date, "EEE")}</Text>
            <Text style={styles.dateText}>{format(date, "dd")}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView></>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    padding: 8,
    margin: 5,
    borderRadius: 12,
    alignItems:'center'
  },
  dateText: {
    color: "#A9B2B6",
  },
  month:{
    alignItems:'center'
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CalendarNew;
