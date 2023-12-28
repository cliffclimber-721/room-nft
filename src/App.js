import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

const LoginForMetamask = () => {
  const [accountMeta, setAccountMeta] = useState("");
  
  const getAccountMeta = async() => {
    try {
      if(window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccountMeta(account[0]);
      } else {
        alert("Metamask를 설치해주세요❗️");
      }
    } catch(err) {
        alert("Metamask를 설치해주세요❗️");
    }
  }
  
  const accLogoutMeta = () => {
    setAccountMeta("");
  }


  return (
    <Box bgColor="red.100" minH="100vh">
      <Box bgColor="yellow.100" py={8} textAlign="center">
        {accountMeta ? (
          <Box>
            안녕하세요, {accountMeta} ❗️ 
            <Button ml={4} colorScheme="yellow" onClick={accLogoutMeta}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button colorScheme="yellow" onClick={getAccountMeta}>
              Metamask
            </Button>
          </Box>
        )}
        </Box>
    </Box>
    );
};

export default LoginForMetamask;
