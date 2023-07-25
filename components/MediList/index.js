import styled from 'styled-components';
import { useState } from 'react';
import { dummyMedications } from '../../dummydata';

export default function MediList() {
  const [medications, setMedications] = useState(dummyMedications);
  const [medication, setMedication] = useState({ medicationName: '', dosage: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMedikament = (event) => {
    event.preventDefault();
    setMedications([...medications, medication]);
    setMedication({ medicationName: '', dosage: '' });
  };

  const handleSearch = () => {
    const filteredMedications = medications.filter(
      (med) =>
        med.medicationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setMedications(filteredMedications);
  };

  return (
    <StyledContainer>
      {/* ... (previous code) */}
      
      <Form onSubmit={handleAddMedikament}>
        <input
          type="text"
          placeholder="Enter Medication"
          value={medication.medicationName}
          onChange={(event) => setMedication({ ...medication, medicationName: event.target.value })}
          required
        />
        <DosageInputContainer>
          <input
            type="text"
            placeholder="Enter Dosage"
            value={medication.dosage}
            onChange={(event) => setMedication({ ...medication, dosage: event.target.value })}
            required
          />
          <SubmitButton type="submit">Add Medication</SubmitButton>
        </DosageInputContainer>
      </Form>

      <MedicationList>
        {medications.map((medication) => (
          <MedicationWrapper key={medication.id}>
            <StyledItem>{medication.medicationName}</StyledItem>
            <StyledItem>{medication.dosage}</StyledItem>
          </MedicationWrapper>
        ))}
      </MedicationList>
    </StyledContainer>
  );
}


const StyledContainer = styled.div`
  padding: 50px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const DosageInputContainer = styled.div`
  display: flex;
  align-items: center; 
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const SearchButton = styled.button`
  margin-left: 10px;
`;

const MedicationList = styled.ul`
  max-height: 300px; 
  overflow: auto; 
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MedicationWrapper = styled.li`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledItem = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
`;

const SubmitButton = styled.button`
  margin-left: 10px; 
`;