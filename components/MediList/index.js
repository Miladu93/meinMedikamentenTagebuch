import styled from 'styled-components';
import { useState } from 'react';
import { dummyMedications } from '../../dummydata';

export default function MediList() {
  const [medikament, setMedikament] = useState('');
  const [dosage, setDosage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () => {
    const filteredMedications = dummyMedications.filter(
      (medication) =>
        medication.medicationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setMedications(filteredMedications);
  };

  return (
    <StyledContainer>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search for medications"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      <Form onSubmit={handleAddMedikament}>
        <input
          type="text"
          placeholder="Enter Medication"
          value={medikament}
          onChange={(e) => setMedikament(e.target.value)}
          required
        />
        <DosageInputContainer>
          <input
            type="text"
            placeholder="Enter Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
          <SubmitButton type="submit">Add Medication</SubmitButton>
        </DosageInputContainer>
      </Form>

      <MedicationListContainer>
        {dummyMedications.map((medication) => (
          <MedikamentWrapper key={medication.id}>
            <StyledItem>{medication.medicationName}</StyledItem>
            <StyledItem>{medication.dosage}</StyledItem>
          </MedikamentWrapper>
        ))}
      </MedicationListContainer>
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

const MedicationListContainer = styled.div`
  max-height: 300px; 
  overflow: auto; 
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
