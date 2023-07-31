import React, { useState } from 'react';
import styled from 'styled-components';
import { dummyMedications } from '../../dummydata';
import Link from 'next/link';
import WeeklyOverview from "../WeeklyOverview";

export default function MediList() {
  const [medications, setMedications] = useState(dummyMedications);
  const [medication, setMedication] = useState({ medicationName: '', dosage: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMedication = (event) => {
    event.preventDefault();
    setMedications([...medications, { ...medication, id: Date.now(), favorite: false }]);
    setMedication({ medicationName: '', dosage: '' });
  };

  const handleSearch = () => {
    const filteredMedications = medications.filter(
      (med) =>
        med.medicationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setMedications(filteredMedications);
  };

  const handleEditMedication = (id) => {
    const updatedMedicationName = prompt('Enter updated name:', medications.find((med) => med.id === id)?.medicationName || '');
    const updatedDosage = prompt('Enter updated dosage:', medications.find((med) => med.id === id)?.dosage || '');

    if (updatedMedicationName !== null && updatedDosage !== null) {
      const updatedMedications = medications.map((med) =>
        med.id === id ? { ...med, medicationName: updatedMedicationName, dosage: updatedDosage } : med
      );
      setMedications(updatedMedications);
    }
  };

  const handleDeleteMedication = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this medication entry?');
    if (shouldDelete) {
      const updatedMedications = medications.filter((med) => med.id !== id);
      setMedications(updatedMedications);
    }
  };

  const handleToggleFavorite = (id) => {
    const updatedMedications = medications.map((med) =>
      med.id === id ? { ...med, favorite: !med.favorite } : med
    );
    setMedications(updatedMedications);
  };

  return (
    <StyledContainer>
      <Link href="/weeklyoverview">
        <NextPageButton>Zum Wochenüberblick</NextPageButton>
      </Link>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search for medications"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      <Form onSubmit={handleAddMedication}>
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
            <ButtonContainer>
              <EditButton onClick={() => handleEditMedication(medication.id)}>
                Edit
              </EditButton>
              <DeleteButton onClick={() => handleDeleteMedication(medication.id)}>
                Delete
              </DeleteButton>
              <FavButton favorite={medication.favorite} onClick={() => handleToggleFavorite(medication.id)}>
                {medication.favorite ? 'Favorited' : 'Fav'}
              </FavButton>
            </ButtonContainer>
          </MedicationWrapper>
        ))}
      </MedicationList>
    </StyledContainer>
  );
}

const NextPageButton = styled.button`
  padding-left: 10px;
`;

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

const ButtonContainer = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
`;

const SubmitButton = styled.button`
  margin-left: 10px; 
`;

const FavButton = styled.button`
  background-color: ${(props) => (props.favorite ? '#fbc02d' : 'transparent')};
  color: ${(props) => (props.favorite ? '#ffffff' : '#000000')};
  border: 1px solid #fbc02d;
  margin-right: 10px;
  cursor: pointer;
`;

