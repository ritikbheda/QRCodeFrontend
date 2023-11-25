/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Box, Text, VStack, Input, Button } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleLogin = async () => {
    // console.log('username is:', username);
    try {
      if (username == 'admin1' || username == 'admin2') {
        const user = 'admin';

        document.cookie = `user=${user};expires=${new Date(
          Date.now() + 86400000
        ).toUTCString()}`;

        history('/home');
      } else {
        console.log('username is not as expected');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <Center>
        <Box className="essential-box" my={100} w="100%" maxW={400}>
          <Text fontSize="6xl" mb={5}>
            <Center>Login</Center>
          </Text>

          <VStack display={'block'} my={2}>
            <Text>Username:</Text>
            <Input
              value={username}
              px={2}
              onChange={handleUsernameChange}
              size="lg"
              variant="flushed"
              border="2px"
              borderColor="black"
            />
          </VStack>

          <VStack display={'block'} my={2}>
            <Text>Password:</Text>
            <Input
              value={password}
              px={2}
              onChange={handlePasswordChange}
              size="lg"
              variant="flushed"
              border="2px"
              borderColor="black"
            />
          </VStack>

          <Button
            my={10}
            onClick={handleLogin}
            borderRadius="0"
            w="100%"
            size="lg"
            backgroundColor="black"
            border="2px"
            borderColor="black"
            color="white"
          >
            Login
          </Button>
        </Box>
      </Center>
    </div>
  );
};

export default Login;
