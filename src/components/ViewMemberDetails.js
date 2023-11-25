import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, VStack, Text, List, ListItem } from '@chakra-ui/react';

const ViewMemberDetails = ({ member_id }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/member/one/${member_id}`
        );

        setMember(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [member_id]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box className="essential-box">
        <Box>
          <Text fontSize="3xl">Member Info</Text>
        </Box>

        <Box my={2}>
          <VStack>
            <Box
              boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
              borderRadius={20}
              w="90%"
              borderWidth="1px"
              borderColor="black"
              padding={2}
              className="bg-my-yellow"
            >
              <Text fontSize="sm">Name:</Text>
              <Text fontSize="xl" className="negative-10-margin ">
                {member.head_member}
              </Text>
            </Box>
            <Box
              boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
              borderRadius={20}
              w="90%"
              borderWidth="1px"
              borderColor="black"
              padding={2}
              marginTop={1}
              className="bg-my-yellow"
            >
              <Text fontSize="sm">Email:</Text>
              <Text fontSize="xl" className="negative-10-margin ">
                {member.email}
              </Text>
            </Box>
            {member.paid ? (
              ''
            ) : (
              <Box
                boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
                borderRadius={20}
                w="90%"
                borderWidth="1px"
                borderColor="black"
                padding={2}
                marginTop={1}
                className="bg-my-red"
              >
                <Text fontSize="sm">Paid:</Text>
                <Text fontSize="xl" className="negative-10-margin ">
                  {member.paid ? 'Yes' : 'No'}
                </Text>
              </Box>
            )}

            <Box
              boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
              borderRadius={20}
              w="90%"
              borderWidth="1px"
              borderColor="black"
              padding={2}
              marginTop={1}
              className="bg-my-green"
            >
              <Text fontSize="sm">Family Members:</Text>
              <List fontSize="xl" className="negative-10-margin ">
                {member.family_members.map(family_member => (
                  <ListItem key={family_member._id} pl={4}>
                    <Text>{family_member.member}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </VStack>
        </Box>
      </Box>

      {/* <Card>
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
            <Text as="span">Family Members:</Text>
            {member.family_members.map(family_member => (
              <li key={family_member._id}>
                <span className="family-member-info">
                  {family_member.member}
                </span>
              </li>
            ))}
          </div>
        </CardBody>
      </Card> */}
    </div>
  );
};

export default ViewMemberDetails;
