import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, CardBody } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

const UpdateMemberDetails = ({ member_id }) => {
  const [member, setMember] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/member/one/${member_id}`
        );
        setMember(response.data.data);

        response.data.data.family_members.forEach(member => {
          let newMember = {
            familyMemberId: member._id,
            checkedInStatus: member.checked_in,
          };

          setSelectedItems(selectedItems => [...selectedItems, newMember]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [member_id]);

  if (!member) {
    return <div>Loading...</div>;
  }

  const checkboxHandler = e => {
    let isSelected = e.target.checked;
    let name = parseInt(e.target.name);
    let tempSelectedItems = [...selectedItems];
    tempSelectedItems[name].checkedInStatus = isSelected;

    setSelectedItems(tempSelectedItems);
  };

  const handleSubmit = async () => {
    const uniqueObjects = [];

    const uniqueIds = {};

    selectedItems.forEach(obj => {
      if (!uniqueIds[obj.familyMemberId]) {
        uniqueIds[obj.familyMemberId] = true;
        uniqueObjects.push(obj);
      }
    });

    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/member/checkin/${member_id}`,
      { updates: uniqueObjects },
      { 'Content-Type': 'application/json' }
    );

    navigate('/member/all');

    console.log('res', res.data);
  };

  return (
    <div>
      <div>
        <>
          <Card>
            <CardBody>
              <div>
                <Text as="span">Member name: </Text>
                <Text as="span" className="member-info">
                  {member.head_member}
                </Text>
              </div>
              <div>
                <Text as="span">Email: </Text>
                <Text as="span" className="member-info">
                  {member.email}
                </Text>
              </div>
              <div>
                <Text as="span">Paid: </Text>
                <Text as="span" className={member.paid ? '' : 'red-bg'}>
                  {member.paid ? 'yes' : 'no'}
                </Text>
              </div>
              <div>
                <Text as="span">Registered: </Text>
                <Text as="span" className={member.registered ? '' : 'red-bg'}>
                  {member.registered ? 'yes' : 'no'}
                </Text>
              </div>
              <div>
                <Text as="span">Check in:</Text>
                {member.family_members.map((family_member, index) => (
                  <li
                    key={family_member._id}
                    className="list-style-none family-member-info"
                  >
                    <input
                      type="checkbox"
                      name={index}
                      value={family_member._id}
                      onChange={checkboxHandler}
                    />{' '}
                    {'  '}
                    {family_member.member}
                  </li>
                ))}
              </div>
            </CardBody>
          </Card>
        </>
      </div>

      <button type="button" onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default UpdateMemberDetails;
