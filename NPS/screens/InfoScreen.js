// NPS/screens/InfoScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "./Theme";

const theme = lightTheme;

const InfoScreen = () => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Information</Text>
        <View style={[styles.infoContainer, { backgroundColor: theme.secondary }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Common Payments:</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>USMLE Payments</Text>
          <Text style={[styles.text, { color: theme.text }]}>We help you make payments for USMLE-related fees:</Text>
          <Text style={[styles.text, { color: theme.text }]}>Exam Registration:</Text>
          <Text style={[styles.text, { color: theme.text }]}>Step 1: $1195</Text>
          <Text style={[styles.text, { color: theme.text }]}>Step 2 CK: $1220</Text>
          <Text style={[styles.text, { color: theme.text }]}>Step 3: $895</Text>
          <Text style={[styles.text, { color: theme.text }]}>ERAS Token Payment: $165</Text>
          <Text style={[styles.text, { color: theme.text }]}>ECFMG Certification Pathways Application: $925</Text>
          <Text style={[styles.text, { color: theme.text }]}>AAMC ERAS Application Fees:</Text>
          <Text style={[styles.text, { color: theme.text }]}>1-30 Programs: $11 per program</Text>
          <Text style={[styles.text, { color: theme.text }]}>31+ Programs: $30 per program</Text>
          <Text style={[styles.text, { color: theme.text }]}>USMLE Transcript Fee: $80</Text>
          <Text style={[styles.text, { color: theme.text }]}>Rescheduling Fees: $50 - $150</Text>
          <Text style={[styles.text, { color: theme.text }]}>Transcript Requests: $70 per transcript</Text>
          <Text style={[styles.text, { color: theme.text }]}>ECFMG Certification Fees: $160</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>OET Payment</Text>
          <Text style={[styles.text, { color: theme.text }]}>OET (Occupational English Test): 587 AUD</Text>
          <Text style={[styles.text, { color: theme.text }]}>Rescheduling Fee:</Text>
          <Text style={[styles.text, { color: theme.text }]}>Before booking closes: 120 AUD</Text>
          <Text style={[styles.text, { color: theme.text }]}>After booking closes: 200 AUD</Text>
          <Text style={[styles.text, { color: theme.text }]}>Speaking sub-test only: 30 AUD (before booking closes) or 100 AUD (after booking closes)</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>WES Payment</Text>
          <Text style={[styles.text, { color: theme.text }]}>WES Evaluation: $245</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>SOPHAS Application Fee</Text>
          <Text style={[styles.text, { color: theme.text }]}>SOPHAS: $60 per program</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>Duolingo English Test</Text>
          <Text style={[styles.text, { color: theme.text }]}>Duolingo English Test: $65</Text>
          <Text style={[styles.text, { color: theme.text }]}>Bundle Option: 2 tests for $98</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>SAT Payment</Text>
          <Text style={[styles.text, { color: theme.text }]}>SAT: $111 (includes international fee)</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>Facebook and Instagram Boost Payments</Text>
          <Text style={[styles.text, { color: theme.text }]}>Facebook Boost: Starts at $1 per day, with average CPC ranging from $0.40 - $0.75 and CPM around $7 - $10.</Text>
          <Text style={[styles.text, { color: theme.text }]}>Instagram Ads: Similar pricing, with CPC from $0.50 - $1.20 and CPM starting at $8.</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>DHA Exam Payment</Text>
          <Text style={[styles.text, { color: theme.text }]}>DHA Exam: Ranges from AED 270 - AED 3,000 depending on the profession.</Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>PLAB Exam Payment</Text>
          <Text style={[styles.text, { color: theme.text }]}>PLAB 1: £268</Text>
          <Text style={[styles.text, { color: theme.text }]}>PLAB 2: £981</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default InfoScreen;
