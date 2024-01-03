import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import Web3 from 'web3';
import { MINT_NFT_ABI, MINT_NFT_CONTRACT } from './web3.config';
import axios from 'axios';

const web3 = new Web3(window.ethereum);
const mintContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_CONTRACT);

const App = () => {
  const [ account, setAccount ] = useState("");
  const [ src, setSrc ] = useState("");
  
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
        // web3js 가 4.X.X 로 업데이트 되면서 call() 함수 결과값이 BigInt 형태로 호출이 된다.
        // 그렇게 되면 Number 형태로 바꿔줘야하는데, account에서 balance 값을 받아오는 걸 확인하고 tokenOfOwnerByIndex 값을 통해 balance값을 -1 한 값을 넣어주려면 Number 함수를 사용해 값 변환해준다.
        const tokenOfOwnerByIndex = await mintContract.methods.tokenOfOwnerByIndex(account, (Number(balanceOf) - 1)).call();
        const tokenURI = await mintContract.methods.tokenURI(tokenOfOwnerByIndex).call();
        // 여기까지 NFT에 관한 json URL 을 불러오는 과정이다
        const response = await axios.get(tokenURI);
        console.log(tokenURI);
        console.log(response.data.image);
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
          { src ? <Image src={src} alt="NFT" /> : <Box w={512} h={512} bgColor="gray.100" border="2px" />}
          <Button mt="8" onClick={mintRoomNFT}>
            MINTING
          </Button>
        </Flex>
    </Box>
    );
};

export default App;
