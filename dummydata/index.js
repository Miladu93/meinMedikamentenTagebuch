import { uid } from 'uid';

export const dummyMedications = [
  {id: uid(), medicationName: 'Aspirin', dosage: '100mg' },
  {id: uid(), medicationName: 'Ibuprofen', dosage: '200mg' },
  {id: uid(), medicationName: 'Paracetamol', dosage: '500mg' },
  {id: uid(), medicationName: 'Metamizol', dosage: '200mg' },
  { id: uid(), medicationName: 'Aspirin', dosage: '100mg', weekday: 'Monday' },
  { id: uid(), medicationName: 'Ibuprofen', dosage: '200mg', weekday: 'Tuesday' },
  { id: uid(), medicationName: 'Paracetamol', dosage: '500mg', weekday: 'Wednesday' },
  { id: uid(), medicationName: 'Metamizol', dosage: '200mg', weekday: 'Thursday' },
  { id: uid(), medicationName: 'Vitamin D', dosage: '1000IU', weekday: 'Friday' },
  { id: uid(), medicationName: 'Magnesium', dosage: '300mg', weekday: 'Saturday' },
  { id: uid(), medicationName: 'OPC', dosage: '500mg', weekday: 'Sunday' },
  { id: uid(), medicationName: 'Eisen', dosage: '15mg', weekday: 'Monday' },
];

