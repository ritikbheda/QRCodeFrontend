import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

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
      <Box className="essential-box">
        <Box>
          <Text fontSize="3xl">Member Info</Text>
        </Box>

        <Box marginTop={20}>
          <List
            borderWidth="1px"
            borderColor="black"
            w="90%"
            boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
          >
            <ListItem
              borderBottom="1px"
              borderColor="black"
              padding={2}
              className="bg-my-yellow"
            >
              <Text fontSize="sm">Name:</Text>
              <Text fontSize="xl" className="negative-10-margin ">
                {member.head_member}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px"
              borderColor="black"
              padding={2}
              className="bg-my-yellow"
            >
              <Text fontSize="sm">Email:</Text>
              <Text fontSize="xl" className="negative-10-margin ">
                {member.email}
              </Text>
            </ListItem>
            {member.paid ? (
              ''
            ) : (
              <ListItem
                borderBottom="1px"
                borderColor="black"
                padding={2}
                className="bg-my-red"
              >
                <Text fontSize="sm">Paid:</Text>
                <Text fontSize="xl" className="negative-10-margin ">
                  {member.paid ? 'Yes' : 'No'}
                </Text>
              </ListItem>
            )}

            <ListItem
              borderBottom="1px"
              borderColor="black"
              padding={2}
              className="bg-my-green"
            >
              <Text fontSize="sm">Family Members:</Text>
              <List fontSize="xl" className="negative-10-margin ">
                {member.family_members.map((family_member, index) => (
                  <ListItem key={family_member._id} pl={4}>
                    <input
                      type="checkbox"
                      name={index}
                      value={family_member._id}
                      onChange={checkboxHandler}
                    />
                    {family_member.member}
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Box>
        <Box my={4}>
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default UpdateMemberDetails;
