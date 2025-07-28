// frontend/src/components/PdfReceipt.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 12,
    marginLeft: 10
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: 'center',
    color: 'gray'
  }
});

const PdfReceipt = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>RECEIPT</Text>
      <Text style={styles.subHeader}>Eagles Realtors Ltd</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Receipt No:</Text>
          <Text style={styles.value}>{payment.receiptNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(payment.paymentDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Paid By:</Text>
          <Text style={styles.value}>{payment.tenantName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Property:</Text>
          <Text style={styles.value}>{payment.propertyName || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>KES {payment.amount.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment For:</Text>
          <Text style={styles.value}>{payment.paymentFor}</Text>
        </View>
        {payment.notes && (
          <View style={styles.row}>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{payment.notes}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footer}>
        This is a computer-generated receipt. No signature required.
      </Text>
    </Page>
  </Document>
);

export default PdfReceipt;