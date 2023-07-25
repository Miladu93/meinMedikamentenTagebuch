import styled from 'styled-components';
import { useState } from 'react';
import { dummyMedications } from '../../dummydata';


export default function MediList() {
  const [medikament, setMedikament] = useState('');
  const [dosage, setDosage] = useState('');

  const handleAddMedikament = (e) => {
    e.preventDefault();
    const newMedikament = {
      id: dummyMedications.length + 1,
      medicationName: medikament,
      dosage: dosage,
    };
    setMedikament('');
    setDosage('');
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleAddMedikament}>
        <input
          type="text"
          placeholder="Medikament eingeben"
          value={medikament}
          onChange={(e) => setMedikament(e.target.value)}
          required
        />
        <DosageInputContainer>
          <input
            type="text"
            placeholder="Dosierung eingeben"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
          <SubmitButton type="submit">Hinzufügen</SubmitButton>
        </DosageInputContainer>
      </Form>

      <StyledContainer>
        {dummyMedications.map((medication) => (
          <MedikamentWrapper key={medication.id}>
            <StyledItem>{medication.medicationName}</StyledItem>
            <StyledItem>{medication.dosage}</StyledItem>
          </MedikamentWrapper>
        ))}
      </StyledContainer>
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
  align-items: center; /* Vertically center the input and button */
`;


const MedikamentWrapper = styled.div`
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

