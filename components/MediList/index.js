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
    console.log('Neues Medikament:', newMedikament);
    setMedikament('');
    setDosage('');
  };

  return (
    <Container>
      <Form onSubmit={handleAddMedikament}>
        <input
          type="text"
          placeholder="Medikament eingeben"
          value={medikament}
          onChange={(e) => setMedikament(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dosierung eingeben"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
        />
      </Form>

      <MedikamentListContainer>
        {dummyMedications.map((medication) => (
          <MedikamentWrapper key={medication.id}>
            <Medikament>{medication.medicationName}</Medikament>
            <Dosage>{medication.dosage}</Dosage>
          </MedikamentWrapper>
        ))}
      </MedikamentListContainer>
    </Container>
  );
}

const Container = styled.div`
padding: 50px;
`;

const Form = styled.form`
display: flex;
justify-content: center;
`;

const MedikamentListContainer = styled.div`
padding: 50px;
`;

const MedikamentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #ddd; 
  padding: 10px; 
  margin-bottom: 10px; 
`;

const Medikament = styled.div`
  border: 1px solid black; 
  padding: 5px 10px; 
`;

const Dosage = styled.div`
  border: 1px solid black; 
  padding: 5px 10px; 
`;

