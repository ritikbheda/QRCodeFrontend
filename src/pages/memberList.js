import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Card, CardBody, List, ListItem } from '@chakra-ui/react';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/member/allMembers`
        );
        console.log('this is', response.data.data);
        setMembers(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h2>All Members</h2>
      <Card bg="#fffff5">
        <CardBody>
          <List>
            {members &&
              members.map(member => (
                <ListItem
                  key={member._id}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gridColumnGap={2}
                  bg="yellow.50"
                  border="1px solid"
                  borderColor="yellow.500"
                  rounded="lg"
                  px={3}
                  py={1}
                  cursor="pointer"
                >
                  <Link href={`/member/one/${member._id}`}>
                    {member.head_member}
                  </Link>
                </ListItem>
              ))}
          </List>
        </CardBody>
      </Card>
    </div>
  );
};

export default MemberList;
