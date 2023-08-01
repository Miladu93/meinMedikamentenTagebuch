import React, { useState } from 'react';
import styled from 'styled-components';
import { dummyMedications } from '../../dummydata';

export default function WeeklyOverview() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicationsByWeekday, setSelectedMedicationsByWeekday] = useState(() => {
    const selectedMeds = {};
    weekdays.forEach((weekday) => {
      selectedMeds[weekday] = dummyMedications[0];
    });
    return selectedMeds;
  });
  const [supplementsByWeekday, setSupplementsByWeekday] = useState(() => {
    const supplements = {};
    weekdays.forEach((weekday) => {
      supplements[weekday] = [];
    });
    return supplements;
  });

  const handleAddSupplement = (weekday) => {
    setSupplementsByWeekday((prevSupplements) => ({
      ...prevSupplements,
      [weekday]: [...prevSupplements[weekday], selectedMedicationsByWeekday[weekday]],
    }));
  };

  const handleDeleteMedication = (weekday, medicationIndex) => {
    const updatedMedications = supplementsByWeekday[weekday].filter(
      (_, index) => index !== medicationIndex
    );
    setSupplementsByWeekday((prevSupplements) => ({
      ...prevSupplements,
      [weekday]: updatedMedications,
    }));
  };

  const handleSearch = () => {
    const filteredData = {};
    weekdays.forEach((weekday) => {
      const filteredSupplements = supplementsByWeekday[weekday].filter(
        (supplement) =>
          supplement.medicationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filteredData[weekday] = filteredSupplements;
    });
    setSupplementsByWeekday(filteredData);
  };

  return (
    <StyledContainer>
      <Title>Wochenüberblick</Title>

      <SearchContainer>
        <input
          type="text"
          placeholder="Search for medications"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      <WeekdaysContainer>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>
            <WeekdayContent>
              <WeekdayName>{weekday}</WeekdayName>
              <MedicationSelect
                value={selectedMedicationsByWeekday[weekday].medicationName}
                onChange={(event) => {
                  const selectedMedication = dummyMedications.find(
                    (med) => med.medicationName === event.target.value
                  );
                  setSelectedMedicationsByWeekday((prevSelectedMeds) => ({
                    ...prevSelectedMeds,
                    [weekday]: selectedMedication,
                  }));
                }}
              >
                {dummyMedications.map((med) => (
                  <option key={med.id} value={med.medicationName}>
                    {med.medicationName}
                  </option>
                ))}
              </MedicationSelect>
              <AddButton onClick={() => handleAddSupplement(weekday)}>Add</AddButton>
            </WeekdayContent>
            {supplementsByWeekday[weekday].map((supplement, index) => (
              <SupplementWrapper key={index}>
                <SupplementName>{supplement.medicationName}</SupplementName>
                <SupplementDosage>{supplement.dosage}</SupplementDosage>
                <DeleteButton onClick={() => handleDeleteMedication(weekday, index)}>
                  Delete
                </DeleteButton>
              </SupplementWrapper>
            ))}
          </Weekday>
        ))}
      </WeekdaysContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const WeekdaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const Weekday = styled.div`
  margin-bottom: 20px;
`;

const WeekdayContent = styled.div`
  display: flex;
  align-items: center;
`;

const WeekdayName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const MedicationSelect = styled.select`
  padding: 5px;
  margin-right: 10px;
`;

const AddButton = styled.button``;

const SupplementWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SupplementName = styled.div`
  font-weight: bold;
`;

const SupplementDosage = styled.div``;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
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
