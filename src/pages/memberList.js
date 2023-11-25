import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Center,
  HStack,
  Circle,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';

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
      <Box h="100vh" w="100%" maxW="500px" p={4} className="">
        <Box>
          <Text fontSize="3xl">Members</Text>
          <Text fontSize="sm">
            Browse through all members or click scan to Scan Member QR code
          </Text>
        </Box>
        <Box
          my={2}
          boxShadow="3px 5px 0px rgba(0, 0, 0, 1)"
          borderRadius={20}
          overflowWrap="hidden"
        >
          <List
            borderWidth="1px"
            borderColor="black"
            borderRadius={20}
            bg="white"
            maxH="480px"
            overflowY="auto"
          >
            {members &&
              members.map(member => (
                <ListItem
                  key={member._id}
                  cursor="pointer"
                  borderBottom="1px"
                  borderColor="black"
                  p={2}
                >
                  <Link href={`/member/one/${member._id}`} fontSize="2xl">
                    <HStack>
                      <Circle
                        size="45px"
                        bg="tomato"
                        color="white"
                        fontSize="xl"
                        borderWidth="1.5px"
                        borderColor="black"
                      >
                        AB
                      </Circle>
                      <Text>{member.head_member}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
      <Box
        w="100%"
        p="0"
        m="0"
        position="fixed"
        bottom="0"
        borderTop="4px"
        borderColor="black"
        className="bg-my-green"
      >
        <Center w="100%" fontSize="3xl">
          <Link href="/scan">Scan</Link>
        </Center>
      </Box>
    </div>
  );
};

export default MemberList;
