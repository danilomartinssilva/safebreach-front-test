import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Flex, Stack, Text, VStack } from '@chakra-ui/layout';
import Router from 'next/router';
import React from 'react';
import IContact from '../../types/IContact';

interface ITableYellowInputProps {
  data:IContact[]
}

export default function TableYellow({data}:ITableYellowInputProps){

  return(
    <>
      {data.map((item,index)=>(

      <Flex h={["min"]}  w="850px" borderRadius={8} borderWidth={1} m = {4} key = {item._id}>
        
        <Image   w="100%"
          maxW="200px"
          h="100%"
          maxH="220px" src={`../../assets/images/${item.picture==="image0.png" ? "image1.png":item.picture}`} borderLeftRadius = {8} objectFit="cover" />
        <VStack  p="16px"
        spacing="16px"
        align="flex-start"
        maxW="450px"
        minW="200px"
        h="100%"
        w="100%"
       >
          <Text  fontWeight="bold" >{item.name}</Text>
          <Text>Address: {item.address}</Text>
          <Text>Birthday: {item.birthday.split("T")[0] }</Text>
          <Text>Phone: {item.phone_number}</Text>               
            <Stack spacing = {4} isInline  >             
                <Button variant="solid" bg="green" onClick = {()=>{
                  Router.push({ pathname:'/yellowupdate',query:item})
                }} >Editar</Button>             
                <Button variant="solid" bg="red" >Excluir</Button>             
            </Stack>             
        </VStack>
      </Flex>

      ))}
    </>
  )
}