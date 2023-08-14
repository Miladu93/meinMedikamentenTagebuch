import React, { useState } from 'react';
import styled from 'styled-components';
import { dummyMedications } from '../../dummydata';
import { uid } from 'uid';

const hoursOfDay = Array.from({ length: 24 }, (_, index) => index);

export default function WeeklyOverview() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplementsByWeekday, setSelectedSupplementsByWeekday] = useState(() => {
    const selectedSupps = {};
    weekdays.forEach((weekday) => {
      selectedSupps[weekday] = { medication: dummyMedications[0], selectedTime: '' };
    });
    return selectedSupps;
  });
  const [supplementsByWeekday, setSupplementsByWeekday] = useState(() => {
    const supplements = {};
    weekdays.forEach((weekday) => {
      supplements[weekday] = [];
    });
    return supplements;
  });
  const [supplementStatus, setSupplementStatus] = useState(() => {
    const status = {};
    weekdays.forEach((weekday) => {
      status[weekday] = {};
      supplementsByWeekday[weekday].forEach((supplement) => {
        status[weekday][supplement.key] = {};
        hoursOfDay.forEach((hour) => {
          status[weekday][supplement.key][hour] = false;
        });
      });
    });
    return status;
  });

  const handleAddSupplement = (weekday) => {
    const newSupplement = {
      key: uid(),
      ...selectedSupplementsByWeekday[weekday].medication,
    };

    setSupplementsByWeekday((prevSupplements) => ({
      ...prevSupplements,
      [weekday]: [...prevSupplements[weekday], newSupplement],
    }));
  };

  const handleDeleteSupplement = (weekday, supplementKey) => {
    const updatedSupplements = supplementsByWeekday[weekday].filter(
      (supplement) => supplement.key !== supplementKey
    );

    setSupplementsByWeekday((prevSupplements) => ({
      ...prevSupplements,
      [weekday]: updatedSupplements,
    }));

    setSupplementStatus((prevStatus) => ({
      ...prevStatus,
      [weekday]: {
        ...prevStatus[weekday],
        [supplementKey]: {},
      },
    }));
  };

  const handleCheckSupplement = (weekday, supplementKey, selectedTime) => {
    setSupplementStatus(prevStatus => {
      const currentDayStatus = prevStatus[weekday] || {};
      const currentSupplementStatus = currentDayStatus[supplementKey] || {};
      const newTimeStatus = !currentSupplementStatus[selectedTime] || false;
      const updatedStatus = {
        ...prevStatus,
        [weekday]: {
          ...currentDayStatus,
          [supplementKey]: {
            ...currentSupplementStatus,
            [selectedTime]: newTimeStatus
          }
        }
      };
      return updatedStatus;
    });
  };

  const handleTimeSelection = (weekday, selectedTime) => {
    setSelectedSupplementsByWeekday((prevSelectedSupps) => ({
      ...prevSelectedSupps,
      [weekday]: {
        ...prevSelectedSupps[weekday],
        selectedTime,
      },
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
      <Title>Weekly Overview</Title>

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
              <SupplementSelect
                value={selectedSupplementsByWeekday[weekday].medication.medicationName}
                onChange={(event) => {
                  const selectedSupplement = dummyMedications.find(
                    (supplement) => supplement.medicationName === event.target.value
                  );
                  setSelectedSupplementsByWeekday((prevSelectedSupps) => ({
                    ...prevSelectedSupps,
                    [weekday]: {
                      ...prevSelectedSupps[weekday],
                      medication: selectedSupplement,
                    },
                  }));
                }}
              >
                {dummyMedications.map((supplement) => (
                  <option key={supplement.key} value={supplement.medicationName}>
                    {supplement.medicationName}
                  </option>
                ))}
              </SupplementSelect>
              <AddButton onClick={() => handleAddSupplement(weekday)}>Add</AddButton>
            </WeekdayContent>
            {supplementsByWeekday[weekday].map((supplement) => (
              <SupplementWrapper key={`${supplement.medicationName}-${supplement.dosage}`}>
                <TimeSelectionContainer>
                  <TimeSelectionDropdown
                    value={selectedSupplementsByWeekday[weekday]?.selectedTime || ''}
                    onChange={(event) => handleTimeSelection(weekday, supplement.key, event.target.value)}
                  >
                    <option value="" disabled>Select time</option>
                    {hoursOfDay.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour} Uhr
                      </option>
                    ))}
                  </TimeSelectionDropdown>
                </TimeSelectionContainer>
                <SupplementName>{supplement.medicationName}</SupplementName>
                <SupplementDosage>{supplement.dosage}</SupplementDosage>
                <CheckButton
                  checked={supplementStatus[weekday]?.[supplement.key]?.[selectedSupplementsByWeekday[weekday]?.selectedTime] || false}
                  onClick={() => handleCheckSupplement(weekday, supplement.key, selectedSupplementsByWeekday[weekday]?.selectedTime)}
                >
                  Taken
                </CheckButton>
                <DeleteButton onClick={() => handleDeleteSupplement(weekday, supplement.key)}>
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

const TimeSelectionContainer = styled.div`
  width: 120px;
  margin-right: 10px;
`;

const TimeSelectionDropdown = styled.select`
  width: 100%;
`;

const WeekdayName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const SupplementSelect = styled.select`
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

const CheckButton = styled.button`
  background-color: ${(props) => (props.checked ? '#4caf50' : '#ddd')};
  color: ${(props) => (props.checked ? 'white' : '#333')};
`;

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
