import React from 'react';
import styled from 'styled-components';
import { dummyMedications } from '../../dummydata';

export default function WeeklyOverview() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const supplementsByWeekday = {};

  weekdays.forEach((weekday) => {
    supplementsByWeekday[weekday] = dummyMedications
      .filter((supplement) => supplement.weekday === weekday)
      .slice(0, 2);
  });

  return (
    <StyledContainer>
      <Title>Wochenüberblick</Title>

      <WeekdaysContainer>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>
            <WeekdayName>{weekday}</WeekdayName>
            {supplementsByWeekday[weekday].map((supplement) => (
              <SupplementWrapper key={supplement.id}>
                <SupplementName>{supplement.medicationName}</SupplementName>
                <SupplementDosage>{supplement.dosage}</SupplementDosage>
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

const WeekdayName = styled.div`
  font-weight: bold;
`;

const SupplementWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 5px;
`;

const SupplementName = styled.div`
  font-weight: bold;
`;

const SupplementDosage = styled.div``;
