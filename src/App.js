import { Box, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Web3 from 'web3';
import { MINT_NFT_ABI, MINT_NFT_CONTRACT } from './web3.config';

const web3 = new Web3(window.ethereum);
const mintContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_CONTRACT);

const App = () => {
  const [account, setAccount] = useState("");
  
  const getAccount = async() => {
    try {
      if(window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccount(account[0]);
      }
    } catch(err) {
        alert("Metamask를 설치해주세요❗️");
    }
  }
  
  const accLogout = () => {
    setAccount("");
  }

  const mintRoomNFT = async () => {
    try {
      if(!account) return;
      const mintNFT = await mintContract.methods
        .mintRooms()
        .send({ from: account });
      
      if(mintNFT.status) {
        const balanceOf = await mintContract.methods.balanceOf(account).call();
        const tokenOfOwnerByIndex = await mintContract.methods.tokenOfOwnerByIndex(account, (Number(balanceOf) - 1)).call();
        const tokenURI = await mintContract.methods.tokenURI(tokenOfOwnerByIndex).call();
        console.log(tokenURI);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Box bgColor="red.100" minH="100vh">
      <Box position="absolute" 
           width="100%"
           bgColor="yellow.100" py={8} 
           textAlign="center">
        {account ? (
          <Box>
            안녕하세요, {account} ❗️ 
            <Button ml={4} colorScheme="yellow" onClick={accLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button colorScheme="yellow" onClick={getAccount}>
              Metamask
            </Button>
          </Box>
        )}
        </Box>
        <Flex 
          justifyContent="center" 
          alignItems="center" 
          minH="100vh"
          flexDirection="column"
        >
          <Box w={512} h={512} bgColor="gray.100" border="2px"></Box>
          <Button mt="8" onClick={mintRoomNFT}>
            MINTING
          </Button>
        </Flex>
    </Box>
    );
};

export default App;
